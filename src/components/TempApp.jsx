import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import DrillLibrary from "./components/DrillLibrary";

function App() {
    return (
        <ChakraProvider>
            <Box p={6} maxW="900px" mx="auto">
                <DrillLibrary />
            </Box>
        </ChakraProvider>
    );
}

export default App;
