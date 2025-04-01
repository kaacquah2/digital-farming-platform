"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User, Bell, Lock, Globe, CreditCard, Trash2, Camera } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect, useRef } from "react"
import { updateProfile, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function SettingsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      })
      setProfileImageUrl(user.photoURL)
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setLoading(true)
      await updateProfile(user, {
        displayName: formData.displayName,
      })
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (!user) return

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    try {
      setLoading(true)
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        user.email!,
        passwordData.currentPassword
      )
      await reauthenticateWithCredential(user, credential)
      
      // Update password
      await updatePassword(user, passwordData.newPassword)
      
      toast.success("Password updated successfully")
      setShowPasswordDialog(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      toast.error("Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return

    const file = e.target.files[0]
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB")
      return
    }

    try {
      setLoading(true)
      
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `profile-pictures/${user.uid}/${file.name}`)
      
      // Delete old profile picture if it exists
      if (user.photoURL) {
        try {
          const oldStorageRef = ref(storage, user.photoURL)
          await deleteObject(oldStorageRef)
        } catch (error) {
          console.error("Error deleting old profile picture:", error)
        }
      }

      // Upload the new file
      const snapshot = await uploadBytes(storageRef, file)
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      // Update the user's profile with the new photo URL
      await updateProfile(user, {
        photoURL: downloadURL
      })

      setProfileImageUrl(downloadURL)
      toast.success("Profile picture updated successfully")
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      toast.error("Failed to update profile picture")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailVerification = async () => {
    if (!user) return

    try {
      setLoading(true)
      await sendEmailVerification(user)
      toast.success("Verification email sent successfully")
    } catch (error) {
      console.error("Error sending verification email:", error)
      toast.error("Failed to send verification email")
    } finally {
      setLoading(false)
    }
  }

  const handleAccountDelete = async () => {
    if (!user) return

    try {
      setLoading(true)
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        user.email!,
        deletePassword
      )
      await reauthenticateWithCredential(user, credential)
      
      // Delete account
      await deleteUser(user)
      
      toast.success("Account deleted successfully")
      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Error deleting account:", error)
      toast.error("Failed to delete account")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="text-white">Please sign in to view settings.</div>
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <Button 
          className="bg-terrabit-600 hover:bg-terrabit-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          <Settings className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Profile</CardTitle>
            <User className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Active</div>
            <p className="text-xs text-terrabit-400">Account status</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Email</CardTitle>
            <Bell className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{user.email}</div>
            <p className="text-xs text-terrabit-400">
              {user.emailVerified ? "Verified" : "Unverified"}
              {!user.emailVerified && (
                <Button
                  variant="link"
                  className="text-xs text-terrabit-400 hover:text-terrabit-300 p-0 ml-2"
                  onClick={handleEmailVerification}
                  disabled={loading}
                >
                  Verify
                </Button>
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Security</CardTitle>
            <Lock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Password</div>
            <p className="text-xs text-terrabit-400">Email/Password</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Member Since</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
            </div>
            <p className="text-xs text-terrabit-400">Account creation date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Profile Information</label>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-terrabit-800 flex items-center justify-center overflow-hidden">
                        {profileImageUrl ? (
                          <Image
                            src={profileImageUrl}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-terrabit-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-terrabit-600 hover:bg-terrabit-700"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                      >
                        <Camera className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full px-3 py-2 bg-terrabit-800 border border-terrabit-700 rounded-md text-white placeholder-terrabit-400 focus:outline-none focus:ring-2 focus:ring-terrabit-600"
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    disabled
                    className="w-full px-3 py-2 bg-terrabit-800 border border-terrabit-700 rounded-md text-white placeholder-terrabit-400 focus:outline-none focus:ring-2 focus:ring-terrabit-600 disabled:opacity-50"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    disabled
                    className="w-full px-3 py-2 bg-terrabit-800 border border-terrabit-700 rounded-md text-white placeholder-terrabit-400 focus:outline-none focus:ring-2 focus:ring-terrabit-600 disabled:opacity-50"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogTrigger asChild>
                  <div className="p-3 rounded-lg bg-terrabit-800/50 cursor-pointer hover:bg-terrabit-800/70 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Password</p>
                      <Lock className="h-4 w-4 text-terrabit-400" />
                    </div>
                    <p className="text-xs text-terrabit-400">Change your account password</p>
                    <Button variant="outline" size="sm" className="mt-2 border-terrabit-700 text-white hover:bg-terrabit-800">
                      Change Password
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-terrabit-900 border-terrabit-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Change Password</DialogTitle>
                    <DialogDescription className="text-terrabit-400">
                      Enter your current password and new password to update your account password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="bg-terrabit-800 border-terrabit-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="bg-terrabit-800 border-terrabit-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="bg-terrabit-800 border-terrabit-700 text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordDialog(false)}
                      className="border-terrabit-700 text-white hover:bg-terrabit-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePasswordUpdate}
                      disabled={loading}
                      className="bg-terrabit-600 hover:bg-terrabit-700"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Language</p>
                  <Globe className="h-4 w-4 text-terrabit-400" />
                </div>
                <p className="text-xs text-terrabit-400">Set your preferred language</p>
                <Button variant="outline" size="sm" className="mt-2 border-terrabit-700 text-white hover:bg-terrabit-800">
                  Change Language
                </Button>
              </div>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/20 cursor-pointer hover:bg-red-900/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-red-400">Delete Account</p>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-xs text-red-400/70">Permanently delete your account and all data</p>
                    <Button variant="outline" size="sm" className="mt-2 border-red-500/20 text-red-400 hover:bg-red-900/30">
                      Delete Account
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-terrabit-900 border-terrabit-800">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Delete Account</DialogTitle>
                    <DialogDescription className="text-terrabit-400">
                      This action cannot be undone. Please enter your password to confirm account deletion.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="deletePassword" className="text-white">Password</Label>
                      <Input
                        id="deletePassword"
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="bg-terrabit-800 border-terrabit-700 text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                      className="border-terrabit-700 text-white hover:bg-terrabit-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAccountDelete}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {loading ? "Deleting..." : "Delete Account"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 