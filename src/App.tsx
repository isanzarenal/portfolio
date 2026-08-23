import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { IdeLayout } from './layout/IdeLayout'
import { About } from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IdeLayout />}>
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
