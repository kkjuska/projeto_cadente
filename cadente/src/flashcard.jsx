import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // Importado useLocation para ler o estado enviado

export default function Flashcard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega o nome da matéria que foi clicada lá no Dashboard
  const materiaSelecionada = location.state?.materiaSelecionada || 'Citologia';

  // Estado para controlar qual face está ativa na frente ('pergunta' ou 'resposta')
  const [faceAtiva, setFaceAtiva] = useState('pergunta');
  
  // Estado para guardar os dados reais vindos do Postgres
  const [cardDados, setCardDados] = useState({
    materia: materiaSelecionada,
    pergunta: 'Carregando pergunta...',
    resposta: 'Carregando resposta...'
  });
  const [carregando, setCarregando] = useState(true);

  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    const buscarFlashcardDoBanco = async () => {
      try {
        // Faz a requisição enviando o nome da matéria selecionada na query string
        const response = await fetch(`${API_URL}/flashcards/materia?nome=${encodeURIComponent(materiaSelecionada)}`);
        const dados = await response.json();

        if (response.ok) {
          setCardDados({
            materia: dados.materia,
            pergunta: dados.pergunta,
            resposta: dados.resposta
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do flashcard:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarFlashcardDoBanco();
  }, [materiaSelecionada]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-neutral-900 px-6 min-h-[calc(100vh-80px)] select-none relative">
      
      {/* BOTÃO PARA VOLTAR AO DASHBOARD (TELA INICIAL) */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-12 flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 hover:text-white bg-neutral-800/40 hover:bg-neutral-800 border border-neutral-800 rounded-xl px-4 py-2.5 transition-all duration-200 active:scale-[0.97] cursor-pointer"
      >
        ⬅️ Voltar ao Dashboard
      </button>

      {/* Título da Matéria Dinâmico */}
      <h1 className="text-2xl font-bold tracking-wide text-white mb-24">
        {cardDados.materia}
      </h1>

      {/* CONTAINER DOS CARDS (Empilhamento dinâmico) */}
      <div 
        onClick={() => !carregando && setFaceAtiva(faceAtiva === 'pergunta' ? 'resposta' : 'pergunta')}
        className="relative w-full max-w-[580px] aspect-[16/10] cursor-pointer"
      >
        
        {/* ==========================================
            CARD DA PERGUNTA (Cinza Escuro)
           ========================================== */}
        <div 
          className={`absolute inset-0 w-full h-full bg-neutral-800/90 border border-neutral-700/30 rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 ease-in-out transform-gpu
            ${faceAtiva === 'pergunta' 
              ? 'z-20 translate-y-0 scale-100 opacity-100' 
              : 'z-10 translate-y-4 scale-95 opacity-40'
            }
          `}
        >
          {/* Detalhe Azul decorativo na lateral esquerda */}
          <div className="absolute left-0 top-0 -bottom-0 w-3 bg-blue-700 rounded-l-3xl" />

          <div className="pl-4 pt-4">
            <p className="text-xl font-medium leading-relaxed text-white">
              <span className="font-extrabold text-blue-500 mr-2">Pergunta:</span> 
              {cardDados.pergunta}
            </p>
          </div>

          <div className="pl-4 pb-2">
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              {carregando ? 'Buscando informações...' : 'Clique aqui para ver sua resposta'}
            </span>
          </div>
        </div>

        {/* ==========================================
            CARD DA RESPOSTA (Azul) - Efeito de troca na mão
           ========================================== */}
        <div 
          className={`absolute inset-0 w-full h-full bg-blue-600 border border-blue-500 rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 ease-in-out transform-gpu
            ${faceAtiva === 'resposta' 
              ? 'z-20 translate-y-0 scale-100 opacity-100' 
              : 'z-10 -translate-y-full scale-95 opacity-0 pointer-events-none'
            }
          `}
        >
          {/* Detalhe Escuro decorativo na lateral esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-neutral-900/40 rounded-l-3xl" />

          <div className="pl-4 pt-4 space-y-3">
            <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
              Resposta Correta
            </span>
            <p className="text-lg font-medium leading-relaxed text-white">
              {cardDados.resposta}
            </p>
          </div>

          <div className="pl-4 pb-2">
            <span className="text-xs font-bold tracking-wider text-white/80">
              Clique para voltar à pergunta
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}