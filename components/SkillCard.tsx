"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GripHorizontal } from "lucide-react";

const funnyMessages = {
  higher: [
    "Wow, you really think I'm that good? I'm flattered! 😊",
    "Thanks for the confidence boost! But let's stay realistic 😅",
    "I appreciate the enthusiasm, but maybe we're getting ahead of ourselves! 🚀",
    "You're too kind! But let's keep it real 😉",
  ],
  lower: [
    "Hey now, I'm not that bad! 😢",
    "Ouch! That hurts my professional feelings! 😅",
    "Come on, give me some credit! 🎯",
    "I promise I'm better than that! 💪",
  ],
};

interface SkillCardProps {
  id: string;
  title: string;
  items: string[];
  progress: number;
  defaultProgress: number;
  onProgressChange: (value: number) => void;
}

export function SkillCard({
  id,
  title,
  items,
  progress,
  defaultProgress,
  onProgressChange,
}: SkillCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!isDragging) return;

    const bar = document.getElementById(`progress-${id}`);
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newProgress = Math.round((x / rect.width) * 100);

    if (newProgress !== progress) {
      onProgressChange(newProgress);
      
      if (isDragging) {
        toast({
          description: getRandomMessage(newProgress > defaultProgress ? 'higher' : 'lower'),
          duration: 2000,
        });
      }
    }
  };

  const getRandomMessage = (type: 'higher' | 'lower') => {
    const messages = funnyMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Proficiency Level</label>
            <div className="flex items-center gap-1">
              <GripHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Drag to adjust</span>
            </div>
          </div>
          <div 
            id={`progress-${id}`}
            className="relative h-2 w-full cursor-pointer rounded-full bg-secondary group"
          >
            <div 
              className="absolute inset-0 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-primary" />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full cursor-grab active:cursor-grabbing shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
              style={{ 
                left: `${progress}%`,
                transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.1)' : ''}`,
                transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
            >
              <GripHorizontal className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-right">{progress}%</p>
        </div>
      </CardContent>
    </Card>
  );
}