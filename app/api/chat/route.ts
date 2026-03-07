import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

export const runtime = "edge"

const USE_MOCK_ONLY = false

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

const pickMessageKeyword = (message: string) => {
  const normalized = message.trim().replace(/\s+/g, " ")

  if (!normalized) {
    return "일이 조금 생겨서"
  }

  const preview = normalized.slice(0, 28)

  return preview.length < normalized.length ? `${preview}...` : preview
}

const createMockResponse = (message: string, mode: ChatMode): string => {
  const keyword = pickMessageKeyword(message)

  if (mode === "grandchild") {
    return `${keyword} 오늘 조금 늦을 것 같아. 미안해! 너무 걱정하지 않았으면 좋겠어. 도착하면 바로 연락할게.`
  }

  return `${keyword} 오늘 조금 늦을 것 같아요. 죄송해요. 너무 걱정하지 않으셨으면 좋겠어요. 도착하면 바로 연락드릴게요.`
}

const streamPlainText = (text: string) => {
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

export async function POST(request: Request) {
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

  const trimmedMessage = message.trim()

  if (USE_MOCK_ONLY) {
    console.info("[api/chat] Returning mock response (USE_MOCK_ONLY=true)")

    return streamPlainText(createMockResponse(trimmedMessage, mode))
  }

  if (!process.env.GEMINI_API_KEY) {
    console.warn(
      "[api/chat] GEMINI_API_KEY is missing; returning mock fallback response",
    )

    return streamPlainText(createMockResponse(trimmedMessage, mode))
  }

  try {
    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: SYSTEM_PROMPT,
      prompt: `Persona:\n${MODE_PERSONAS[mode]}\n\nOriginal message:\n${trimmedMessage}`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[api/chat] Gemini request failed", error)
    console.info("[api/chat] Returning mock fallback response")

    return streamPlainText(createMockResponse(trimmedMessage, mode))
  }
}
