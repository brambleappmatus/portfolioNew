"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SkillCard } from "@/components/SkillCard";

interface Skill {
  id: string;
  title: string;
  items: string[];
  progress: number;
}

interface DraggableSkillCardsProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  onProgressChange: (id: string, progress: number) => void;
}

export function DraggableSkillCards({ skills, onSkillsChange, onProgressChange }: DraggableSkillCardsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = skills.findIndex((item) => item.id === active.id);
      const newIndex = skills.findIndex((item) => item.id === over.id);
      onSkillsChange(arrayMove(skills, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={skills} strategy={rectSortingStrategy}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              {...skill}
              onProgressChange={(progress) => onProgressChange(skill.id, progress)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}