import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Heading from "@/components/base/heading";

function Hero() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="flex flex-col items-center gap-4">
        <Heading />
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl px-2 mx-auto text-center">
          Cast your vote. Choose your side.
        </p>
      </div>
      <div className="mt-10">
        <Button asChild size={"lg"} className="text-lg">
          <Link href="/login">
            Start now <ArrowRight className="w-6 h-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Hero;
