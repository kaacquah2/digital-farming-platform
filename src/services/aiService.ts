import { auth } from '../config/firebase';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    // Get the current user's ID token
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const idToken = await user.getIdToken();

    // Prepare the messages array
    const messages: Message[] = [
      {
        role: 'system',
        content: `You are an AI farming assistant. You help farmers with:
          - Plant disease identification and treatment
          - Weather and climate information
          - Soil management and fertilization
          - General farming advice
          Keep responses concise, practical, and focused on farming-related topics.`
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Make the API request
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'X-Firebase-Auth-Token': idToken
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again later.';
  }
}; 