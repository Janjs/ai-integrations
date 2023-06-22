import Header from "@/app/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Colorvibe",
  description: "Color Palette AI Generator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header title="Customize the Accenture logo" />
      {children}
      {/*Make this a hover-card https://ui.shadcn.com/docs/components/hover-card*/}
      <p className="fixed bottom-0 left-0 right-0 text-right from-background to-transparent pr-10 pb-5 pt-14 text-muted-foreground text-xs">
        Made by{" "}
        <a href="https://github.com/Janjs" className="text-foreground">
          @Janjs
        </a>
        <br />
        Powered by Replicate
      </p>
    </section>
  );
}
