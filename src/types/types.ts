export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    abilities?: string[];
    moves?: string[];
    stats?: {
        name: string;
        value: number;
    }[]
}

export type PokemonListResponse = {
    count: number;
    results: Pokemon[];
}

export type PokemonType = {
    type: {
        name: string;
    };
}

export type PokemonAbility = {
    ability: {
        name: string;
    };
}

export type PokemonStat = {
    stat: {
        name: string;
    };
    base_stat: number;
}

export type PokemonMove = {
    move: {
        name: string;
    };
}

export type PokemonListParams = {
    limit: number;
    offset?: number;
    search?: string;
}

export type PokemonTypeOption = {
    name: string;
    url: string;
}

export type TypeListResponse = {
    count: number;
    results: PokemonTypeOption[];
}
export type PokemonRow = {
    id: number
    name: string
    types: string[]
    sprite: string
}