import 'dotenv/config' // 1º: Carrega as variáveis de ambiente do .env
import express from 'express' // 2º: Importa o Express
import cors from 'cors' // 3º: Importa o CORS
import { pool } from './config/db.js' // 4º: Importa a conexão com o Postgres
import { flashcardsRoute } from './routes/flashcards.route.js' // 5º: Suas rotas antigas

// INICIALIZAÇÃO OBRIGATÓRIA (Deve vir antes de qualquer rota 'app.use', 'app.get' ou 'app.post')
const app = express()
const PORT = process.env.PORT || 3000

// Middlewares obrigatórios
app.use(cors()) 
app.use(express.json()) 

// Rota de teste básica
app.get("/", (req, res) => {
    return res.json({ mensagem: "API da Cadente rodando com sucesso!" })
})

// ==========================================
// ROTA: REGISTRAR/SALVAR NO BANCO (COM SENHA)
// ==========================================
app.post("/auth/cadastro", async (req, res) => {
    try {
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios (nome, email e senha)' })
        }

        const checkEmail = await pool.query("SELECT * FROM usuario WHERE email = $1", [email])
        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ erro: 'Este e-mail já está cadastrado' })
        }

        const query = `
            INSERT INTO usuario (nome, email, senha) 
            VALUES ($1, $2, $3) 
            RETURNING id, nome, email;
        `
        const resultado = await pool.query(query, [nome, email, senha])

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: resultado.rows[0]
        })
    } catch (error) {
        console.error("Erro no cadastro:", error)
        return res.status(500).json({ erro: 'Erro interno ao salvar usuário' })
    }
})

// ==========================================
// ROTA: LOGAR/VERIFICAR NO BANCO (COM SENHA)
// ==========================================
app.post("/auth/login", async (req, res) => {
    try {
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Preencha o nome, e-mail e senha' })
        }

        // Busca combinando Email, Nome (case-insensitive) E a Senha exata
        const query = `
            SELECT id, nome, email FROM usuario 
            WHERE email = $1 AND LOWER(nome) = LOWER($2) AND senha = $3;
        `
        const resultado = await pool.query(query, [email, nome, senha])

        if (resultado.rows.length === 0) {
            return res.status(401).json({ erro: 'Credenciais inválidas. Verifique os dados digitados.' })
        }

        return res.status(200).json({
            mensagem: "Login bem-sucedido!",
            usuario: resultado.rows[0]
        })
    } catch (error) {
        console.error("Erro no login:", error)
        return res.status(500).json({ erro: 'Erro interno ao realizar login' })
    }
})

// ==========================================
// ROTA: ATUALIZAR DADOS DO USUÁRIO NO BANCO
// ==========================================
app.put("/auth/atualizar", async (req, res) => {
    try {
        const { id, nome, email } = req.body

        if (!id || !nome || !email) {
            return res.status(400).json({ erro: 'ID, Nome e E-mail são obrigatórios para atualizar.' })
        }

        const checkEmail = await pool.query("SELECT * FROM usuario WHERE email = $1 AND id <> $2", [email, id])
        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ erro: 'Este e-mail já está sendo usado por outra conta.' })
        }

        const query = `
            UPDATE usuario 
            SET nome = $1, email = $2 
            WHERE id = $3
            RETURNING id, nome, email;
        `
        const resultado = await pool.query(query, [nome, email, id])

        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' })
        }

        return res.status(200).json({
            mensagem: "Perfil updated com sucesso!",
            usuario: resultado.rows[0]
        })
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error)
        return res.status(500).json({ erro: 'Erro interno ao atualizar perfil.' })
    }
})

// ========================================================
// ROTA: BUSCA MATÉRIAS DIRETO DA TABELA FLASHCARDS (DASHBOARD)
// ========================================================
app.get("/colecoes-flashcards", async (req, res) => {
    try {
        // Seleciona as matérias distintas (sem repetir) criadas na tabela flashcards
        const query = `
            SELECT DISTINCT nome AS materia 
            FROM flashcards 
            ORDER BY materia ASC;
        `;
        const resultado = await pool.query(query);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar flashcards do banco:", error);
        return res.status(500).json({ erro: 'Erro interno ao carregar matérias.' });
    }
});

// ========================================================
// ROTA MOVIDA PARA CÁ: BUSCAR INFORMAÇÕES DE UM FLASHCARD ESPECÍFICO
// ========================================================
app.get("/flashcards/materia", async (req, res) => {
    try {
        const { nome } = req.query; // Pega o nome vindo na URL ex: ?nome=Citologia

        const query = `
            SELECT nome AS materia, pergunta, resposta 
            FROM flashcards 
            WHERE nome = $1
            LIMIT 1;
        `;
        const resultado = await pool.query(query, [nome]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Flashcard não encontrado.' });
        }

        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error("Erro ao buscar dados do flashcard:", error);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

// Vincula a sua rota de flashcards antiga (se houver)
app.use("/flashcards", flashcardsRoute)

// Liga o servidor (DEVE SER SEMPRE A ÚLTIMA COISA DO ARQUIVO)
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando perfeitamente em http://localhost:${PORT}`)
})