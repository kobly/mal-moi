"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, RotateCcw } from "lucide-react"
import type { Mode } from "@/components/mode-selection"
import { VoiceInputButton } from "@/components/voice-input-button"
import { TranslationDisplay } from "@/components/translation-display"
import { BearIllustration, CoffeeIllustration } from "@/components/k-illustrations"

const GRANDSON_SUGGESTIONS = [
  {
    label: "Z세대 스타일",
    text: "할머니가 진짜 보고 싶대~ 언제 올 거야? 네가 좋아하는 거 만들어놨는데 ㄹㅇ 맛있음 💕",
    tone: "트렌디",
    icon: "sparkles" as const,
  },
  {
    label: "귀여운 톤",
    text: "우리 손주 매일매일 생각해요~ 빨리 놀러 와! 네가 젤 좋아하는 김치찌개 끓여놨어 🍲❤️",
    tone: "다정한",
    icon: "heart" as const,
  },
  {
    label: "캐주얼",
    text: "요즘 뭐하고 지내? 😊 이번 주말에 한번 올래? 맛있는 거 해놓고 기다릴게~",
    tone: "편안한",
    icon: "flame" as const,
  },
]

const CHILDREN_SUGGESTIONS = [
  {
    label: "따뜻한 톤",
    text: "잘 지내고 있지? 일이 힘들면 억지로 하지 마. 밥은 잘 챙겨 먹고 있는지 걱정이야 💛",
    tone: "부모 마음",
    icon: "heart" as const,
  },
  {
    label: "현대적 표현",
    text: "오늘도 수고했어! 너무 무리하지 말고~ 이번 주 시간 되면 밥 한 끼 같이 하자 😊",
    tone: "모던",
    icon: "sparkles" as const,
  },
  {
    label: "짧고 진심",
    text: "보고 싶다. 시간 날 때 한번 들러. 맛있는 거 해놓을게 🙏",
    tone: "간결한",
    icon: "flame" as const,
  },
]

const DEMO_ORIGINAL_TEXT =
  "우리 손주가 너무 보고 싶어. 언제 놀러 올지 모르겠네. 좋아하는 음식 해놨는데."

interface TranslationScreenProps {
  mode: Mode
  largeText: boolean
  onBack: () => void
}

export function TranslationScreen({
  mode,
  largeText,
  onBack,
}: TranslationScreenProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [hasTranslation, setHasTranslation] = useState(false)
  const [showRecordingPhase, setShowRecordingPhase] = useState(true)

  const titleSize = largeText ? "text-[22px]" : "text-[18px]"
  const bodySize = largeText ? "text-[17px]" : "text-[14px]"

  const suggestions =
    mode === "grandson" ? GRANDSON_SUGGESTIONS : CHILDREN_SUGGESTIONS

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      setIsRecording(false)
      setTimeout(() => {
        setHasTranslation(true)
        setShowRecordingPhase(false)
      }, 800)
    } else {
      setIsRecording(true)
    }
  }, [isRecording])

  const handleReset = useCallback(() => {
    setIsRecording(false)
    setHasTranslation(false)
    setShowRecordingPhase(true)
  }, [])

  const isGrandson = mode === "grandson"
  const modeLabel = isGrandson ? "손주에게" : "자녀에게"
  const modeLabelEn = isGrandson ? "Grandson" : "Children"
  const Illustration = isGrandson ? BearIllustration : CoffeeIllustration

  return (
    <div className="flex flex-col min-h-0">
      {/* Compact sub-header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors"
          aria-label="Go back to mode selection"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
          <span className={`font-semibold text-foreground ${bodySize}`}>
            {"돌아가기"}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <Illustration className="w-8 h-8" />
          <div className="text-right">
            <p className={`font-bold text-foreground ${bodySize} leading-tight`}>
              {modeLabel}
            </p>
            <p className={`text-muted-foreground ${largeText ? "text-[11px]" : "text-[10px]"}`}>
              {modeLabelEn}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {showRecordingPhase ? (
          <div className="flex flex-col items-center justify-center px-4 py-8 gap-4">
            <div className="text-center mb-2">
              <h3 className={`font-bold text-foreground ${titleSize} leading-tight`}>
                {"하고 싶은 말을 해보세요"}
              </h3>
              <p className={`text-muted-foreground mt-1 ${bodySize}`}>
                {isGrandson ? "손주에게 보낼 메시지를 말해주세요" : "자녀에게 보낼 메시지를 말해주세요"}
              </p>
            </div>

            <VoiceInputButton
              isRecording={isRecording}
              onToggleRecording={handleToggleRecording}
              largeText={largeText}
            />

            {isRecording && (
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 8}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "0.6s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-4">
            {hasTranslation && (
              <>
                <TranslationDisplay
                  originalText={DEMO_ORIGINAL_TEXT}
                  suggestions={suggestions}
                  mode={mode}
                  largeText={largeText}
                />

                <div className="flex justify-center mt-5 px-4">
                  <button
                    onClick={handleReset}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/70 transition-all font-bold text-foreground ${bodySize}`}
                    aria-label="Record a new message"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {"다시 녹음하기"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
