import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [suasColecoes, setSuasColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    const carregarFlashcardsDoBanco = async () => {
      try {
        // Dispara a requisição para buscar as matérias diretamente da tabela flashcards
        const response = await fetch(`${API_URL}/colecoes-flashcards`);
        const dados = await response.json();

        if (response.ok) {
          // Formata cada linha vinda do Postgres para a estrutura que o card espera
          const colecoesFormatadas = dados.map((item, index) => {
            // Pega as 3 primeiras letras da matéria (Ex: Citologia -> CIT)
            const siglaGerada = item.materia ? item.materia.substring(0, 3).toUpperCase() : 'FLC';
            
            return {
              id: index + 1,
              nome: item.materia,
              sigla: siglaGerada,
              progresso: '00/00' 
            };
          });

          setSuasColecoes(colecoesFormatadas);
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarFlashcardsDoBanco();
  }, []);

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-semibold tracking-wide mb-8">Coleções</h2>
      
      {carregando ? (
        <div className="text-sm text-neutral-500 animate-pulse">Carregando coleções do banco...</div>
      ) : (
        <div className="grid grid-cols-5 gap-6 w-full">
          {/* Botão de Adicionar Nova Coleção */}
          <div className="w-full aspect-[3/4] bg-neutral-800/30 hover:bg-neutral-800/50 border border-dashed border-neutral-700/60 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group">
            <span className="text-6xl text-neutral-600 group-hover:text-neutral-400 transition-colors duration-200 font-light">+</span>
          </div>

          {/* Renderização Dinâmica das Matérias vindas da tabela Flashcards */}
          {suasColecoes.map((item) => (
            <CardMateria key={item.id} item={item} />
          ))}

          {!carregando && suasColecoes.length === 0 && (
            <div className="col-span-4 flex items-center text-sm text-neutral-500 italic pl-2">
              Nenhum flashcard encontrado na tabela do banco de dados.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CardMateria({ item }) {
  const navigate = useNavigate();

  const handleCliqueCard = () => {
    // Passa o nome da matéria escolhida para a rota /flashcard através do state do React Router
    navigate('/flashcard', { state: { materiaSelecionada: item.nome } }); 
  };

  return (
    <div 
      onClick={handleCliqueCard}
      className="w-full aspect-[3/4] bg-neutral-800/40 rounded-2xl p-6 flex flex-col justify-between items-center text-center border border-neutral-800 hover:border-neutral-700/50 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1"
    >
      <span className="text-sm font-semibold tracking-wide text-gray-300 truncate w-full px-1">{item.nome}</span>
      <span className="text-4xl font-black text-neutral-700/70 tracking-widest select-none">{item.sigla}</span>
      <span className="text-sm font-medium tracking-wide text-gray-400">{item.progresso}</span>
    </div>
  )
}