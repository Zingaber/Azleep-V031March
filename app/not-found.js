import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen sleep-gradient flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/">
        <Button className="sleep-button">
          Return Home
        </Button>
      </Link>
    </div>
  );
} 