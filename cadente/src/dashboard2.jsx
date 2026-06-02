import { useState } from 'react'

export default function Dashboard2() {
  // Seus dados mantidos perfeitamente
  const [maisVistas] = useState([
    { id: 1, nome: 'Inglês', sigla: 'ING', progresso: '00/00' },
    { id: 2, nome: 'Matematica', sigla: 'MAT', progresso: '00/00' },
    { id: 3, nome: 'Português', sigla: 'POR', progresso: '00/00' },
    { id: 4, nome: 'Geografia', sigla: 'GEO', progresso: '00/00' },
    { id: 5, nome: 'Biologia', sigla: 'BIO', progresso: '00/00' },
  ]);

  const [maisNovas] = useState([
    { id: 1, nome: 'Mandarim', sigla: 'MAN', progresso: '00/00' },
    { id: 2, nome: 'Alemão', sigla: 'ALE', progresso: '00/00' },
    { id: 3, nome: 'Mecânica', sigla: 'MEC', progresso: '00/00' },
    { id: 4, nome: 'Anatomia', sigla: 'ANA', progresso: '00/00' },
    { id: 5, nome: 'Biologia', sigla: 'BIO', progresso: '00/00' },
  ]);

  return (
    /* REMOVIDO: Toda a div superior que continha os botões alternadores.
       Agora o conteúdo começa direto no topo com o espaçamento ideal.
    */
    <div className="w-full flex-1 flex flex-col px-12 py-8 space-y-12">
      
      {/* Bloco 1: Coleções mais vistas */}
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-wide mb-8 text-white">
          Coleções mais vistas
        </h2>
        {/* Grid inteligente: os blocos encolhem um pouco se a tela for pequena, evitando vazar */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 w-full">
          {maisVistas.map((item) => (
            <CardMateria key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Bloco 2: Coleções mais novas */}
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-wide mb-8 text-white">
          Coleções mais novas
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 w-full">
          {maisNovas.map((item) => (
            <CardMateria key={item.id} item={item} />
          ))}
        </div>
      </section>

    </div>
  )
}

/* ==========================================
   COMPONENTE AUXILIAR: CARD MATÉRIA
   ========================================== */
function CardMateria({ item }) {
  return (
    <div className="w-full aspect-[3/4] bg-neutral-800/40 rounded-2xl p-4 flex flex-col justify-between items-center text-center border border-neutral-800 hover:border-neutral-700/50 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group">
      <span className="text-xs font-semibold tracking-wide text-gray-300 truncate w-full px-1 mt-2">
        {item.nome}
      </span>
      <span className="text-4xl font-black text-neutral-700/70 tracking-widest select-none group-hover:text-neutral-600 transition-colors">
        {item.sigla}
      </span>
      <span className="text-sm font-medium tracking-wide text-gray-200 mb-2">
        {item.progresso}
      </span>
    </div>
  );
}