"use client";

import { Button } from "@/components/ui/button";

export default function Pay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
      <h1 className="text-3xl font-bold">Do you owe me money?</h1>
      <p className="text-muted-foreground text-center max-w-md">
      Well that's not very nice.
        No worries tho, just use the button below to pay me with apple or google pay. Or a card if you must.
      </p>
      <Button size="lg" onClick={() => window.open("https://revolut.me/attymatty", "_blank")}>
        PayMe
      </Button>
    </div>
  );
}