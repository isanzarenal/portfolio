import { createContext, useContext } from 'react'

export type OpenTab = { name: string; path: string }

export type TabsContextValue = {
  openTabs: OpenTab[]
  openTab: (tab: OpenTab) => void
  closeTab: (path: string) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}
