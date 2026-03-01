"use client"

import { Mic, Square } from "lucide-react"

interface VoiceInputButtonProps {
  isRecording: boolean
  onToggleRecording: () => void
  largeText: boolean
}

export function VoiceInputButton({
  isRecording,
  onToggleRecording,
  largeText,
}: VoiceInputButtonProps) {
  const buttonSize = largeText ? "w-24 h-24" : "w-20 h-20"
  const iconSize = largeText ? "w-9 h-9" : "w-7 h-7"
  const labelSize = largeText ? "text-[17px]" : "text-[14px]"

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {isRecording && (
          <>
            <div className={`absolute inset-0 ${buttonSize} rounded-full bg-primary/30 animate-pulse-ring`} />
            <div
              className={`absolute inset-0 ${buttonSize} rounded-full bg-primary/20 animate-pulse-ring`}
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}
        <button
          onClick={onToggleRecording}
          className={`relative ${buttonSize} rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
            isRecording
              ? "bg-destructive shadow-[0_4px_24px_rgba(220,53,69,0.35)] animate-pulse-glow scale-105"
              : "bg-primary shadow-[0_4px_24px_rgba(232,114,42,0.35)] hover:shadow-[0_6px_30px_rgba(232,114,42,0.45)] hover:scale-105 active:scale-95"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start voice recording"}
        >
          {isRecording ? (
            <Square className={`${iconSize} text-destructive-foreground`} fill="currentColor" />
          ) : (
            <Mic className={`${iconSize} text-primary-foreground`} />
          )}
        </button>
      </div>

      <div className="text-center">
        <p className={`font-bold ${labelSize} ${isRecording ? "text-destructive" : "text-foreground"}`}>
          {isRecording ? "듣고 있어요..." : "눌러서 말하기"}
        </p>
        <p className={`text-muted-foreground mt-0.5 ${largeText ? "text-[13px]" : "text-[11px]"}`}>
          {isRecording ? "다 말씀하셨으면 다시 눌러주세요" : "버튼을 누르고 하고 싶은 말을 하세요"}
        </p>
      </div>
    </div>
  )
}
