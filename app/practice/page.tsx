"use client"

import { useState } from "react"
import { useLexiFlowStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VolumeIcon as VolumeUp } from "lucide-react"

export default function PracticePage() {
  const { challengeWords, currentChallenge, startChallenge, submitChallengeAnswer } = useLexiFlowStore()

  const [practiceInput, setPracticeInput] = useState("")

  const handleStartChallenge = (word: string) => {
    startChallenge(word)
    setPracticeInput("")
  }

  const handleSubmit = () => {
    submitChallengeAnswer(practiceInput)
    setPracticeInput("")
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Challenge Word Practice</h1>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Your Words</h2>
        <div className="flex flex-wrap gap-2">
          {challengeWords.map((word) => (
            <Badge
              key={word}
              variant="secondary"
              className="cursor-pointer px-4 py-2 text-lg"
              onClick={() => handleStartChallenge(word)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleStartChallenge(word)}
            >
              {word}
            </Badge>
          ))}
        </div>
      </section>

      {currentChallenge && (
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Listen and Type</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Button
              variant="primary"
              size="lg"
              className="h-16 w-full gap-3 text-xl"
              onClick={() => handleStartChallenge(currentChallenge)}
            >
              <VolumeUp className="h-7 w-7" />
              Play Word
            </Button>
            <Input
              placeholder="Type the word..."
              className="h-12 text-center text-xl"
              value={practiceInput}
              onChange={(e) => setPracticeInput(e.target.value)}
              aria-label="Challenge word input"
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full text-lg" onClick={handleSubmit}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
