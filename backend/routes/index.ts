import express from 'express';
import { listPokemons, createPokemon } from '../controllers/pokemon';

const router = express.Router();

router.get("/api/pokemon/list", listPokemons);
router.post("/api/pokemon", createPokemon);

export default router;