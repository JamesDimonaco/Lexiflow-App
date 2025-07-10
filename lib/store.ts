import { create } from "zustand"

type WordStatus = "correct" | "incorrect" | "untyped"

interface LexiFlowState {
  // Home Page State
  words: string[]
  currentWordIndex: number
  currentInput: string
  wordStatus: WordStatus
  isFinished: boolean
  accuracy: number
  wordsTyped: number

  // Practice Page State
  challengeWords: string[]
  currentChallenge: string

  // Actions
  handleUserTyping: (input: string) => void
  restartSession: () => void
  playWordAudio: (word: string) => void
  submitChallengeAnswer: (answer: string) => void
  startChallenge: (word: string) => void
}

const initialWords = "The quick brown fox jumps over the lazy dog a popular pangram used to showcase fonts".split(" ")

export const useLexiFlowStore = create<LexiFlowState>((set, get) => ({
  // Initial State for Home Page
  words: initialWords,
  currentWordIndex: 0,
  currentInput: "",
  wordStatus: "untyped",
  isFinished: false,
  accuracy: 100,
  wordsTyped: 0,

  // Initial State for Practice Page
  challengeWords: ["dyslexia", "practice", "accessible", "vibrant", "layout"],
  currentChallenge: "",

  // --- ACTIONS ---

  handleUserTyping: (input: string) => {
    const { currentWordIndex, words } = get()

    if (get().isFinished) return

    // Handle spacebar press to move to the next word
    if (input.endsWith(" ")) {
      const typedWord = input.trim()
      if (typedWord === words[currentWordIndex]) {
        // Correct word
      } else {
        // Incorrect word, add to challenges
        set((state) => ({
          challengeWords: [...new Set([...state.challengeWords, words[currentWordIndex]])],
        }))
      }

      // Move to next word
      const nextWordIndex = currentWordIndex + 1
      set({
        currentInput: "",
        currentWordIndex: nextWordIndex,
        wordStatus: "untyped",
        wordsTyped: get().wordsTyped + 1,
      })

      // Check if finished
      if (nextWordIndex === words.length) {
        set({ isFinished: true })
      }
      return
    }

    // Check for typos mid-word
    const currentWord = words[currentWordIndex]
    const status: WordStatus = currentWord.startsWith(input) ? "correct" : "incorrect"

    set({
      currentInput: input,
      wordStatus: status,
    })
  },

  restartSession: () => {
    set({
      currentWordIndex: 0,
      currentInput: "",
      wordStatus: "untyped",
      isFinished: false,
      wordsTyped: 0,
      accuracy: 100,
    })
  },

  playWordAudio: (word: string) => {
    // In a real app, this would use the Web Speech API
    console.log(`Playing audio for: ${word}`)
    const utterance = new SpeechSynthesisUtterance(word)
    speechSynthesis.speak(utterance)
  },

  startChallenge: (word: string) => {
    set({ currentChallenge: word })
    get().playWordAudio(word)
  },

  submitChallengeAnswer: (answer: string) => {
    if (answer.toLowerCase() === get().currentChallenge.toLowerCase()) {
      alert("Correct!")
      // In a real app, you might remove it from the challenge list
    } else {
      alert("Try again!")
    }
  },
}))
