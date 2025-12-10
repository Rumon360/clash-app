import { cn } from "@/lib/utils";
import { Fjalla_One } from "next/font/google";

const fjalla_one = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
});

function Heading({ className }: { className?: string }) {
  return (
    <h1
      style={{ WebkitTextStroke: "2px oklch(0.145 0 0)" }}
      className={cn(
        `${fjalla_one.className} stroke-2 stroke-black text-6xl md:text-7xl lg:text-9xl bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text uppercase`,
        className
      )}
    >
      Clash
    </h1>
  );
}

export default Heading;
