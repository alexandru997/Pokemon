import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const usePokemonColumns = (): GridColDef[] => {
    const navigate = useNavigate();
    return [
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
    ];
};