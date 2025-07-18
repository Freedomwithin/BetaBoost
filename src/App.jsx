import ChatBot from "./components/ChatBot";
import React, { useState } from "react";
import {
  ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel,
  extendTheme, HStack, Button, Text, Flex, Badge, Input, VStack, List, ListItem,
  Divider, IconButton
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import LogClimbForm from "./components/LogClimbForm";
import ProgressTab from "./components/ProgressTab";

// Mock Data
const user = {
  name: "Alex",
  streak: 9,
  level: "Projector",
  completedDrills: 22,
  loggedSessions: 54,
  squads: ["Momentum Crew", "Send Squad"],
};

const leaderboard = [
  { name: "Alex", streak: 9, badge: "Projector" },
  { name: "Sam", streak: 6, badge: "Sendmaster" },
  { name: "Kim", streak: 5, badge: "Tech Guru" }
];

const drillLibrary = [
  { name: "Silent Feet", description: "Climb quietly for precise footwork.", tags: ["technique"] },
  { name: "Downclimbing", description: "Climb down to improve balance.", tags: ["endurance", "technique"] },
  { name: "Double Dyno", description: "Explosive jumping for power.", tags: ["power"] },
  { name: "Backstep Drill", description: "Hip positioning for efficient movement.", tags: ["technique"] },
  { name: "Pause and Hold", description: "Pause 3s each move. Control!", tags: ["endurance", "mental"] },
  { name: "Eliminate Holds", description: "Tape out a hold for creativity.", tags: ["mental", "technique"] },
  { name: "4x4 Endurance", description: "Climb 4 problems, 4 times.", tags: ["endurance"] },
  { name: "Slab Flow", description: "Link slab climbs for mobility.", tags: ["mobility"] },
];

const colorPalettes = {
  leafy: {
    name: "Leafy",
    colors: { 800: "#154f33", 600: "#1a804a", 100: "#c8efdb", 400: "#4fc582" }
  },
  ocean: {
    name: "Ocean",
    colors: { 800: "#08306b", 600: "#1565c0", 100: "#bbeeff", 400: "#2196f3" }
  },
  sunset: {
    name: "Sunset",
    colors: { 800: "#bf360c", 600: "#f4511e", 100: "#ffecb3", 400: "#ff9100" }
  }
};

const colorWave = keyframes`
  0% {background-position: 0% 50%;text-shadow: 2px 4px 16px #122;}
  50% {background-position: 100% 50%;text-shadow: 0 0 22px #24c6dc77;}
  100% {background-position: 0% 50%;text-shadow: 2px 4px 16px #122;}
`;

function App() {
  const [palette, setPalette] = useState("leafy");
  const [drillSearch, setDrillSearch] = useState("");
  const [drillRoutine, setDrillRoutine] = useState([]);
  // ----- NEW STATE FOR CLIMB LOGS -----
  const [climbLogs, setClimbLogs] = useState([]);
  // -------------------------------------

  const theme = extendTheme({
    fonts: {
      heading: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      body: "'Inter', 'Segoe UI', Arial, sans-serif",
    },
    colors: { [palette]: colorPalettes[palette].colors },
    styles: { global: { body: { color: "black" } } }
  });

  const displayDrills = drillLibrary.filter(
    drill =>
      drill.name.toLowerCase().includes(drillSearch.toLowerCase()) ||
      drill.tags.some(tag => tag.includes(drillSearch.toLowerCase()))
  );

  // ---- Handler for logging climbs ----
  function handleLogClimb(log) {
    setClimbLogs(prev => [log, ...prev]);
  }
  // -----------------------------------

  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        w="100vw"
        bgImage="url('/indoor-climbing.PNG')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
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
          overflowY="auto"
        >
          <Flex align="center" justify="space-between" mb={1}>
            <HStack spacing={2}>
              {Object.keys(colorPalettes).map(key => (
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
            <Box>
              <Text fontSize="sm" color="gray.700">
                <b>{user.name}</b> | Streak: <b>{user.streak} days</b> | Level: {user.level}
              </Text>
            </Box>
          </Flex>
          <Heading
            mb={8}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign="center"
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "2.2rem", sm: "2.8rem", md: "3.7rem", lg: "4.1rem" }}
            bgGradient="linear(105deg, #ff512f 0%, #dd2476 40%, #24c6dc 80%, #514a9d 100%, #ff512f 130%)"
            bgClip="text"
            sx={{
              backgroundSize: "200% 200%",
              animation: `${colorWave} 3.6s ease-in-out infinite`,
            }}
          >
            BetaBoost
          </Heading>
          <Tabs isFitted variant="soft-rounded" colorScheme={palette} size="lg" orientation="horizontal">
            <TabList mb="1.5em" flexWrap="wrap">
              <Tab>Dashboard</Tab>
              <Tab>Drill Library</Tab>
              <Tab>Training Plans</Tab>
              <Tab>Progress</Tab>
              <Tab>Community</Tab>
              <Tab>AI Coach</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading size="md" color="black" mb={2}>Welcome, {user.name}!</Heading>
                <Text mb={2}>Last session: V5 limit, 40 minutes. Keep up your streak!</Text>
                <Flex align="center" gap={4} mb={4} mt={2}>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{user.completedDrills}</Text>
                    <Text fontSize="sm" color="gray.600">Drills Completed</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{user.loggedSessions}</Text>
                    <Text fontSize="sm" color="gray.600">Sessions Logged</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{user.streak}</Text>
                    <Text fontSize="sm" color="gray.600">Day Streak</Text>
                  </Box>
                </Flex>
                <Divider mb={4} />
                <Text mb={2}>Personalized tip: <i>Schedule a session focused on your biggest weakness for the fastest progress!</i></Text>
              </TabPanel>

              <TabPanel>
                <Heading size="md" mb={2} color="black">Drill Library</Heading>
                <Input
                  placeholder="Search by drill or tag"
                  value={drillSearch}
                  onChange={e => setDrillSearch(e.target.value)}
                  mb={3}
                  bg="white"
                />
                <List spacing={2}>
                  {displayDrills.map((drill, idx) => (
                    <ListItem
                      key={idx}
                      borderLeft="4px solid teal"
                      pl={3}
                      mb={2}
                      bg="whiteAlpha.900"
                      borderRadius="lg"
                      transition="all 0.2s"
                      _hover={{ bg: "teal.50" }}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Text fontWeight="bold" color="black">{drill.name}</Text>
                        <Text fontSize="sm" color="gray.700">{drill.description}</Text>
                        <HStack spacing={1} mt={1}>
                          {drill.tags.map((tag, t) => (
                            <Badge key={t} colorScheme="teal" fontSize="0.8em">{tag}</Badge>
                          ))}
                        </HStack>
                      </Box>
                      <IconButton
                        size="sm"
                        aria-label="Add to routine"
                        icon={drillRoutine.includes(drill) ? <span>✓</span> : <span>＋</span>}
                        disabled={drillRoutine.includes(drill)}
                        onClick={() => setDrillRoutine([...drillRoutine, drill])}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider my={4} />
                <Heading size="sm" mt={4} color="black">Your Custom Routine ({drillRoutine.length})</Heading>
                <List spacing={1}>
                  {drillRoutine.map((drill, i) => (
                    <ListItem key={i} pl={3} py={1}>
                      <Text fontWeight="bold" as="span">{drill.name}</Text>: <Text as="span" fontSize="sm">{drill.description}</Text>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel>
                <Heading size="md" mb={2} color="black">Personalized Training Plan</Heading>
                <Text mb={2}>
                  Tell us your main goal below to unlock a structured plan.
                </Text>
                <Input placeholder="e.g., Send V6, Improve Footwork, Build Endurance..." bg="white" mb={3} />
                <Button colorScheme="teal" mb={2}>Generate Plan (Premium)</Button>
                <Text fontSize="sm" color="gray.500">Custom plans and AI-based adjustments available for paid users.</Text>
              </TabPanel>

              <TabPanel>
                {/* ✅ Live Progress Tab */}
                <Box mb={6}>
                  <LogClimbForm onLogClimb={handleLogClimb} />
                </Box>
                <Divider my={5} />
                <ProgressTab climbLogs={climbLogs} />
              </TabPanel>

              <TabPanel>
                <Heading size="md" mb={2} color="black">Community Leaderboard</Heading>
                <VStack align="stretch" spacing={2} mb={4}>
                  {leaderboard.map((user, idx) => (
                    <Flex key={idx} align="center" gap={3}>
                      <Badge colorScheme={idx === 0 ? "teal" : "gray"}>{idx + 1}</Badge>
                      <Text fontWeight="bold">{user.name}</Text>
                      <Badge colorScheme="orange">{user.badge}</Badge>
                      <Text color="gray.600" ml="auto">Streak: {user.streak}</Text>
                    </Flex>
                  ))}
                </VStack>
                <Divider my={2} />
                <Heading size="sm" color="black" mb={1}>Your Squads</Heading>
                <List>
                  {user.squads.map((squad, idx) => (
                    <ListItem key={idx} fontSize="sm" pl={2}>{squad}</ListItem>
                  ))}
                </List>
                <Button mt={3} colorScheme="teal" size="sm">Create/Join Squad (Premium)</Button>
              </TabPanel>

              <TabPanel>
                <ChatBot />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

// --- ChatBot stays unchanged: paste your code below or import as before ---

export default App;
