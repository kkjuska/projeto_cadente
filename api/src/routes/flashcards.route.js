import { Router } from 'express'
import { flashcardsService } from '../services/flashcards.service.js'

export const flashcardsRoute = Router()

// GET: Listar todos
flashcardsRoute.get("/", async (req, res) => {
    try {
        const flashcards = await flashcardsService.getAll()
        res.json(flashcards)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar flashcards' })
    }
})

// GET por ID (Deve passar o UUID na URL)
flashcardsRoute.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const flashcard = await flashcardsService.getById(id)
        
        if (!flashcard) {
            return res.status(404).json({ erro: 'Flashcard não encontrado' })
        }
        res.json(flashcard)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar o flashcard' })
    }
})          

// POST: Criar novo
flashcardsRoute.post("/", async (req, res) => {
    try {
        const { nome, pergunta, resposta } = req.body
        
        if (!nome || !pergunta || !resposta) {
            return res.status(400).json({ erro: 'Campos nome, pergunta e resposta são obrigatórios' })
        }

        const newFlashcard = await flashcardsService.create(nome, pergunta, resposta)
        res.status(201).json(newFlashcard)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar flashcard' })
    }
})

// PUT: Atualizar completo
flashcardsRoute.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { nome, pergunta, resposta } = req.body
        
        const updatedFlashcard = await flashcardsService.update(id, nome, pergunta, resposta)
        
        if (!updatedFlashcard) {
            return res.status(404).json({ erro: 'Flashcard não encontrado para atualizar' })
        }
        res.json(updatedFlashcard)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar flashcard' })
    }
})

// DELETE: Remover registro
flashcardsRoute.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await flashcardsService.delete(id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar flashcard' })
    }
})

// ROTA RELACIONAL: Buscar flashcards de uma coleção específica
flashcardsRoute.get("/colecao/:colecaoId", async (req, res) => {
    try {
        const { colecaoId } = req.params
        const itens = await flashcardsService.getByColecao(colecaoId)
        res.json(itens)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar flashcards desta coleção' })
    }
})