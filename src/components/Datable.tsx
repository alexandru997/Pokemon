import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
    Box,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import ClearIcon from '@mui/icons-material/Clear';
import {
    useGetAllTypesQuery,
    useGetPokemonByNameQuery, useGetPokemonByTypeQuery,
    useGetPokemonListQuery,
} from '../features/pokemonAPI'
import { theme } from "../theme/theme.ts";

export interface PokemonRow {
    id: number
    name: string
    types: string[]
    sprite: string
}

const PokemonTable: React.FC = () => {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('');
    const [debouncedSearch, {isPending}] = useDebounce(search, 1500);
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const offset = page * pageSize
    const navigate = useNavigate()

    const {
        data: pokemonListData,
        isLoading: isListLoading,
    } = useGetPokemonListQuery(
        {limit: pageSize, offset},
        {skip: debouncedSearch !== '' || !!typeFilter}
    )

    const {
        data: searchedPokemon,
        isLoading: isSearchLoading,
        isError: isSearchError,
    } = useGetPokemonByNameQuery(debouncedSearch.toLowerCase(), {
        skip: debouncedSearch === '' || !!typeFilter,
    })

    const {
        data: typeFilteredList = [],
    } = useGetPokemonByTypeQuery(typeFilter, {
        skip: !typeFilter,
    });
    const {data: typeOptions = []} = useGetAllTypesQuery();
    let displayedRows: PokemonRow[] = [];
    let totalCount = 0;

    if (typeFilter) {
        const filteredBySearch = typeFilteredList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        totalCount = filteredBySearch.length;
        displayedRows = filteredBySearch.slice(
            page * pageSize,
            (page + 1) * pageSize
        );
    } else if (debouncedSearch && searchedPokemon) {
        displayedRows = [searchedPokemon];
        totalCount = 1;
    } else {
        displayedRows = pokemonListData?.results || [];
        totalCount = pokemonListData?.count || 0;
    }


    const handlePageChange = (model: { page: number; pageSize: number }) => {
        setPage(model.page)
        setPageSize(model.pageSize)
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            disableColumnMenu: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Typography
                    color="primary"
                    sx={{cursor: 'pointer', textDecoration: 'underline'}}
                    onClick={() => navigate(`/${params.row.name}`)}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'types',
            headerName: 'Type(s)',
            width: 200,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const types = params.value;
                if (Array.isArray(types)) {
                    return types
                        .map((t) =>
                            typeof t === 'string'
                                ? t.charAt(0).toUpperCase() + t.slice(1)
                                : t?.type?.name?.charAt(0).toUpperCase() + t?.type?.name?.slice(1)
                        )
                        .join(', ');
                }

                return '—';
            },
        },

        {
            field: 'sprite',
            headerName: 'Sprite',
            width: 100,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.name}
                    width={50}
                    height={50}
                    style={{imageRendering: 'pixelated'}}
                />
            ),
        },
    ]
    return (
        <Box>
            <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Filter by type</InputLabel>
                <Select
                    value={typeFilter}
                    label="Filter by type"
                    onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setSearch('');
                    }}
                >
                    <MenuItem value="">All</MenuItem>
                    {typeOptions.map((type) => (
                        <MenuItem key={type.name} value={type.name}>
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Search by name"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{mb: 2}}
                slotProps={{
                    input: {
                        endAdornment: search ? (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearch('')} edge="end">
                                    <ClearIcon sx={{color: theme.palette.primary.main}} fontSize="small"/>
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    },
                }}
            />
            {isPending() && (
                <Typography variant="body2" sx={{color: 'gray', mb: 1}}>
                    Searching...
                </Typography>
            )}

            {debouncedSearch && isSearchError ? (
                <Typography color="error">
                    No Pokémon found with the name "{debouncedSearch}"
                </Typography>
            ) : (
                <DataGrid
                    rows={displayedRows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                    paginationModel={{page, pageSize}}
                    onPaginationModelChange={handlePageChange}
                    pageSizeOptions={[10, 15, 20]}
                    rowCount={totalCount}
                    pagination
                    paginationMode='server'
                    loading={isListLoading || isSearchLoading || isPending()}
                    sx={{
                        color: '#fff',
                        '& .MuiSvgIcon-root': {
                            color: '#fff',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: 'transparent',
                        },
                    }}
                />
            )}
        </Box>
    )
}

export default PokemonTable
