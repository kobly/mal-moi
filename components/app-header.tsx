"use client"

import { Bell } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { BojagiLogo } from "@/components/k-illustrations"

interface AppHeaderProps {
  largeText: boolean
  onToggleLargeText: (value: boolean) => void
}

export function AppHeader({
  largeText,
  onToggleLargeText,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border">
      {/* Left: Bojagi logo + app name */}
      <div className="flex items-center gap-2">
        <BojagiLogo className="w-9 h-9 shrink-0" />
        <div className="leading-none">
          <h1 className={`font-hand font-bold text-foreground tracking-tight ${largeText ? "text-[22px]" : "text-[19px]"}`}>
            {"\uB9D0\uBAA8\uC774"}
          </h1>
          <p className={`text-muted-foreground font-medium ${largeText ? "text-[11px]" : "text-[9px]"} -mt-0.5`}>
            {"Mal-Moi"}
          </p>
        </div>
      </div>

      {/* Right: profile avatar + large text toggle + notification */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary">
          <span className={`text-muted-foreground font-medium ${largeText ? "text-[12px]" : "text-[10px]"}`}>
            {"\uAC00"}
          </span>
          <Switch
            checked={largeText}
            onCheckedChange={onToggleLargeText}
            aria-label="Toggle large text mode"
            className="data-[state=checked]:bg-primary h-5 w-9"
          />
          <span className={`text-foreground font-bold ${largeText ? "text-[15px]" : "text-[13px]"}`}>
            {"\uAC00"}
          </span>
        </div>

        {/* Profile avatar */}
        <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 32 32" className="w-8 h-8">
            <circle cx="16" cy="16" r="16" fill="#FDE8D8" />
            <circle cx="16" cy="12" r="5" fill="#E8A54B" />
            <ellipse cx="16" cy="26" rx="9" ry="7" fill="#E8A54B" />
          </svg>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-card" />
        </div>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/70 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-foreground" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  )
}
