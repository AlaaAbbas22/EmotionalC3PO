
"use client";
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 border rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </motion.form>
  );
}