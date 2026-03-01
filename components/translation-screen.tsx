"use client"

import { useMemo } from "react"
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { useChat } from "ai/react"
import type { Mode } from "@/components/mode-selection"
import { cn } from "@/lib/utils"

interface TranslationScreenProps {
  mode: Mode
  largeText: boolean
  onBack: () => void
  onModeChange: (mode: Mode) => void
}

const MODE_LABELS: Record<Mode, string> = {
  grandchild: "손주에게",
  child: "자녀에게",
}

const textFromMessage = (message: { content?: unknown; parts?: unknown }) => {
  if (typeof message.content === "string") {
    return message.content
  }

  if (Array.isArray(message.parts)) {
    return message.parts
      .map((part) => {
        if (
          typeof part === "object" &&
          part !== null &&
          "type" in part &&
          "text" in part &&
          (part as { type: unknown }).type === "text"
        ) {
          return String((part as { text: unknown }).text)
        }

        return ""
      })
      .join("")
  }

  return ""
}

export function TranslationScreen({ mode, largeText, onBack, onModeChange }: TranslationScreenProps) {
  const titleSize = largeText ? "text-[22px]" : "text-[18px]"
  const bodySize = largeText ? "text-[17px]" : "text-[14px]"

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    status,
    error,
  } = useChat({
    api: "/api/chat",
    body: { mode },
  })

  const isStreaming = status === "submitted" || status === "streaming"

  const assistantMessages = useMemo(
    () => messages.filter((message) => message.role === "assistant"),
    [messages],
  )

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 transition-colors hover:bg-secondary/70"
          aria-label="Go back to mode selection"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
          <span className={`font-semibold text-foreground ${bodySize}`}>{"돌아가기"}</span>
        </button>
        <h2 className={cn("font-bold text-foreground", titleSize)}>{MODE_LABELS[mode]}</h2>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
        {(["grandchild", "child"] as const).map((modeOption) => (
          <button
            key={modeOption}
            type="button"
            onClick={() => {
              if (modeOption !== mode) {
                onModeChange(modeOption)
                setMessages([])
              }
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold",
              modeOption === mode
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
            aria-pressed={modeOption === mode}
          >
            {modeOption === "grandchild" ? "손주 말투" : "자녀 말투"}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className={`rounded-xl bg-secondary p-3 text-muted-foreground ${bodySize}`}>
            {"메시지를 입력하면 Gemini가 선택한 말투로 실시간 변환해요."}
          </p>
        )}

        {messages.map((message) => {
          const text = textFromMessage(message)

          return (
            <div
              key={message.id}
              className={cn(
                "max-w-[90%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <p className={`whitespace-pre-wrap break-words leading-relaxed ${bodySize}`}>{text}</p>
            </div>
          )
        })}

        {isStreaming && (
          <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span className={bodySize}>{"Gemini가 변환 중입니다..."}</span>
          </div>
        )}

        {error && (
          <p className={`rounded-xl bg-destructive/10 p-3 text-destructive ${bodySize}`}>
            {error.message || "요청 중 오류가 발생했습니다."}
          </p>
        )}

        {assistantMessages.length > 0 && (
          <p className={`text-xs text-muted-foreground ${largeText ? "text-sm" : "text-xs"}`}>
            {"스트리밍 결과는 생성되는 즉시 위 말풍선에 실시간으로 표시됩니다."}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        <div className="flex gap-2">
          <textarea
            name="message"
            value={input}
            onChange={handleInputChange}
            rows={3}
            placeholder="변환할 문장을 입력하세요"
            className={cn(
              "min-h-20 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
              bodySize,
            )}
          />
          <button
            type="submit"
            disabled={isStreaming || input.trim().length === 0}
            className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isStreaming ? "변환 중" : "변환"}
          </button>
        </div>
      </form>
    </div>
  )
}
