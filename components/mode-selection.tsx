"use client"

import { ChevronRight } from "lucide-react"
import { BearIllustration, CoffeeIllustration } from "@/components/k-illustrations"

export type Mode = "grandchild" | "child"

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
      <div className="px-1">
        <h2 className={`font-bold text-foreground ${titleSize} leading-tight`}>
          {"누구에게 보낼까요?"}
        </h2>
        <p className={`text-muted-foreground mt-0.5 ${bodySize}`}>
          {"대화 상대를 선택해주세요"}
        </p>
      </div>

      <button
        onClick={() => onSelectMode("grandchild")}
        className="group relative flex items-center gap-4 p-4 bg-[#FFF5EC] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(232,114,42,0.12)] transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden"
        aria-label="Grandchild Mode - Communicate with your grandchild"
      >
        <div className="relative shrink-0 w-16 h-16">
          <BearIllustration className="w-full h-full" />
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h3 className={`font-bold text-foreground ${subtitleSize} leading-tight`}>
              {"손주에게"}
            </h3>
            <span className={`text-muted-foreground ${bodySize}`}>{"Grandchild"}</span>
          </div>
          <p className={`text-muted-foreground mt-0.5 leading-snug ${bodySize}`}>
            {"요즘 표현으로 바꿔드릴게요"}
          </p>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </button>

      <button
        onClick={() => onSelectMode("child")}
        className="group relative flex items-center gap-4 p-4 bg-[#EEF4FB] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(59,130,196,0.12)] transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
        aria-label="Child Mode - Communicate with your child"
      >
        <div className="relative shrink-0 w-16 h-16">
          <CoffeeIllustration className="w-full h-full" />
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h3 className={`font-bold text-foreground ${subtitleSize} leading-tight`}>
              {"자녀에게"}
            </h3>
            <span className={`text-muted-foreground ${bodySize}`}>{"Child"}</span>
          </div>
          <p className={`text-muted-foreground mt-0.5 leading-snug ${bodySize}`}>
            {"따뜻한 요즘 말투로 전해요"}
          </p>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
          <ChevronRight className="w-4 h-4 text-accent" />
        </div>
      </button>
    </div>
  )
}
