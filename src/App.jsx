import React, { useState } from "react";
import {
  ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, extendTheme, HStack, Button
} from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import LogClimbForm from "./components/LogClimbForm";
import DrillLibrary from "./components/DrillLibrary";
import WarmUp from "./components/WarmUp";
import CoolDown from "./components/CoolDown";
import WeeklyRoutine from "./components/WeeklyRoutine";
import Goals from "./components/Goals";
import ChatBot from "./components/ChatBot"; // <--- AI bot import

// Define your palettes
const colorPalettes = {
  leafy: {
    name: "Leafy",
    colors: {
      50:  "#e9f8f1",
      100: "#c8efdb",
      200: "#a5e4c3",
      300: "#79d9a6",
      400: "#4fc582",
      500: "#249a5b",
      600: "#1a804a",
      700: "#17653d",
      800: "#154f33",
      900: "#123c26"
    }
  },
  ocean: {
    name: "Ocean",
    colors: {
      50:  "#e3f8ff",
      100: "#bbeeff",
      200: "#8fd4f9",
      300: "#53b2e9",
      400: "#2196f3",
      500: "#1976d2",
      600: "#1565c0",
      700: "#0d47a1",
      800: "#08306b",
      900: "#021b38"
    }
  },
  sunset: {
    name: "Sunset",
    colors: {
      50:  "#fff8e1",
      100: "#ffecb3",
      200: "#ffd180",
      300: "#ffab40",
      400: "#ff9100",
      500: "#ff6d00",
      600: "#f4511e",
      700: "#d84315",
      800: "#bf360c",
      900: "#8d2501"
    }
  }
};

function App() {
  const [palette, setPalette] = useState("leafy");

  const theme = extendTheme({
    fonts: {
      heading: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      body: "'Inter', 'Segoe UI', Arial, sans-serif",
    },
    colors: {
      [palette]: colorPalettes[palette].colors
    },
    styles: {
      global: {
        body: {
          color: "black"
        }
      }
    }
  });

  const colorScheme = palette;

  const tabLabels = [
    "Dashboard",
    "Log a Climb",
    "Drill Library",
    "Warm Up",
    "Cool Down",
    "Weekly Routine",
    "Goals",
    "A.I Coach" // Added bot tab
  ];

  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        w="100vw"
        bgGradient={`linear(to-tr, ${palette}.800 0%, ${palette}.600 100%)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 2, md: 8 }}
        overflowX="auto"
      >
        <Box
          w="100%"
          maxW="1100px"
          minH="80vh"
          p={{ base: 6, md: 10 }}
          bg="whiteAlpha.95"
          borderRadius="2xl"
          boxShadow="2xl"
          backdropFilter="blur(5px)"
          overflowY="auto"
        >
          {/* Color Theme Picker */}
          <HStack spacing={4} justify="center" mb={4}>
            {Object.keys(colorPalettes).map((key) => (
              <Button
                key={key}
                colorScheme={key}
                variant={key === palette ? "solid" : "outline"}
                borderRadius="full"
                size="sm"
                onClick={() => setPalette(key)}
                fontWeight="bold"
              >
                {colorPalettes[key].name}
              </Button>
            ))}
          </HStack>

          <Heading
            mb={8}
            fontWeight="extrabold"
            fontSize={{ base: "2xl", md: "3xl" }}
            letterSpacing="tight"
            color="black"
            textAlign="center"
          >
            BetaBoost 🧗‍♂️
          </Heading>

          <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme={colorScheme}
            size="lg"
            orientation="horizontal"
          >
            <TabList mb="1.5em" flexWrap="wrap">
              {tabLabels.map((label) => (
                <Tab
                  key={label}
                  fontWeight="bold"
                  color="black"
                  _selected={{
                    color: "black",
                    bg: `${colorScheme}.100`,
                  }}
                  _focus={{
                    boxShadow: `0 0 0 2px ${colorScheme}.400`,
                  }}
                >
                  {label}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel><Dashboard /></TabPanel>
              <TabPanel><LogClimbForm /></TabPanel>
              <TabPanel><DrillLibrary /></TabPanel>
              <TabPanel><WarmUp /></TabPanel>
              <TabPanel><CoolDown /></TabPanel>
              <TabPanel><WeeklyRoutine /></TabPanel>
              <TabPanel><Goals /></TabPanel>
              <TabPanel><ChatBot /></TabPanel> {/* AI bot tab content */}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
