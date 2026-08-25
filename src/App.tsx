import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { IdeLayout } from './layout/IdeLayout'
import { About } from './pages/About'
import { Skills } from './pages/Skills'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<IdeLayout />}>
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
