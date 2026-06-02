import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import Cadastro from './cadastro.jsx'

export default function Login() {
  const navigate = useNavigate(); 
  
  // Estado que define qual sub-tela de autenticação está activa: 'login' ou 'cadastro'
  const [telaAtiva, setTelaAtiva] = useState('login');

  // Estados dos inputs do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  
  // Estado para controlar o feedback visual de carregamento da API
  const [carregando, setCarregando] = useState(false);

  // URL base do seu servidor Node backend
  const API_URL = 'http://localhost:3000';

  const handleConfirmar = async () => {
    // Validação local no frontend para garantir que nenhum campo vá vazio para o Postgres
    if (!nome || !email || !senha) {
      alert("Por favor, preencha o nome, e-mail e senha.");
      return;
    }

    setCarregando(true);

    try {
      // Faz o disparo para a rota de autenticação completa do seu server.js
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se a opção lembrar de mim estiver ativa, salva o e-mail localmente no navegador
        if (lembrar) {
          localStorage.setItem('@Cadente:email', email);
        }

        // ====== NOVIDADE AQUI: SALVA O USUÁRIO DO BANCO NA SESSÃO ======
        sessionStorage.setItem('@Cadente:usuario', JSON.stringify(data.usuario));

        console.log("Login validado com sucesso pelo Postgres e salvo na sessão:", data);
        
        // Redireciona o usuário para o Dashboard oficial
        navigate('/dashboard');
      } else {
        // Exibe a mensagem de erro exata vinda do banco (ex: Credenciais inválidas)
        alert(data.erro || "Erro ao realizar o login.");
      }
    } catch (error) {
      console.error("Erro de rede ou servidor:", error);
      alert("Não foi possível conectar ao servidor backend. Garanta que a API está rodando.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-neutral-900 text-white flex justify-center items-center min-h-screen w-full p-4 sm:p-8 m-0">
      <div className="w-full max-w-[340px] sm:max-w-[420px] flex flex-col items-center">
        
        {/* Logo / Título */}
        <div className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2 select-none w-full">
          <span>Cadente</span>
          <img src="/assets/logo1.png" alt="Logo Cadente" className="h-7 w-auto object-contain inline-block" />
        </div>

        {/* Wrapper do Card */}
        <div className="relative w-full mb-6">
          
          {/* CARD AZUL DE TRÁS (ANIMADO) */}
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
                  {/* Input Nome */}
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Nome:</div>
                    <input 
                      type="text" 
                      value={nome}
                      disabled={carregando}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="off" 
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>

                  {/* Input Email */}
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Email:</div>
                    <input 
                      type="email" 
                      value={email}
                      disabled={carregando}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off" 
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>

                  {/* Componente Lembrar de mim */}
                  <div 
                    className="flex items-center gap-2.5 cursor-pointer select-none" 
                    onClick={() => !carregando && setLembrar(!lembrar)}
                  >
                    <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all duration-200 ${lembrar ? 'bg-blue-600 border-blue-600' : 'border-gray-500'}`}>
                      {lembrar && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <div className="text-xs text-gray-400">Lembrar de mim</div>
                  </div>

                  {/* Input Senha */}
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">Senha:</div>
                    <input 
                      type="password" 
                      value={senha}
                      disabled={carregando}
                      onChange={(e) => setSenha(e.target.value)}
                      className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>

                  {/* Esqueceu a senha */}
                  <div className="pt-0.5">
                    <div className="text-xs text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer inline-block">
                      Esqueceu a senha?
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <div 
                    onClick={!carregando ? handleConfirmar : null}
                    className={`w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none mt-3 ${
                      carregando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer active:scale-[0.98]'
                    }`}
                  >
                    {carregando ? 'Verificando...' : 'Confirmar'}
                  </div>
                </div>
              </>
            ) : (
              /* Conteúdo de CADASTRO */
              <Cadastro onSucessoCadastro={() => navigate('/dashboard')} apiUrl={API_URL} />
            )}

          </div>
        </div>

        {/* Link Inferior de Alternância */}
        <div className="text-xs relative z-50">
          <button 
            onClick={() => !carregando && setTelaAtiva(telaAtiva === 'login' ? 'cadastro' : 'login')} 
            className="bg-transparent border-none text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer outline-none p-2 disabled:opacity-50"
            disabled={carregando}
          >
            {telaAtiva === 'login' ? 'Não tem conta?' : 'Já tem conta? Conectar-se'}
          </button>
        </div>

      </div>
    </div>
  );
}