import { useState } from 'react'

// Recebe a função enviada pelo App.jsx
export default function Cadastro({ onSucessoCadastro }) {
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
      
      // Executa a função recebida para mandar o usuário direto para o Dashboard (Home)
      onSucessoCadastro();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <>
      <div className="text-center text-xl font-normal mb-6 select-none">Cadastro</div>
      
      <div className="space-y-5 flex-1">
          {/* ... todos os seus inputs continuam exatamente iguais ... */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Nome:</div>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Email:</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Senha:</div>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Confirmar senha:</div>
            <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>

          <div 
            onClick={handleCadastro}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 active:scale-[0.98] cursor-pointer select-none mt-3"
          >
            Confirmar
          </div>
      </div>
    </>
  );
}