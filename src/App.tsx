import { BrowserRouter, Route, Routes } from 'react-router'
import { IdeLayout } from './layout/IdeLayout'
import { TabsProvider } from './layout/TabsProvider'
import { About } from './pages/About'
import { ProjectDetail } from './pages/ProjectDetail'
import { Projects } from './pages/Projects'
import { Skills } from './pages/Skills'
import { Welcome } from './pages/Welcome'

export function AppRoutes() {
  return (
    <TabsProvider>
      <Routes>
        <Route element={<IdeLayout />}>
          <Route index element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:fileName" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </TabsProvider>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
