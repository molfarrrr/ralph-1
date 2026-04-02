import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { WorkPage } from '@/pages/WorkPage'
import { ContactPage } from '@/pages/ContactPage'

export function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/cv" element={<Layout><AboutPage /></Layout>} />
      <Route path="/about" element={<Navigate to="/cv" replace />} />
      <Route path="/work" element={<Layout><WorkPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
