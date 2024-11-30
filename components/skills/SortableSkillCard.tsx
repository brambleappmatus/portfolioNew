"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SkillCard } from "./SkillCard";
import { SortableSkillCardProps } from "@/lib/types";

export function SortableSkillCard({ skill, onProgressChange }: SortableSkillCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="touch-none"
    >
      <SkillCard
        id={skill.id}
        title={skill.title}
        items={skill.items}
        progress={skill.progress}
        defaultProgress={skill.defaultProgress}
        onProgressChange={onProgressChange}
      />
    </div>
  );
}