import CanvasDrawingBg from "@/components/canvas-drawing-bg";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {children}
      <div className="absolute inset-0 w-full h-full -z-10">
        <CanvasDrawingBg />
      </div>
    </div>
  );
}

export default AuthLayout;
