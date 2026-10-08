import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ActividadDetalle } from './pages/ActividadDetalle'
import { Actividades } from './pages/Actividades'
import { Admin } from './pages/Admin'
import { ColegioDetalle } from './pages/ColegioDetalle'
import { Colegios } from './pages/Colegios'
import { Favoritos } from './pages/Favoritos'
import { Home } from './pages/Home'
import { Mapa } from './pages/Mapa'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="actividades" element={<Actividades />} />
          <Route path="actividades/:slug" element={<ActividadDetalle />} />
          <Route path="colegios" element={<Colegios />} />
          <Route path="colegios/:slug" element={<ColegioDetalle />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
