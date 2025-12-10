import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <AlertTriangle className="w-16 h-16" strokeWidth={1.2} />

      <h1 className="mt-6 text-6xl tracking-tight font-extrabold">404</h1>

      <p className="mt-4 text-lg text-center">
        The page you’re looking for doesn’t exist.
      </p>
      <Button size={"lg"} asChild className="mt-8">
        <Link href={"/"}>Go Home</Link>
      </Button>
    </div>
  );
}
