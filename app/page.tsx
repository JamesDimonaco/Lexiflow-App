"use client"

import { useLexiFlowStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RefreshCw, Volume2 } from "lucide-react"

export default function HomePage() {
  const {
    words,
    currentWordIndex,
    currentInput,
    wordStatus,
    isFinished,
    accuracy,
    wordsTyped,
    handleUserTyping,
    restartSession,
    playWordAudio,
  } = useLexiFlowStore()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-foreground">Typing Practice</h1>

      <Card className="w-full max-w-4xl">
        <CardContent className="p-8">
          <div className="text-3xl font-medium leading-relaxed tracking-wider">
            {words.map((word, index) => (
              <span
                key={index}
                className={cn(
                  "rounded-md px-1 py-0.5 transition-colors",
                  index < currentWordIndex && "text-muted-foreground",
                  index === currentWordIndex && wordStatus === "correct" && "bg-primary/30",
                  index === currentWordIndex &&
                    wordStatus === "incorrect" &&
                    "bg-destructive/30 text-destructive-foreground",
                  index > currentWordIndex && "text-foreground",
                )}
              >
                {word}{" "}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full max-w-4xl items-center gap-4">
        <Input
          type="text"
          placeholder="Start typing here..."
          className="h-14 text-2xl"
          value={currentInput}
          onChange={(e) => handleUserTyping(e.target.value)}
          disabled={isFinished}
          aria-label="Typing input"
        />
        <Button
          variant="secondary"
          size="lg"
          className="h-14"
          onClick={() => playWordAudio(words[currentWordIndex])}
          aria-label="Listen to current word"
        >
          <Volume2 className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="lg" className="h-14" onClick={restartSession} aria-label="Restart session">
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>

      <div className="text-center text-xl text-muted-foreground">
        {isFinished ? (
          <p className="text-3xl font-bold text-primary">Session Complete!</p>
        ) : (
          <div className="flex gap-8">
            <span>Accuracy: {accuracy}%</span>
            <span>Words Typed: {wordsTyped}</span>
          </div>
        )}
      </div>
    </div>
  )
}
