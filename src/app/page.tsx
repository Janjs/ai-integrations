"use client";

import { useState } from "react";
import { Separator } from "../components/ui/separator";

import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPaletteViewer from "@/components/ColorPaletteViewer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = () => {

    setLoading(true);
    setError(null);
    setColors([]);

    fetch("/api/generateChords", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setColors(data.colors)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  function handleChange(event: any) {
    setPrompt(event.target.value);
  }

  return (
    <main className="flex flex-row justify-center items-center py-24 px-5">
      <div className="flex-1 flex flex-col max-w-screen-lg">
        <div className="flex-1 flex flex-row gap-5">
          <Input placeholder="Describe your color palette" onChange={handleChange} />
          {!loading ? (
            <Button onClick={handleSubmit}>Generate</Button>
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating
            </Button>
          )}
        </div>
        <Separator className="my-5" />
        {colors && <ColorPaletteViewer colorPalette={colors} />}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
          </Alert>
        )}
      </div>
    </main>
  );
}
