import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonState {
    selectedPokemonId: number | null
}

const initialState: PokemonState = {
    selectedPokemonId: null,
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSelectedPokemon(state, action: PayloadAction<number>) {
            state.selectedPokemonId = action.payload
        },
        clearSelectedPokemon(state) {
            state.selectedPokemonId = null
        },
    },
})

export const { setSelectedPokemon, clearSelectedPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer
