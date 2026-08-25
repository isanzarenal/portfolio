import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { findFileByPath } from '../data/fileTree'
import { TabsContext, type OpenTab } from './tabsContext'

/** Route shown when the app loads at "/" with no tabs open yet. */
const DEFAULT_PATH = '/about'

export function TabsProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const hasRedirectedOnLoad = useRef(false)

  const [openTabs, setOpenTabs] = useState<OpenTab[]>(() => {
    const initialPath =
      location.pathname === '/' ? DEFAULT_PATH : location.pathname
    const file = findFileByPath(initialPath)
    return file?.path ? [{ name: file.name, path: file.path }] : []
  })

  useEffect(() => {
    if (hasRedirectedOnLoad.current) return
    hasRedirectedOnLoad.current = true
    if (location.pathname === '/') {
      navigate(DEFAULT_PATH, { replace: true })
    }
    // Runs once on mount only: redirects the initial "/" load to the default tab.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openTab(tab: OpenTab) {
    setOpenTabs((tabs) =>
      tabs.some((t) => t.path === tab.path) ? tabs : [...tabs, tab],
    )
  }

  function closeTab(path: string) {
    const index = openTabs.findIndex((tab) => tab.path === path)
    if (index === -1) return

    const nextTabs = [
      ...openTabs.slice(0, index),
      ...openTabs.slice(index + 1),
    ]
    setOpenTabs(nextTabs)

    if (location.pathname !== path) return

    if (nextTabs.length === 0) {
      navigate('/')
    } else {
      navigate(nextTabs[Math.max(index - 1, 0)].path)
    }
  }

  return (
    <TabsContext.Provider value={{ openTabs, openTab, closeTab }}>
      {children}
    </TabsContext.Provider>
  )
}
