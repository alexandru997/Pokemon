import PokemonTable from "../components/Datable.tsx";
import { MainImage } from "../assets";
import { Box } from "@mui/material";

const Home = () => {

    return (
        <div>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <PokemonTable/>
                <MainImage/>
            </Box>
        </div>
    )
}

export default Home
