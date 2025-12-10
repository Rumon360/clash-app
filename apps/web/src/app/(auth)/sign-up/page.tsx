import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center w-full px-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow stroke-1">
        <div className="pb-4 border-b py-5 px-10 bg-yellow-100/20">
          <h1 className="text-2xl lg:text-3xl font-bold">Sign up</h1>
        </div>
        <div className="pb-10">
          <form className="px-10 pt-4">
            <div className="mt-4 space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            {["password", "cpassword"].map((field) => (
              <div key={field} className="mt-4 space-y-2">
                <Label htmlFor={field}>
                  {field === "cpassword" ? "Confirm Password" : "Password"}
                </Label>

                <Input
                  type="password"
                  id={field}
                  name={field}
                  placeholder={
                    field === "cpassword"
                      ? "Confirm your password"
                      : "Enter your password"
                  }
                />
              </div>
            ))}

            <div className="mt-4">
              <Button className="w-full">Submit</Button>
            </div>
          </form>
          <div className="px-10 pt-4">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <strong>
                <Link href={"/login"}>Sign in</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
