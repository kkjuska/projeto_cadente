import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 

export default function Perfil() {
  const navigate = useNavigate(); 
  
  // Estados para gerenciar as informações do usuário logado
  const [idUsuario, setIdUsuario] = useState(null);
  const [nome, setNome] = useState('Usuário');
  const [email, setEmail] = useState('E-mail não disponível');
  
  // Estados de controle da tela
  const [modoEdicao, setModoEdicao] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const API_URL = 'http://localhost:3000';

  // Carrega os dados salvos na sessão assim que o componente monta na tela
  useEffect(() => {
    const usuarioSalvo = sessionStorage.getItem('@Cadente:usuario');
    if (usuarioSalvo) {
      try {
        const usuarioObj = JSON.parse(usuarioSalvo);
        if (usuarioObj.id) setIdUsuario(usuarioObj.id);
        if (usuarioObj.nome) setNome(usuarioObj.nome);
        if (usuarioObj.email) setEmail(usuarioObj.email);
      } catch (error) {
        console.error("Erro ao ler dados da sessão:", error);
      }
    }
  }, []);

  // BOTÃO 1: Apenas volta para a tela inicial/login (Mantém o usuário logado em segundo plano)
  const handleVoltarParaLogin = () => {
    navigate('/'); 
  };

  // BOTÃO 2: Desloga oficialmente do sistema limpando a sessão (Sem deletar a conta do banco)
  const handleSairDaConta = () => {
    if (window.confirm("Deseja encerrar sua sessão atual? Sua conta continuará intacta no banco.")) {
      sessionStorage.removeItem('@Cadente:usuario'); 
      navigate('/'); 
    }
  };

  // Função para salvar a edição do perfil no Postgres
  const handleBotaoPerfil = async () => {
    if (!modoEdicao) {
      setModoEdicao(true);
      return;
    }

    if (!nome.trim() || !email.trim()) {
      alert("O nome e o e-mail não podem ficar vazios.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/auth/atualizar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idUsuario, nome, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        sessionStorage.setItem('@Cadente:usuario', JSON.stringify(data.usuario));
        setModoEdicao(false);
      } else {
        alert(data.erro || "Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error("Erro de rede ao atualizar:", error);
      alert("Não foi possível conectar ao servidor para salvar.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="w-full flex flex-row items-stretch justify-between pl-12 pt-6 pb-12 gap-8 h-auto">
      
      {/* BLOCO DA ESQUERDA (Perfil) */}
      <div className="flex-1 max-w-[700px] bg-neutral-800/40 border border-neutral-800/60 rounded-[32px] p-10 flex flex-col items-center justify-between">
        
        <div className="w-full">
          {/* Cabeçalho do Perfil + Seção de Botões à Direita */}
          <div className="w-full flex items-center justify-between mb-10 pl-2 pr-2">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700/40 shadow-inner">
                <span className="text-3xl text-blue-500">👤</span>
              </div>
              <div className="flex flex-col">
                <span className="bg-neutral-800/80 px-4 py-1 rounded-full text-sm font-medium text-gray-300 border border-neutral-700/30 w-fit">
                  {nome}
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-1.5 ml-2">Sem Premium</span>
              </div>
            </div>

            {/* CONTAINER DOS DOIS BOTÕES DE SAÍDA / RETORNO */}
            <div className="flex items-center gap-2">
              {/* Botão Apenas Voltar */}
              <button 
                onClick={handleVoltarParaLogin}
                className="text-xs font-medium text-neutral-400 hover:text-white border border-neutral-700/60 bg-neutral-800/20 px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-[0.97]"
              >
                 Voltar ao Login
              </button>

              {/* Botão Fazer Logout */}
              <button 
                onClick={handleSairDaConta}
                className="text-xs font-medium text-neutral-400 hover:text-red-400 border border-neutral-700/60 hover:border-red-500/30 bg-neutral-800/40 px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-[0.97]"
              >
                 Encerrar Sessão
              </button>
            </div>
          </div>

          <div className="w-full space-y-6">
            {/* Input Nome */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-neutral-500 ml-1 mb-1.5">Nome da conta</span>
              <input 
                type="text" 
                value={nome} 
                disabled={!modoEdicao || carregando} 
                onChange={(e) => setNome(e.target.value)}
                className={`w-full h-12 border rounded-xl px-4 text-sm text-gray-300 outline-none transition-all duration-300 ${
                  modoEdicao 
                    ? 'bg-neutral-800 border-blue-500 focus:border-blue-400' 
                    : 'bg-neutral-800/60 border-neutral-800 cursor-not-allowed'
                }`} 
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-neutral-500 ml-1 mb-1.5">Endereço de e-mail</span>
              <input 
                type="email" 
                value={email} 
                disabled={!modoEdicao || carregando} 
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 border rounded-xl px-4 text-sm text-gray-300 outline-none transition-all duration-300 ${
                  modoEdicao 
                    ? 'bg-neutral-800 border-blue-500 focus:border-blue-400' 
                    : 'bg-neutral-800/60 border-neutral-800 cursor-not-allowed'
                }`} 
              />
            </div>

            {/* Input Senha */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-neutral-500 ml-1 mb-1.5">Senha</span>
              <input 
                type="password" 
                value="xxxxxxxxxxxx" 
                disabled 
                className="w-full h-12 bg-neutral-800/60 border border-neutral-800 rounded-xl px-4 text-sm text-neutral-600 cursor-not-allowed outline-none select-none" 
              />
            </div>
          </div>
        </div>

        {/* Botão de salvar alterações */}
        <button 
          onClick={handleBotaoPerfil}
          disabled={carregando}
          className={`mt-10 w-[240px] text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98] ${
            modoEdicao 
              ? 'bg-green-600 hover:bg-green-500 animate-pulse' 
              : 'bg-blue-600 hover:bg-blue-500'
          } disabled:opacity-50`}
        >
          {carregando ? 'Salvando...' : modoEdicao ? 'Salvar Alterações' : 'Editar'}
        </button>
      </div>

      {/* BLOCO DA DIREITA (Assinatura) */}
      <div className="w-[360px] bg-neutral-800/40 border-y border-l border-neutral-800/60 rounded-[32px] p-10 mr-10 flex flex-col items-center justify-between">
        <div className="w-full text-center space-y-8 mt-2">
          <h3 className="text-3xl font-bold tracking-wide text-white">Assinatura</h3>
          <div className="space-y-4 pt-4">
            <p className="text-lg font-medium text-gray-300">11,99R$ <span className="text-neutral-500 text-sm">/ mensal</span></p>
            <p className="text-lg font-medium text-gray-300">9,99R$ <span className="text-neutral-500 text-sm">/ anual</span></p>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed px-4 pt-4">
            Assine o premium para ter mais coleções sem limites.
          </p>
        </div>
        
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98] tracking-wider mb-2">
          Melhorar seu plano
        </button>
      </div>

    </div>
  )
}