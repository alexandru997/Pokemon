import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { usePokemonData } from '../hooks/usePokemonData';
import { PokemonFilters } from './PokemonFilters';
import { usePokemonColumns } from '../utils/columns';

const PokemonTable: React.FC = () => {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const {
        debouncedSearch,
        isPending,
        isSearchError,
        displayedRows,
        totalCount,
        typeOptions,
    } = usePokemonData(search, typeFilter, page, pageSize);

    const columns = usePokemonColumns();

    const handlePageChange = (model: { page: number; pageSize: number }) => {
        setPage(model.page);
        setPageSize(model.pageSize);
    };

    return (
        <Box>
            <PokemonFilters
                search={search}
                onSearchChange={setSearch}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                typeOptions={typeOptions}
            />

            {isPending && (
                <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
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
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={handlePageChange}
                    pageSizeOptions={[10, 15, 20]}
                    rowCount={totalCount}
                    pagination
                    paginationMode="server"
                    loading={isPending}
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
    );
};

export default PokemonTable;