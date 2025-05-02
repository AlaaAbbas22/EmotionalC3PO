"use client";

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cn } from '@/lib/utils';

export function ChatMessage({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg",
        isUser ? "flex-row-reverse bg-primary/10" : "bg-muted"
      )}
    >
      <Avatar>
        <AvatarImage src={isUser ? "/user-avatar.png" : "/bot-avatar.png"} />
        <AvatarFallback>{isUser ? "U" : "B"}</AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <div className="text-sm font-medium">{isUser ? "You" : "Bot"}</div>
        <div className="mt-1">{message.content}</div>
      </div>
    </motion.div>
  );
}