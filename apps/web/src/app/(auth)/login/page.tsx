import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function Login() {
  return (
    <div className="h-full w-full flex justify-center items-center px-4">
      <div className="stroke-shadow-box w-full max-w-2xl mx-auto bg-white rounded-lg relative">
        <div className="pb-4 border-b py-5 px-10 bg-[#77D87E] rounded-t-lg">
          <h1 className="text-2xl lg:text-3xl font-bold">Login</h1>
        </div>
        <div className="pb-10">
          <form className="px-10 pt-4">
            <div className="mt-4 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter your password"
              />
              <div className="text-right pt-1">
                <Link href={"/forget-password"} className="text-sm">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full">Submit</Button>
            </div>
          </form>
          <div className="px-10 pt-4">
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <strong>
                <Link href={"/sign-up"}>Sign up</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
