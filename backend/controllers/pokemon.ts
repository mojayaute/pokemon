import { Request, Response } from 'express';
import { Pokemon } from '../models/models';

export const listPokemons = async (req: Request, res: Response): Promise<Response> => {
  try {
    const allPokemons: Pokemon[] = await Pokemon.findAll();
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPokemon = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.body;
  try {
    const pokemon: Pokemon = await Pokemon.create({ pokemon_id: id });
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};