import { pool } from "../config/db.js"

class FlashcardsService {
    // Buscar todos os flashcards
    async getAll() {
        try {
            const query = "SELECT * FROM flashcards ORDER BY nome;"
            const res = await pool.query(query)
            return res.rows
        } catch (error) {
            console.error("Erro no getAll:", error)
            throw error
        }
    }

    // Buscar flashcard por UUID
    async getById(id) {
        try {
            const query = "SELECT * FROM flashcards WHERE id = $1;"
            const res = await pool.query(query, [id])
            return res.rows[0]
        } catch (error) {
            console.error("Erro no getById:", error)
            throw error
        }
    }

    // Criar novo flashcard (UUID gerado automaticamente no banco)
    async create(nome, pergunta, resposta) {
        try {
            const query = `
                INSERT INTO flashcards (nome, pergunta, resposta) 
                VALUES ($1, $2, $3) 
                RETURNING *;
            `
            const res = await pool.query(query, [nome, pergunta, resposta])
            return res.rows[0]
        } catch (error) {
            console.error("Erro no create:", error)
            throw error
        }
    }

    // Atualizar dados do flashcard (PUT completo)
    async update(id, nome, pergunta, resposta) {
        try {
            const query = `
                UPDATE flashcards 
                SET nome = $1, pergunta = $2, resposta = $3 
                WHERE id = $4 
                RETURNING *;
            `
            const res = await pool.query(query, [nome, pergunta, resposta, id])
            return res.rows[0]
        } catch (error) {
            console.error("Erro no update:", error)
            throw error
        }
    }

    // Deletar flashcard por UUID
    async delete(id) {
        try {
            const query = "DELETE FROM flashcards WHERE id = $1;"
            await pool.query(query, [id])
            return true
        } catch (error) {
            console.error("Erro no delete:", error)
            throw error
        }
    }

    // BÔNUS: Buscar flashcards que pertencem a uma coleção específica
    async getByColecao(colecaoId) {
        try {
            const query = `
                SELECT 
                    c.nome AS nome_colecao,
                    f.id AS flashcard_id,
                    f.nome,
                    f.pergunta,
                    f.resposta
                FROM colecoes_flashcards cf
                JOIN colecoes c ON cf.id_colecao = c.id
                JOIN flashcards f ON cf.id_flashcard = f.id
                WHERE c.id = $1;
            `
            const res = await pool.query(query, [colecaoId])
            return res.rows
        } catch (error) {
            console.error("Erro ao buscar flashcards da coleção:", error)
            throw error
        }
    }
}

export const flashcardsService = new FlashcardsService()