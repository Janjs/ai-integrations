"use client";

import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ReplicateExample() {
  const [originalLogo, setOriginalLogo] =
    useState<string>("https://imgtr.ee/images/2023/06/22/mdI40.png");
  const [customLogo, setCustomLogo] = useState<string | null>();

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setCustomLogo("");

    fetch("api/generateCustomLogo", {
      method: "POST",
      body: JSON.stringify({
        originalLogo: originalLogo,
        prompt: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomLogo(data.customizedLogo);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  function handleChange(event: any) {
    setPrompt(event.target.value);
  }

  return (
    <main className="flex flex-row justify-center items-center py-24 px-5">
      <div className="flex-1 flex flex-col max-w-screen-lg gap-5">
        <div className="flex-1 flex flex-row justify-between gap-5">
          <div className="flex-1 rounded-md border border-input p-10">
            <Image
              src={originalLogo}
              width={512}
              height={512}
              sizes="100vw"
              style={{ objectFit: "contain" }}
              alt="accenture logo"
            />
          </div>
          <div className="flex-1 rounded-md border border-input p-10">
            {customLogo && <Image
              src={customLogo}
              width={512}
              height={512}
              sizes="100vw"
              style={{ objectFit: "contain" }}
              alt="accenture logo customized"
            />}
          </div>
        </div>
        <Separator />
        <div className="flex-1 flex flex-row gap-5">
          <Input
            placeholder="Describe your Accenture logo"
            onChange={handleChange}
          />
          {!loading ? (
            <Button onClick={handleSubmit}>Customize</Button>
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          )}
        </div>
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
