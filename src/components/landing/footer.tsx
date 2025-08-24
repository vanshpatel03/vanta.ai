import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Vanta AI. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
