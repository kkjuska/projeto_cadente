import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation();
  const [carregado, setCarregado] = useState(false);

  // Reinicia a animação suave toda vez que muda de aba
  useEffect(() => {
    setCarregado(false);
    const timer = setTimeout(() => setCarregado(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Define a posição do quadrado de fundo da sidebar baseado na rota
  const getTransformSidebar = () => {
    if (location.pathname === '/dashboard2') return 'translateY(52px)';
    if (location.pathname === '/perfil') return 'translateY(104px)';
    return 'translateY(0px)';
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen w-full flex m-0 p-0 font-sans antialiased selection:bg-blue-600 overflow-hidden">
      
      {/* SIDEBAR FIXA */}
      <aside className="w-[240px] border-r border-neutral-800 flex flex-col justify-between p-6 shrink-0 h-screen bg-neutral-900 z-30">
        <div className="space-y-8">
          <div className="text-2xl font-poppins font-extrabold flex items-center gap-2 select-none px-2">
            <span>Cadente</span>
            <img src="/assets/logo1.png" alt="Logo Cadente" className="h-6 w-auto object-contain inline-block" />
          </div>

          <nav className="space-y-2 relative">
            <div 
              className="absolute left-0 right-0 h-[44px] bg-neutral-800/80 rounded-xl z-0 pointer-events-none transition-transform duration-300 ease-out" 
              style={{ transform: getTransformSidebar() }}
            />

            {/* Link: Suas Coleções */}
            <Link to="/dashboard" className={`relative flex items-center justify-between px-4 h-[44px] rounded-xl select-none z-10 transition-colors duration-200 ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/suascolecoes.png" 
                  alt="Suas Coleções" 
                  className={`w-5 h-5 object-contain transition-opacity duration-200 ${location.pathname === '/dashboard' ? 'opacity-100' : 'opacity-60'}`} 
                />
                <span className="text-sm font-medium">Suas coleções</span>
              </div>
              {location.pathname === '/dashboard' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </Link>

            {/* Link: Coleções Postadas */}
            <Link to="/dashboard2" className={`relative flex items-center justify-between px-4 h-[44px] rounded-xl select-none z-10 transition-colors duration-200 ${location.pathname === '/dashboard2' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/colecoespostadas.png" 
                  alt="Coleções Postadas" 
                  className={`w-5 h-5 object-contain transition-opacity duration-200 ${location.pathname === '/dashboard2' ? 'opacity-100' : 'opacity-60'}`} 
                />
                <span className="text-sm font-medium">Coleções postadas</span>
              </div>
              {location.pathname === '/dashboard2' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </Link>

            {/* Link: Perfil */}
            <Link to="/perfil" className={`relative flex items-center justify-between px-4 h-[44px] rounded-xl select-none z-10 transition-colors duration-200 ${location.pathname === '/perfil' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/perfil.png" 
                  alt="Perfil" 
                  className={`w-5 h-5 object-contain transition-opacity duration-200 ${location.pathname === '/perfil' ? 'opacity-100' : 'opacity-60'}`} 
                />
                <span className="text-sm font-medium">Perfil</span>
              </div>
              {location.pathname === '/perfil' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </Link>
          </nav>
        </div>

        <div className="relative">
          <div className="absolute -top-6 left-6 text-blue-400 text-xl font-bold transform rotate-[-15deg] select-none animate-pulse">✦</div>
          <div className="bg-blue-600 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <p className="text-xs font-semibold text-white/90 leading-snug mb-4 max-w-[140px]">Faça mais cards com o premium</p>
            <button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.97] shadow-sm">assinar</button>
          </div>
        </div>
      </aside>

      {/* PAINEL DA DIREITA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative bg-neutral-900">
        
        {/* CONTAINER DA TRANSIÇÃO */}
        <div className={`w-full border-b border-neutral-800 shrink-0 transition-all duration-500 ease-in-out overflow-hidden ${
          location.pathname === '/dashboard' 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          
          <div className="w-full px-12 pt-10 pb-10">
            {/* CARD DA OFENSIVA */}
            <div className="bg-neutral-800/40 border border-neutral-800/20 rounded-[32px] p-10 flex flex-row items-center justify-between gap-8 w-full shadow-lg">
              
              <div className="space-y-4 pl-2">
                <h1 className="text-[40px] font-bold tracking-wide text-white">Ofensiva</h1>
                <p className="text-neutral-400 text-[17px] font-normal max-w-[450px] leading-relaxed">
                  Você está quase terminando a semana
                </p>
              </div>

              <div className="flex flex-col items-end gap-3.5 pr-2">
                <div className="text-right mr-1">
                  <h3 className="text-2xl font-bold text-white tracking-wide">7 dias de ofensiva</h3>
                  <p className="text-xs text-neutral-500 font-medium tracking-wide mt-0.5">Continue assim!</p>
                </div>
                
                <div className="bg-blue-600 rounded-full px-6 py-2.5 flex items-center justify-center gap-5 shadow-md">
                  {[24, 25, 26, 27, 28, 29, 30].map((dia) => (
                    <span key={dia} className="text-[15px] font-bold tracking-wide text-white select-none">
                      {dia}
                    </span>
                  ))}
                </div>
                
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.97] shadow-md tracking-wide mt-0.5 mr-1">
                  ver mais
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* CONTEÚDO ROTATIVO */}
        <div className={`w-full flex-1 transition-all duration-500 ease-out ${
          carregado ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Outlet />
        </div>

      </main>
    </div>
  )
}