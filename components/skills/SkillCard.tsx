import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GripHorizontal } from "lucide-react";
import { SkillCardProps } from "@/lib/types";

export function SkillCard({
  id,
  title,
  items,
  progress,
  onProgressChange,
}: SkillCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
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
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">{progress}%</p>
        </div>
      </CardContent>
    </Card>
  );
}