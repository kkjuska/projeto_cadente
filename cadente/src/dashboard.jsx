import { useState } from 'react'

export default function Dashboard() {
  const [suasColecoes] = useState([
    { id: 1, nome: 'Matematica', sigla: 'MAT', progresso: '00/00' },
    { id: 2, nome: 'Fisica', sigla: 'FIS', progresso: '00/00' },
    { id: 3, nome: 'Geografia', sigla: 'GEO', progresso: '00/00' },
    { id: 4, nome: 'Biologia', sigla: 'BIO', progresso: '00/00' },
  ]);

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-semibold tracking-wide mb-8">Coleções</h2>
      <div className="grid grid-cols-5 gap-6 w-full">
        <div className="w-full aspect-[3/4] bg-neutral-800/30 hover:bg-neutral-800/50 border border-dashed border-neutral-700/60 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group">
          <span className="text-6xl text-neutral-600 group-hover:text-neutral-400 transition-colors duration-200 font-light">+</span>
        </div>
        {suasColecoes.map((item) => (
          <CardMateria key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function CardMateria({ item }) {
  return (
    <div className="w-full aspect-[3/4] bg-neutral-800/40 rounded-2xl p-6 flex flex-col justify-between items-center text-center border border-neutral-800 hover:border-neutral-700/50 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1">
      <span className="text-sm font-semibold tracking-wide text-gray-300 truncate w-full px-1">{item.nome}</span>
      <span className="text-4xl font-black text-neutral-700/70 tracking-widest select-none">{item.sigla}</span>
      <span className="text-sm font-medium tracking-wide text-gray-400">{item.progresso}</span>
    </div>
  )
}