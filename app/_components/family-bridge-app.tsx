'use client'

import { useState } from 'react'

import { AppHeader } from '@/components/app-header'
import { BottomNav, type NavTab } from '@/components/bottom-nav'
import { HistoryScreen } from '@/components/history-screen'
import { ModeSelection, type Mode } from '@/components/mode-selection'
import { SettingsPanel } from '@/components/settings-panel'
import { TranslationScreen } from '@/components/translation-screen'

export function FamilyBridgeApp() {
  const [largeText, setLargeText] = useState(false)
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const [activeTab, setActiveTab] = useState<NavTab>('home')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleTabChange = (tab: NavTab) => {
    if (tab === 'settings') {
      setSettingsOpen(true)
      return
    }

    setActiveTab(tab)

    if (tab === 'home') {
      setSelectedMode(null)
    }
  }

  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col bg-background">
      <AppHeader largeText={largeText} onToggleLargeText={setLargeText} />

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {activeTab === 'home' &&
          (selectedMode === null ? (
            <ModeSelection largeText={largeText} onSelectMode={setSelectedMode} />
          ) : (
            <TranslationScreen
              mode={selectedMode}
              largeText={largeText}
              onBack={() => setSelectedMode(null)}
            />
          ))}

        {activeTab === 'history' && <HistoryScreen largeText={largeText} />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} largeText={largeText} />

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        largeText={largeText}
        onToggleLargeText={setLargeText}
      />
    </div>
  )
}
