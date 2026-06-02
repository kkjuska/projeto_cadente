import { useState } from 'react'

export default function Flashcard() {
  // Estado para controlar qual face está ativa na frente ('pergunta' ou 'resposta')
  const [faceAtiva, setFaceAtiva] = useState('pergunta');

  const cardDados = {
    materia: 'Citologia',
    pergunta: 'O que é Citologia?',
    resposta: 'É o ramo da biologia que estuda as células, suas estruturas, funções e sua importância na constituição dos seres vivos.'
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-neutral-900 px-6 min-h-[calc(100vh-80px)] select-none">
      
      {/* Ajustado: Aumentei a margem inferior (mb-24) para empurrar os cards mais para baixo */}
      <h1 className="text-2xl font-bold tracking-wide text-white mb-24">
        {cardDados.materia}
      </h1>

      {/* CONTAINER DOS CARDS (Empilhamento dinâmico) */}
      <div 
        onClick={() => setFaceAtiva(faceAtiva === 'pergunta' ? 'resposta' : 'pergunta')}
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
              Clique aqui para ver sua resposta
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