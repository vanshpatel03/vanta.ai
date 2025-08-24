import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
