import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    Pokemon,
    PokemonAbility,
    PokemonListParams,
    PokemonListResponse, PokemonMove,
    PokemonStat,
    PokemonType, PokemonTypeOption, TypeListResponse
} from "../types/types.ts";



export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
    endpoints: (builder) => ({
        getPokemonList: builder.query<PokemonListResponse, PokemonListParams>({
            query: ({limit, offset = 0}) => `pokemon?limit=${limit}&offset=${offset}`,
            async transformResponse(baseResponse: {
                count: number;
                results: { name: string; url: string }[];
            }): Promise<PokemonListResponse> {
                const detailed: Pokemon[] = await Promise.all(
                    baseResponse.results.map(async (pokemon): Promise<Pokemon> => {
                        const res = await fetch(pokemon.url);
                        const data = await res.json();
                        return {
                            id: data.id,
                            name: data.name,
                            types: data.types.map((t: { type: { name: string } }) => t.type.name),
                            sprite: data.sprites.front_default,
                        };
                    })
                );

                return {
                    count: baseResponse.count,
                    results: detailed,
                };
            },
        }),

        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
            async transformResponse(response: {
                id: number;
                name: string;
                sprites: { front_default: string };
                types: PokemonType[];
                abilities: PokemonAbility[];
                stats: PokemonStat[];
                moves: PokemonMove[];
            }) {

                return {
                    id: response.id,
                    name: response.name,
                    sprite: response.sprites.front_default,
                    types: response.types.map((type) => type.type.name),
                    abilities: response.abilities.map((ability) => ability.ability.name),
                    stats: response.stats.map((stat) => ({
                        name: stat.stat.name,
                        value: stat.base_stat,
                    })),
                    moves: response.moves.slice(0, 10).map((move) => move.move.name),
                };
            },
        }),
        getPokemonByType: builder.query<Pokemon[], string>({
            query: (typeName) => `type/${typeName}`,
            transformResponse: (
                response: {
                    pokemon: { pokemon: { name: string; url: string } }[];
                },
                _meta,
                typeName
            ): Pokemon[] => {
                return response.pokemon.map(({pokemon}) => {
                    const urlParts = pokemon.url.split('/').filter(Boolean);
                    const id = Number(urlParts[urlParts.length - 1]);

                    return {
                        id,
                        name: pokemon.name,
                        types: [typeName],
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                });
            },
        }),

        getAllTypes: builder.query<PokemonTypeOption[], void>({
            query: () => 'type',
            transformResponse: (response: TypeListResponse) => response.results,
        }),

    }),
})

export const {
    useGetPokemonListQuery,
    useGetPokemonByNameQuery,
    useGetPokemonByTypeQuery,
    useGetAllTypesQuery
} = pokemonApi
