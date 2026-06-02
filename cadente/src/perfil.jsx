export default function Perfil() {
  return (
    /* Ajustado: 'w-full h-full flex flex-row items-stretch' 
      O 'items-stretch' força os dois blocos filhos a terem EXATAMENTE a mesma altura automaticamente.
      Removido padding lateral direito para o bloco encostar na parede.
    */
    <div className="w-full flex flex-row items-stretch justify-between pl-12 pt-6 pb-12 gap-8 h-auto">
      
      {/* BLOCO DA ESQUERDA (Perfil) */}
      <div className="flex-1 max-w-[700px] bg-neutral-800/40 border border-neutral-800/60 rounded-[32px] p-10 flex flex-col items-center justify-between">
        <div className="w-full">
          <div className="w-full flex items-center gap-5 mb-10 pl-2">
            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700/40 shadow-inner">
              <span className="text-3xl text-blue-500">👤</span>
            </div>
            <div className="flex flex-col">
              <span className="bg-neutral-800/80 px-4 py-1 rounded-full text-sm font-medium text-gray-300 border border-neutral-700/30 w-fit">Juan</span>
              <span className="text-xs text-neutral-500 font-medium mt-1.5 ml-2">Sem Premium</span>
            </div>
          </div>

          <div className="w-full space-y-6">
            <input type="text" placeholder="Nome" disabled className="w-full h-12 bg-neutral-800/60 border border-neutral-800 rounded-xl px-4 text-sm text-gray-400 placeholder-neutral-500 cursor-not-allowed" />
            <input type="email" placeholder="E-mail" disabled className="w-full h-12 bg-neutral-800/60 border border-neutral-800 rounded-xl px-4 text-sm text-gray-400 placeholder-neutral-500 cursor-not-allowed" />
            <input type="password" placeholder="**********" disabled className="w-full h-12 bg-neutral-800/60 border border-neutral-800 rounded-xl px-4 text-sm text-gray-400 placeholder-neutral-500 cursor-not-allowed" />
          </div>
        </div>

        <button className="mt-10 w-[240px] bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98]">
          Editar
        </button>
      </div>

      {/* BLOCO DA DIREITA (Assinatura) */}
      {/* Ajustado: Removido cantos arredondados da direita ('rounded-l-[32px]') 
        para grudar na parede de forma nativa e limpa.
      */}
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