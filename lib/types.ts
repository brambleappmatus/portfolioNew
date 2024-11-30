export interface Skill {
  id: string;
  title: string;
  items: string[];
  progress: number;
  defaultProgress: number;
}

export interface SkillCardProps {
  id: string;
  title: string;
  items: string[];
  progress: number;
  defaultProgress: number;
  onProgressChange: (id: string, progress: number) => void;
}

export interface DraggableSkillCardsProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  onProgressChange: (id: string, progress: number) => void;
}

export interface SortableSkillCardProps {
  skill: Skill;
  onProgressChange: (id: string, progress: number) => void;
}