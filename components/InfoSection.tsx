"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface InfoSectionProps {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export function InfoSection({ id, title, description, items }: InfoSectionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={id}>
        <AccordionTrigger className="text-xl font-semibold">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}