import { Request, Response } from 'express';
import { listPokemons, createPokemon } from '../controllers/pokemon';
import { Pokemon } from '../models/models';

jest.mock('../models/models', () => {
  const mockPokemon = {
    findAll: jest.fn() as any,
    create: jest.fn() as any,
  };

  return {
    Pokemon: mockPokemon,
  };
});

describe('listPokemons', () => {
  it('should return a list of pokemons', async () => {
    const mockPokemons = [{ pokemon_id: 1 }, { pokemon_id: 2 }];
    (Pokemon.findAll as jest.Mock).mockImplementation(() => Promise.resolve(mockPokemons));

    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await listPokemons(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPokemons);
  });

it('should handle errors and return 500 status', async () => {
    const mockError = new Error('Internal Server Error');
    (Pokemon.findAll as jest.Mock).mockRejectedValue(mockError);

    const mockRequest = {} as Request;
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    await listPokemons(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
});

describe('createPokemon', () => {
  it('should create a new pokemon and return it', async () => {
    const mockPokemon = { pokemon_id: 1 };
    (Pokemon.create as any).mockResolvedValue(mockPokemon);

    const mockRequest = {
        body: { id: 1 },
    } as Request;
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    await createPokemon(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPokemon);
  });

  it('should handle errors and return 500 status', async () => {
    const mockError = new Error('Internal Server Error');
    (Pokemon.create as any).mockRejectedValue(mockError);

    const mockRequest = {
        body: { id: 1 },
    } as Request;
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    await createPokemon(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
});
