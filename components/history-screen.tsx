"use client"

import { MessageSquare } from "lucide-react"
import { BearIllustration, CoffeeIllustration } from "@/components/k-illustrations"

interface HistoryScreenProps {
  largeText: boolean
}

const historyItems = [
  {
    id: 1,
    mode: "grandson" as const,
    original: "우리 손주 보고 싶다. 밥은 잘 먹고 있니?",
    translated: "할머니가 보고 싶대~ 밥은 잘 챙겨 먹고 있어? 😊",
    date: "오늘",
    time: "오후 2:30",
  },
  {
    id: 2,
    mode: "children" as const,
    original: "요즘 일이 많아서 힘들지? 건강 챙겨라.",
    translated: "요즘 바쁘지? 너무 무리하지 말고 건강 챙겨~ 💛",
    date: "어제",
    time: "오전 11:15",
  },
  {
    id: 3,
    mode: "grandson" as const,
    original: "이번 주말에 놀러 오렴. 맛있는 거 해놓을게.",
    translated: "이번 주말에 올래? 맛있는 거 해놓고 기다릴게~ 🍲",
    date: "3월 27일",
    time: "오후 5:00",
  },
]

export function HistoryScreen({ largeText }: HistoryScreenProps) {
  const titleSize = largeText ? "text-[20px]" : "text-[17px]"
  const bodySize = largeText ? "text-[15px]" : "text-[13px]"
  const smallSize = largeText ? "text-[12px]" : "text-[10px]"

  return (
    <div className="flex flex-col gap-3 px-4 py-5">
      <div className="px-1">
        <h2 className={`font-bold text-foreground ${titleSize}`}>{"번역 기록"}</h2>
        <p className={`text-muted-foreground mt-0.5 ${bodySize}`}>
          {"이전에 변환한 메시지를 확인하세요"}
        </p>
      </div>

      {historyItems.map((item) => {
        const Illustration = item.mode === "grandson" ? BearIllustration : CoffeeIllustration
        const bgColor = item.mode === "grandson" ? "bg-[#FFF5EC]" : "bg-[#EEF4FB]"

        return (
          <div
            key={item.id}
            className={`${bgColor} rounded-2xl p-4 transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Illustration className="w-6 h-6" />
                <span className={`font-bold text-foreground ${bodySize}`}>
                  {item.mode === "grandson" ? "손주에게" : "자녀에게"}
                </span>
              </div>
              <span className={`text-muted-foreground ${smallSize}`}>
                {item.date} {item.time}
              </span>
            </div>
            <p className={`text-muted-foreground ${bodySize} mb-1`}>{item.original}</p>
            <p className={`text-foreground font-medium ${bodySize}`}>{item.translated}</p>
          </div>
        )
      })}

      {historyItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className={`text-muted-foreground font-medium ${bodySize}`}>
            {"아직 번역 기록이 없어요"}
          </p>
          <p className={`text-muted-foreground ${smallSize} mt-1`}>
            {"메시지를 번역하면 여기에 저장됩니다"}
          </p>
        </div>
      )}
    </div>
  )
}
