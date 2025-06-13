import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn utility for merging classes

const Loader = ({ size = "md", className = "", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
      <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Loader;