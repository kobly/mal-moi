"use client"

import { Clock, Settings } from "lucide-react"
import { BojagiLogoSmall } from "@/components/k-illustrations"

export type NavTab = "home" | "history" | "settings"

interface BottomNavProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
  largeText: boolean
}

export function BottomNav({ activeTab, onTabChange, largeText }: BottomNavProps) {
  const labelSize = largeText ? "text-[13px]" : "text-[11px]"

  const tabs: { id: NavTab; koreanLabel: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      koreanLabel: "\uD648",
      icon: <BojagiLogoSmall className={`${largeText ? "w-6 h-6" : "w-5 h-5"}`} />,
    },
    {
      id: "history",
      koreanLabel: "\uAE30\uB85D",
      icon: <Clock className={`${largeText ? "w-6 h-6" : "w-5 h-5"}`} strokeWidth={activeTab === "history" ? 2.5 : 1.8} />,
    },
    {
      id: "settings",
      koreanLabel: "\uC124\uC815",
      icon: <Settings className={`${largeText ? "w-6 h-6" : "w-5 h-5"}`} strokeWidth={activeTab === "settings" ? 2.5 : 1.8} />,
    },
  ]

  return (
    <nav
      className="flex items-stretch bg-card border-t border-border"
      role="tablist"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors relative ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-primary" />
            )}
            {tab.icon}
            <span className={`font-semibold ${labelSize}`}>{tab.koreanLabel}</span>
          </button>
        )
      })}
    </nav>
  )
}
