"use client"

import { Copy, Check, Sparkles, Flame, Heart } from "lucide-react"
import { useState } from "react"
import type { Mode } from "@/components/mode-selection"

interface TranslationDisplayProps {
  originalText: string
  suggestions: {
    label: string
    text: string
    tone: string
    icon: "sparkles" | "flame" | "heart"
  }[]
  mode: Mode
  largeText: boolean
}

const iconMap = {
  sparkles: Sparkles,
  flame: Flame,
  heart: Heart,
}

export function TranslationDisplay({
  originalText,
  suggestions,
  mode,
  largeText,
}: TranslationDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const titleSize = largeText ? "text-[20px]" : "text-[17px]"
  const bodySize = largeText ? "text-[17px]" : "text-[14px]"
  const smallSize = largeText ? "text-[14px]" : "text-[12px]"

  const isGrandson = mode === "grandson"

  const cardThemes = [
    {
      bg: isGrandson ? "bg-[#FFF5EC]" : "bg-[#EEF4FB]",
      iconBg: isGrandson ? "bg-primary/10" : "bg-accent/10",
      iconText: isGrandson ? "text-primary" : "text-accent",
      badge: isGrandson ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
      copyBg: isGrandson ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent",
    },
    {
      bg: "bg-[#FFFBF0]",
      iconBg: "bg-[#FEE500]/20",
      iconText: "text-[#C4A000]",
      badge: "bg-[#FEE500] text-foreground",
      copyBg: "bg-[#FEE500]/15 text-[#9A8000]",
    },
    {
      bg: "bg-[#F0FAF4]",
      iconBg: "bg-chart-3/10",
      iconText: "text-chart-3",
      badge: "bg-chart-3 text-card",
      copyBg: "bg-chart-3/10 text-chart-3",
    },
  ]

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Original text */}
      <div>
        <p className={`font-bold text-muted-foreground mb-1.5 ${smallSize}`}>
          {"내가 한 말"}
        </p>
        <div className="bg-secondary rounded-xl px-4 py-3">
          <p className={`text-secondary-foreground leading-relaxed ${bodySize}`}>
            {originalText}
          </p>
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className={`w-4 h-4 ${isGrandson ? "text-primary" : "text-accent"}`} />
          <p className={`font-bold text-foreground ${titleSize}`}>
            {"AI 추천 표현"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, index) => {
            const Icon = iconMap[suggestion.icon]
            const theme = cardThemes[index] || cardThemes[0]

            return (
              <div
                key={index}
                className={`${theme.bg} rounded-2xl p-4 transition-all`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${theme.iconBg}`}>
                      <Icon className={`w-3.5 h-3.5 ${theme.iconText}`} />
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded-full font-bold ${smallSize} ${theme.badge}`}>
                      {suggestion.label}
                    </span>
                    <span className={`text-muted-foreground ${largeText ? "text-[11px]" : "text-[10px]"}`}>
                      {suggestion.tone}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(suggestion.text, index)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${smallSize} ${
                      copiedIndex === index ? "bg-chart-3/10 text-chart-3" : theme.copyBg
                    }`}
                    aria-label={`Copy suggestion ${index + 1}`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="sr-only">{"Copied"}</span>
                      </>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Text */}
                <p className={`text-foreground leading-relaxed ${bodySize}`}>
                  {suggestion.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
