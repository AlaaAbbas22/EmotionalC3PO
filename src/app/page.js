"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChatMessage } from '@/components/ui/chat-message';
import { ChatInput } from '@/components/ui/chat-input';
import { VisualDisplay } from '@/components/ui/visual-display';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import '@google/model-viewer';


export default function Home() {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [visualData, setVisualData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // Inside your component:
const [chatId, setChatId] = useState(1); // Default chat ID
const [gen_3d, setGen_3d] = useState("");
const [i, setI] = useState("");

// Function to fetch chat data
const fetchChatData = async () => {
  try {
    
    const response = await fetch(`/api/conversation/fetch?id=${chatId}`);
    const result = await response.json();
    
    if (result.success) {
      setI(result.data.image)
      setGen_3d(result.data.img_3d)
      setMessages(result.data.transcript);
    } else {
      setError(result.message || 'Failed to fetch chat data');
    }
  } catch (err) {
    setError(err.message || 'An error occurred');
  } finally {
    
  }
};

// Set up polling
useEffect(() => {
  // Initial fetch
  fetchChatData();
  
  // Set up interval for polling
  const intervalId = setInterval(fetchChatData, 5000); // Poll every 5 seconds
  
  // Clean up interval on component unmount
  return () => clearInterval(intervalId);
}, [chatId]); // Re-run when chatId changes

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const startConversation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/conversation/start', {
        userId: 'user-' + Date.now()
      });
      
      setConversationId(response.data.conversationId);
      setMessages([
        
      ]);
      setVisualData({
        type: 'text',
        content: 'Welcome to the interactive chat! Visual content will appear here as the conversation progresses.'
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content) => {
    if (!conversationId) {
      await startConversation();
    }
    
    const newMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    try {
      // Simulate sending to backend and getting a response
      setTimeout(() => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: `I received your message: "${content}". How can I help further?`,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setVisualData({
          type: 'text',
          content: `Last user message: "${content}"`
        });
        setIsLoading(false);
      }, 1000);
      
      // In a real app, you would send the message to your backend
      // await axios.post('/api/conversation/update', {
      //   conversationId,
      //   messages: [newMessage],
      //   visualData: null
      // });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <model-viewer
      src={gen_3d}
      alt="A 3D model"
      auto-rotate
      camera-controls
      style={{ width: '500px', height: '500px' }}
    ></model-viewer>
      <motion.div 
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 h-[90vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Chat Section */}
        <motion.div 
          className="flex flex-col h-full border rounded-lg overflow-hidden"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 border-b bg-muted/50">
            <h2 className="text-xl font-bold">Interactive Chat</h2>
            {!conversationId && (
              <Button 
                onClick={startConversation} 
                className="mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  'Start Conversation'
                )}
              </Button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isUser={message.isUser} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <ChatInput 
              onSendMessage={sendMessage} 
              isLoading={isLoading} 
            />
          </div>
        </motion.div>
        
        {/* Visual Section */}
        <motion.div 
          className="h-full"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={i} />
        </motion.div>
      </motion.div>
    </main>
  );
}