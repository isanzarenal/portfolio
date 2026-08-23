import { Outlet } from 'react-router'
import { Breadcrumb } from './Breadcrumb'
import { Sidebar } from './Sidebar'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'
import { TitleBar } from './TitleBar'

export function IdeLayout() {
  return (
    <div className="flex h-screen flex-col bg-editor font-sans text-fg">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TabBar />
          <Breadcrumb />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <StatusBar />
    </div>
  )
}
