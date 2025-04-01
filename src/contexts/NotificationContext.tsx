import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  category: 'system' | 'weather' | 'market' | 'maintenance' | 'feature';
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  preferences: NotificationPreferences;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
}

interface NotificationPreferences {
  system: boolean;
  weather: boolean;
  market: boolean;
  maintenance: boolean;
  feature: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    system: true,
    weather: true,
    market: true,
    maintenance: true,
    feature: true,
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications: Notification[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newNotifications.push({
          id: doc.id,
          title: data.title,
          message: data.message,
          type: data.type,
          timestamp: data.timestamp.toDate(),
          read: data.read,
          category: data.category,
          link: data.link,
        });
      });

      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const markAsRead = async (id: string) => {
    if (!currentUser) return;

    const notificationRef = collection(db, 'notifications');
    await updateDoc(doc(notificationRef, id), {
      read: true,
    });
  };

  const markAllAsRead = async () => {
    if (!currentUser) return;

    const batch = writeBatch(db);
    notifications
      .filter(n => !n.read)
      .forEach(n => {
        const notificationRef = doc(collection(db, 'notifications'), n.id);
        batch.update(notificationRef, { read: true });
      });

    await batch.commit();
  };

  const clearNotifications = async () => {
    if (!currentUser) return;

    const batch = writeBatch(db);
    notifications.forEach(n => {
      const notificationRef = doc(collection(db, 'notifications'), n.id);
      batch.delete(notificationRef);
    });

    await batch.commit();
  };

  const updatePreferences = async (newPrefs: Partial<NotificationPreferences>) => {
    if (!currentUser) return;

    const updatedPrefs = { ...preferences, ...newPrefs };
    setPreferences(updatedPrefs);

    await updateDoc(doc(db, 'users', currentUser.uid), {
      notificationPreferences: updatedPrefs,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        preferences,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 