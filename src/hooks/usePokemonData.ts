// File: src/hooks/usePokemonData.ts
import { useDebounce } from 'use-debounce';
import {
    useGetAllTypesQuery,
    useGetPokemonByNameQuery,
    useGetPokemonByTypeQuery,
    useGetPokemonListQuery,
} from '../features/pokemonAPI';

export function usePokemonData(search: string, typeFilter: string, page: number, pageSize: number) {
    const offset = page * pageSize;
    const [debouncedSearch] = useDebounce(search, 1500);

    const searchedPokemonQuery = useGetPokemonByNameQuery(debouncedSearch.toLowerCase(), {
        skip: debouncedSearch === '' || !!typeFilter,
    });

    const typeFilteredQuery = useGetPokemonByTypeQuery(typeFilter, {
        skip: !typeFilter,
    });

    const pokemonListQuery = useGetPokemonListQuery({ limit: pageSize, offset }, {
        skip: debouncedSearch !== '' || !!typeFilter,
    });

    const { data: typeOptions = [] } = useGetAllTypesQuery();

    let displayedRows: any[] = [];
    let totalCount = 0;

    if (typeFilter && typeFilteredQuery.data) {
        const filteredBySearch = typeFilteredQuery.data.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        totalCount = filteredBySearch.length;
        displayedRows = filteredBySearch.slice(
            page * pageSize,
            (page + 1) * pageSize
        );

    } else if (debouncedSearch && searchedPokemonQuery.data) {
        displayedRows = [searchedPokemonQuery.data];
        totalCount = 1;

    } else if (pokemonListQuery.data) {
        displayedRows = pokemonListQuery.data.results;
        totalCount = pokemonListQuery.data.count;
    }

    return {
        debouncedSearch,
        isPending: pokemonListQuery.isFetching || searchedPokemonQuery.isFetching,
        isSearchError: searchedPokemonQuery.isError,
        displayedRows,
        totalCount,
        typeOptions,
    };
}