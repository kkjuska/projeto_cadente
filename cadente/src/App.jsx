import { useState } from 'react'

// CORREÇÃO AQUI: Adicionamos { onMudarParaCadastro } dentro dos parênteses da função
export default function Login({ onMudarParaCadastro }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleConfirmar = () => {
    if (nome && email && senha) {
      console.log("Dados enviados:", { nome, email, senha, lembrar });
      alert(`Bem-vindo de volta, ${nome}!`);
    } else {
      alert("Por favor, preencha todos os campos.");
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
          
          {/* Card Azul de Fundo */}
          <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-[-2deg] -translate-x-1/12 translate-y-3 scale-[0.99] z-10"></div>
          
          {/* Card Principal de Login */}
          <div className="relative bg-neutral-800 p-6 sm:p-8 rounded-2xl z-20 shadow-2xl">
            <div className="text-center text-xl font-normal mb-6 select-none">Login</div>
            
            <div className="space-y-5">
                
                {/* Campo Nome */}
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

                {/* Campo Email */}
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

                {/* Checkbox Personalizado */}
                <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setLembrar(!lembrar)}>
                  <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all duration-200 ${lembrar ? 'bg-blue-600 border-blue-600' : 'border-gray-500'}`}>
                    {lembrar && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <div className="text-xs text-gray-400">Lembrar de mim</div>
                </div>

                {/* Campo Senha */}
                <div className="flex flex-col">
                  <div className="text-xs text-gray-400 mb-1">Senha:</div>
                  <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                {/* Esqueceu a senha */}
                <div className="pt-0.5">
                  <div className="text-xs text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer inline-block">
                    Esqueceu a senha?
                  </div>
                </div>

                {/* Botão Confirmar */}
                <div 
                  onClick={handleConfirmar}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 active:scale-[0.98] cursor-pointer select-none mt-3"
                >
                  Confirmar
                </div>
            </div>
          </div>
        </div>

        {/* Link Inferior Corrigido e Funcional */}
        <div className="text-xs">
          <button 
            onClick={onMudarParaCadastro} 
            className="bg-transparent border-none text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer outline-none"
          >
            Não tem conta?
          </button>
        </div>

      </div>
    </div>
  );
}