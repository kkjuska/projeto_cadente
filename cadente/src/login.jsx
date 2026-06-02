import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importado para fazer o redirecionamento correto
import Cadastro from './cadastro.jsx'

// Mudamos o nome de 'App' para 'Login' para fazer sentido no seu projeto
export default function Login() {
  const navigate = useNavigate(); // Inicializa o navegador de rotas
  
  // Estado que define qual sub-tela de autenticação está ativa: 'login' ou 'cadastro'
  const [telaAtiva, setTelaAtiva] = useState('login');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleConfirmar = () => {
    if (nome && email && senha) {
      console.log("Dados enviados:", { nome, email, senha, lembrar });
      
      // LOGADO COM SUCESSO: Agora manda o roteador levar o usuário para o Dashboard oficial
      navigate('/dashboard');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Se não estiver logado, renderiza a estrutura de Autenticação (Login / Cadastro) abaixo:
  return (
    <div className="bg-neutral-900 text-white flex justify-center items-center min-h-screen w-full p-4 sm:p-8 m-0">
      <div className="w-full max-w-[340px] sm:max-w-[420px] flex flex-col items-center">
        
        {/* Logo / Título (Fica fixo no lugar) */}
        <div className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2 select-none w-full">
          <span>Cadente</span>
          <img src="/assets/logo1.png" alt="Logo Cadente" className="h-7 w-auto object-contain inline-block" />
        </div>

        {/* Wrapper do Card */}
        <div className="relative w-full mb-6">
          
          {/* CARD AZUL DE TRÁS (ÚNICO E ANIMADO) */}
          <div 
            className={`absolute inset-0 bg-blue-600 rounded-2xl scale-[0.99] z-10 translate-y-3 transition-all duration-500 ease-in-out ${
              telaAtiva === 'login'
                ? 'transform rotate-[-2deg] -translate-x-1/12'
                : 'transform rotate-[1deg] translate-x-1/12'
            }`}
          ></div>
          
          {/* Card Principal */}
          <div className="relative bg-neutral-800 p-6 sm:p-8 rounded-2xl z-20 shadow-2xl min-h-[400px] flex flex-col justify-between transition-all duration-300">
            
            {telaAtiva === 'login' ? (
              /* Conteúdo de LOGIN */
              <>
                <div className="text-center text-xl font-normal mb-6 select-none">Login</div>
                
                <div className="space-y-5 flex-1">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Nome:</div>
                    <input 
                      type="text" 
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="off" 
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Email:</div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off" 
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setLembrar(!lembrar)}>
                    <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all duration-200 ${lembrar ? 'bg-blue-600 border-blue-600' : 'border-gray-500'}`}>
                      {lembrar && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <div className="text-xs text-gray-400">Lembrar de mim</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Senha:</div>
                    <input 
                      type="password" 
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="pt-0.5">
                    <div className="text-xs text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer inline-block">
                      Esqueceu a senha?
                    </div>
                  </div>

                  <div 
                    onClick={handleConfirmar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 active:scale-[0.98] cursor-pointer select-none mt-3"
                  >
                    Confirmar
                  </div>
                </div>
              </>
            ) : (
              /* Conteúdo de CADASTRO (Ao cadastrar, também redireciona para o dashboard) */
              <Cadastro onSucessoCadastro={() => navigate('/dashboard')} />
            )}

          </div>
        </div>

        {/* Link Inferior de Alternância */}
        <div className="text-xs relative z-50">
          <button 
            onClick={() => setTelaAtiva(telaAtiva === 'login' ? 'cadastro' : 'login')} 
            className="bg-transparent border-none text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer outline-none p-2"
          >
            {telaAtiva === 'login' ? 'Não tem conta?' : 'Já tem conta? Conectar-se'}
          </button>
        </div>

      </div>
    </div>
  );
}