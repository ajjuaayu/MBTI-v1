
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { APP_NAME } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // Example icon

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2 md:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
            <path d="M12 12a4 4 0 100 8 4 4 0 000-8z" opacity="0.5"></path>
          </svg>
          <span className="text-xl font-semibold">{APP_NAME}</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Placeholder for other header actions */}
        {/* <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button> */}
      </div>
    </header>
  );
}
