"use client"

import { X, Volume2, Type, Globe } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface SettingsPanelProps {
  open: boolean
  onClose: () => void
  largeText: boolean
  onToggleLargeText: (value: boolean) => void
}

export function SettingsPanel({
  open,
  onClose,
  largeText,
  onToggleLargeText,
}: SettingsPanelProps) {
  if (!open) return null

  const titleSize = largeText ? "text-[22px]" : "text-[18px]"
  const bodySize = largeText ? "text-[17px]" : "text-[14px]"
  const smallSize = largeText ? "text-[13px]" : "text-[11px]"

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)] max-h-[75vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-1 rounded-full bg-border" />
        </div>

        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className={`font-bold text-foreground ${titleSize}`}>{"설정"}</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-secondary/70 transition-colors"
              aria-label="Close settings"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <Type className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className={`font-bold text-foreground ${bodySize}`}>{"큰 글씨 모드"}</p>
                  <p className={`text-muted-foreground ${smallSize}`}>{"글자를 크게 표시합니다"}</p>
                </div>
              </div>
              <Switch
                checked={largeText}
                onCheckedChange={onToggleLargeText}
                className="data-[state=checked]:bg-primary h-6 w-10"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                  <Volume2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className={`font-bold text-foreground ${bodySize}`}>{"음성 안내"}</p>
                  <p className={`text-muted-foreground ${smallSize}`}>{"번역 결과를 읽어줍니다"}</p>
                </div>
              </div>
              <Switch className="data-[state=checked]:bg-accent h-6 w-10" />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-chart-3/10">
                  <Globe className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className={`font-bold text-foreground ${bodySize}`}>{"언어"}</p>
                  <p className={`text-muted-foreground ${smallSize}`}>{"한국어 / English"}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg bg-chart-3/10 text-chart-3 font-bold ${smallSize}`}>
                {"KO"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
