import { useState } from 'react'
import './App.css'

export default function Cadastro() {
  // Estados para gerenciar os inputs da tela de cadastro
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (nome && email && senha && confirmarSenha) {
      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }
      console.log("Cadastro enviado:", { nome, email, senha });
      alert(`Conta criada com sucesso para ${nome}!`);
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="bg-neutral-900 text-white flex justify-center items-center min-h-screen w-screen overflow-x-hidden m-0 p-0">
      <div className="w-full max-w-[450px] p-5 flex flex-col items-center">
        
        {/* Logo / Título */}
        <div className="text-3xl font-semibold mb-8 flex items-center gap-1.5 select-none">
          Cadente 
          <span className="text-blue-600 inline-block transform rotate-[15deg]">✦</span>
        </div>

        {/* Wrapper do Card com Efeito Inclinado */}
        <div className="relative w-full mb-8">
          
          {/* Card Azul de Fundo (Rotacionado) */}
          <div className="absolute inset-0 bg-blue-600 rounded-2xl transform -rotate-[4deg] scale-[0.98] z-10"></div>
          
          {/* Card Principal de Cadastro */}
          <div className="relative bg-neutral-800 p-10 rounded-2xl z-20 shadow-2xl">
            <div className="text-center text-2xl font-normal mb-8 select-none">Cadastro</div>
            
            {/* Form Simulado com Divs */}
            <div className="space-y-6">
                
                {/* Campo Nome */}
                <div className="flex flex-col">
                  <div className="text-sm text-gray-400 mb-1">Nome:</div>
                  <input 
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    autoComplete="off" 
                    className="bg-transparent border-b border-gray-700 text-white py-2 text-base outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                {/* Campo Email */}
                <div className="flex flex-col">
                  <div className="text-sm text-gray-400 mb-1">Email:</div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off" 
                    className="bg-transparent border-b border-gray-700 text-white py-2 text-base outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                {/* Campo Senha */}
                <div className="flex flex-col">
                  <div className="text-sm text-gray-400 mb-1">Senha:</div>
                  <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="bg-transparent border-b border-gray-700 text-white py-2 text-base outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                {/* Campo Confirmar Senha */}
                <div className="flex flex-col">
                  <div className="text-sm text-gray-400 mb-1">Confirmar senha:</div>
                  <input 
                    type="password" 
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="bg-transparent border-b border-gray-700 text-white py-2 text-base outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                {/* Botão Confirmar Feito com Div */}
                <div 
                  onClick={handleCadastro}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold text-center transition-all duration-200 active:scale-[0.98] cursor-pointer select-none"
                >
                  Confirmar
                </div>
            </div>
          </div>
        </div>

        {/* Link Inferior */}
        <div className="text-sm">
          <div className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
            Já tem conta?
          </div>
        </div>

      </div>
    </div>
  );
}