import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row justify-center items-center py-24 px-5">
      <nav className="flex-1 flex flex-col max-w-screen-lg gap-5">
        <Link href="/openaiExample">
          <Button className="w-full">
            AI website build with NextJS powered by Openai API
          </Button>
        </Link>
        <Link href="/replicateExample">
          <Button className="w-full">Using other AI models</Button>
        </Link>
      </nav>
    </main>
  );
}
