"use client";

import Image from "next/image";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoSection } from "@/components/InfoSection";
import { skillsData } from "@/lib/constants";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-40 h-40 rounded-full overflow-hidden">
          <Image
            src="https://media.licdn.com/dms/image/v2/D4E03AQF7Vva9Bewv0Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732454598585?e=1738195200&v=beta&t=ev_cO5M5gMhsqa5XMBxNpn_LDAtk3eNPnUzY3iy3scI"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold">Matúš Staňo</h1>
        <p className="text-xl text-muted-foreground">Sales Manager & Tech Enthusiast</p>
        <Button onClick={() => window.open("https://drive.google.com/uc?export=download&id=1afx7X8CxgRRtidJChXqlhwpmRFNj1RDq", "_blank")}>
          <DownloadCloud className="mr-2 h-4 w-4" />
          Download CV
        </Button>
      </div>

      <div className="grid gap-6">
        {skillsData.map((section) => (
          <InfoSection key={section.id} {...section} />
        ))}
      </div>
    </div>
  );
}