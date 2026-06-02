import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login.jsx'
import Layout from './Layout.jsx' // Importa o novo Layout unificado
import Dashboard from './dashboard.jsx'
import Dashboard2 from './dashboard2.jsx'
import Perfil from './perfil.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela de login isolada */}
        <Route path="/" element={<Login />} />
        
        {/* Telas internas envelopadas pelo Layout unificado */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}