import { useState } from 'react'

// Recebe a função enviada pelo App.jsx e a URL da API enviada pelo Login.jsx
export default function Cadastro({ onSucessoCadastro, apiUrl = 'http://localhost:3000' }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estado para controlar o feedback de salvamento no banco de dados
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    // 1. Validação simples se todos os campos estão preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // 2. Validação se as senhas batem antes de mandar para o banco
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setCarregando(true);

    try {
      // 3. Dispara os dados para a rota do Postgres no Backend
      const response = await fetch(`${apiUrl}/auth/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuário salvo com sucesso no banco:", data);
        alert("Cadastro realizado com sucesso!");
        
        // Redireciona para o Dashboard
        onSucessoCadastro();
      } else {
        // Exibe mensagens do servidor (Ex: "Este e-mail já está cadastrado")
        alert(data.erro || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API de cadastro:", error);
      alert("Não foi possível conectar ao servidor backend.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="text-center text-xl font-normal mb-6 select-none">Cadastro</div>
      
      <div className="space-y-5 flex-1">
          {/* Input Nome */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Nome:</div>
            <input 
              type="text" 
              value={nome} 
              disabled={carregando}
              onChange={(e) => setNome(e.target.value)} 
              className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50" 
            />
          </div>

          {/* Input Email */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Email:</div>
            <input 
              type="email" 
              value={email} 
              disabled={carregando}
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50" 
            />
          </div>

          {/* Input Senha */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Senha:</div>
            <input 
              type="password" 
              value={senha} 
              disabled={carregando}
              onChange={(e) => setSenha(e.target.value)} 
              className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50" 
            />
          </div>

          {/* Input Confirmar Senha */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">Confirmar senha:</div>
            <input 
              type="password" 
              value={confirmarSenha} 
              disabled={carregando}
              onChange={(e) => setConfirmarSenha(e.target.value)} 
              className="bg-transparent border-b border-gray-700 text-white py-1.5 text-sm outline-none focus:border-blue-500 transition-colors duration-300 disabled:opacity-50" 
            />
          </div>

          {/* Botão Confirmar */}
          <div 
            onClick={!carregando ? handleCadastro : null}
            className={`w-full text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 select-none mt-3 ${
              carregando 
                ? 'bg-blue-800 opacity-50 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer active:scale-[0.98]'
            }`}
          >
            {carregando ? 'Salvando...' : 'Confirmar'}
          </div>
      </div>
    </>
  );
}