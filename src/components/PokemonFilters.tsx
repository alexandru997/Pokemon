import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { theme } from '../theme/theme';

interface FiltersProps {
    search: string;
    onSearchChange: (val: string) => void;
    typeFilter: string;
    onTypeChange: (val: string) => void;
    typeOptions: { name: string }[];
}

export const PokemonFilters: React.FC<FiltersProps> = ({
                                                           search,
                                                           onSearchChange,
                                                           typeFilter,
                                                           onTypeChange,
                                                           typeOptions
                                                       }) => {
    return (
        <>
            <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Filter by type</InputLabel>
                <Select
                    value={typeFilter}
                    label="Filter by type"
                    onChange={(e) => {
                        onTypeChange(e.target.value);
                        onSearchChange('');
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
                onChange={(e) => onSearchChange(e.target.value)}
                fullWidth
                sx={{mb: 2}}
                slotProps={{
                    input: {
                        endAdornment: search && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => onSearchChange('')} edge="end">
                                    <ClearIcon sx={{color: theme.palette.primary.main}} fontSize="small"/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
        </>
    );
};