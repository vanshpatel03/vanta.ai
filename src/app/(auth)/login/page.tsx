import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 48 48" {...props}>
      <path d="M44.5,20H24v8.5h11.8C34.7,33.9,30.1,37,24,37c-7.2,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9l6.4-6.4C34.6,4.1,29.6,2,24,2C11.8,2,2,11.8,2,24s9.8,22,22,22c11,0,21-8,21-22C45,22.5,44.8,21.2,44.5,20z"></path>
    </svg>
  );
}


export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <Logo className="justify-center mb-2" />
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <Button variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
