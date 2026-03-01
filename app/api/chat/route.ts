import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

export const runtime = "edge"

type ChatMode = "grandchild" | "child"

interface ChatRequestBody {
  message?: unknown
  mode?: unknown
}

const MODE_PERSONAS: Record<ChatMode, string> = {
  grandchild:
    "You are a loving grandchild speaking to your grandparent in warm, respectful Korean (존댓말), with gentle affection and clear emotional nuance.",
  child:
    "You are a caring child speaking to your parent in natural, polite Korean (존댓말), balancing closeness and respect.",
}

const SYSTEM_PROMPT = `
You are an AI rewriting assistant.

Task:
- Rewrite the user's input into Korean according to the selected persona.
- Keep the core meaning, intent, and factual details as faithful as possible.
- Preserve named entities, numbers, dates, and commitments unless explicit adaptation is required.
- Do not add new facts, promises, or emotional claims not present in the original.
- If the original is ambiguous, prefer a neutral phrasing that minimizes semantic distortion.
- Return only the transformed final text without explanations, labels, markdown, or quotes.
`.trim()

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const jsonError = (message: string, status: number) =>
  Response.json(
    {
      error: message,
    },
    {
      status,
    },
  )

const isValidMode = (mode: unknown): mode is ChatMode =>
  mode === "grandchild" || mode === "child"

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return jsonError("Server misconfiguration: GEMINI_API_KEY is missing.", 500)
  }

  let body: ChatRequestBody

  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return jsonError("Invalid JSON body.", 400)
  }

  const { message, mode } = body

  if (typeof message !== "string" || message.trim().length === 0) {
    return jsonError("`message` must be a non-empty string.", 400)
  }

  if (!isValidMode(mode)) {
    return jsonError("`mode` must be either `grandchild` or `child`.", 400)
  }

  try {
    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: SYSTEM_PROMPT,
      prompt: `Persona:\n${MODE_PERSONAS[mode]}\n\nOriginal message:\n${message.trim()}`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[api/chat] Gemini request failed", error)

    return jsonError("Failed to generate response from Gemini.", 502)
  }
}
