import { Avatar, Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material';
import { useGetPokemonByNameQuery } from '../features/pokemonAPI';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const {name} = useParams();
    const {data, isLoading, error} = useGetPokemonByNameQuery(name!);
    const theme = useTheme()
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading Pokémon details</div>;

    return (
        <Box>
            <Card sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                gap: 4,
                borderRadius: "15px",
                padding: 2,
                boxShadow: '0px 8px 24px rgba(0,0,0,0.3)'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CardContent
                        sx={{
                            width: 200,
                            height: 200,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <Avatar
                            alt="Pokemon"
                            src={data?.sprite}
                            variant="circular"
                            sx={{
                                width: 140,
                                height: 140,
                            }}
                        />
                    </CardContent>
                    <Typography variant="h4">
                        {data?.name
                            ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
                            : ''}
                    </Typography>
                    <Box sx={{mb: 2}}>
                        {data?.types.map((type: string) => (
                            <Chip
                                key={type}
                                label={type.charAt(0).toUpperCase() + type.slice(1)}
                                sx={{
                                    m: 0.5,
                                    color: theme.palette.background.default,
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
                <Box>
                    <CardContent>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                                Abilities:
                            </Typography>
                            {data?.abilities?.map((ability: string) => (
                                <Chip
                                    key={ability}
                                    label={ability.charAt(0).toUpperCase() + ability.slice(1)}
                                    color="secondary"
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main,
                                        color: theme.palette.background.default,
                                        fontWeight: 600,
                                        fontSize: '16px',

                                    }}
                                />
                            ))}
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h6" sx={{fontWeight: 'bold', marginBottom: 1}}>Stats</Typography>
                        <Grid container spacing={2} sx={{justifyContent: 'start'}}>

                            {data?.stats?.map((stat: { name: string; value: number }) => (
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        padding: 1,
                                        width: 100,
                                        height: 100,
                                        boxShadow: '0px 8px 24px rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        borderRadius: "15px"
                                    }}
                                >
                                    <Typography variant="body2" color="textSecondary">
                                        {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}
                                    </Typography>

                                    <Typography variant="h5">
                                        {stat.value}
                                    </Typography>
                                </Card>
                            ))}
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                                Moves:
                            </Typography>
                            {data?.moves?.map((move: string) => (
                                <Chip
                                    key={move}
                                    label={move.charAt(0).toUpperCase() + move.slice(1)}
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main,
                                        color: theme.palette.background.default,
                                        fontWeight: 600,
                                        fontSize: '16px',
                                    }}
                                />
                            ))}
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default Detail;
