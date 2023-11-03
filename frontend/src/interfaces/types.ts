interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  pokemon_id: number;
  url: string;
  name: string;
  abilities: Ability[];
  image: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

interface UserState {
  full_name: string;
  username: string;
  email: string;
}

export type { Ability, Pokemon, RouteParams, UserState };
