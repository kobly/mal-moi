"use client"

import { ChevronRight } from "lucide-react"
import { BearIllustration, CoffeeIllustration } from "@/components/k-illustrations"

export type Mode = "grandson" | "children"

interface ModeSelectionProps {
  largeText: boolean
  onSelectMode: (mode: Mode) => void
}

export function ModeSelection({ largeText, onSelectMode }: ModeSelectionProps) {
  const titleSize = largeText ? "text-[24px]" : "text-[20px]"
  const subtitleSize = largeText ? "text-[18px]" : "text-[15px]"
  const bodySize = largeText ? "text-[16px]" : "text-[13px]"

  return (
    <div className="flex flex-col gap-3 px-4 py-5">
      {/* Section heading */}
      <div className="px-1">
        <h2
          className={`font-bold text-foreground ${titleSize} leading-tight`}
        >
          {"누구에게 보낼까요?"}
        </h2>
        <p className={`text-muted-foreground mt-0.5 ${bodySize}`}>
          {"대화 상대를 선택해주세요"}
        </p>
      </div>

      {/* Grandson Mode Card */}
      <button
        onClick={() => onSelectMode("grandson")}
        className="group relative flex items-center gap-4 p-4 bg-[#FFF5EC] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(232,114,42,0.12)] transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden"
        aria-label="Grandson Mode - Communicate with your grandchild"
      >
        {/* Illustration */}
        <div className="relative shrink-0 w-16 h-16">
          <BearIllustration className="w-full h-full" />
        </div>

        {/* Text content */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h3 className={`font-bold text-foreground ${subtitleSize} leading-tight`}>
              {"손주에게"}
            </h3>
            <span className={`text-muted-foreground ${bodySize}`}>
              {"Grandson"}
            </span>
          </div>
          <p className={`text-muted-foreground mt-0.5 leading-snug ${bodySize}`}>
            {"요즘 표현으로 바꿔드릴게요"}
          </p>
          {/* Integrated Progress Bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 rounded-full bg-primary/15 overflow-hidden">
              <div className="w-3/4 h-full rounded-full bg-primary transition-all" />
            </div>
            <span className={`text-primary font-bold ${largeText ? "text-[11px]" : "text-[10px]"}`}>
              {"75%"}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </button>

      {/* Children Mode Card */}
      <button
        onClick={() => onSelectMode("children")}
        className="group relative flex items-center gap-4 p-4 bg-[#EEF4FB] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(59,130,196,0.12)] transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
        aria-label="Children Mode - Communicate with your adult children"
      >
        {/* Illustration */}
        <div className="relative shrink-0 w-16 h-16">
          <CoffeeIllustration className="w-full h-full" />
        </div>

        {/* Text content */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h3 className={`font-bold text-foreground ${subtitleSize} leading-tight`}>
              {"자녀에게"}
            </h3>
            <span className={`text-muted-foreground ${bodySize}`}>
              {"Children"}
            </span>
          </div>
          <p className={`text-muted-foreground mt-0.5 leading-snug ${bodySize}`}>
            {"따뜻한 요즘 말투로 전해요"}
          </p>
          {/* Progress Bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 rounded-full bg-accent/15 overflow-hidden">
              <div className="w-2/3 h-full rounded-full bg-accent transition-all" />
            </div>
            <span className={`text-accent font-bold ${largeText ? "text-[11px]" : "text-[10px]"}`}>
              {"66%"}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
          <ChevronRight className="w-4 h-4 text-accent" />
        </div>
      </button>

      {/* Quick Tips Section */}
      <div className="mt-2 p-3.5 bg-card rounded-2xl border border-border">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FEE500]">
            <span className="text-[12px] font-bold text-foreground">{"!"}</span>
          </div>
          <span className={`font-bold text-foreground ${bodySize}`}>
            {"오늘의 소통 팁"}
          </span>
        </div>
        <p className={`text-muted-foreground leading-relaxed ${bodySize}`}>
          {"\"요즘 뭐 하고 지내?\" 같은 가벼운 안부가 대화의 시작이에요."}
        </p>
      </div>
    </div>
  )
}
