import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  extendTheme,
  Text,
  Flex,
  Badge,
  Input,
  VStack,
  List,
  ListItem,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReminderControls from "./components/ReminderControls";

// ----- DASHBOARD DATA -----
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
  { name: "Kim", streak: 5, badge: "Tech Guru" },
];

const drillCategories = {
  Power: [
    {
      name: "Double Dyno",
      description:
        "Only perform double dynos to train explosive power and commitment.",
    },
    {
      name: "One-Handed Climbing",
      description:
        "Use only one hand (alternate per attempt). Builds power and body tension.",
    },
    {
      name: "Three Holds Only",
      description:
        "Limit yourself to 3 holds at a time. Trains static power and body control.",
    },
    {
      name: "Max Hangs",
      description:
        "Hang on the smallest safe edge for 7–10 seconds at max effort. Rest fully. (Advanced only).",
    },
    {
      name: "Limit Bouldering",
      description:
        "Project the hardest move or problem you can do in 3–8 tries. Power over volume.",
    },
  ],
  Technique: [
    {
      name: "Silent Feet",
      description: "Climb making as little noise as possible. Teaches precise footwork.",
    },
    {
      name: "Backstep Drill",
      description: "Force frequent backsteps. Teaches hip positioning and foot precision.",
    },
    {
      name: "Foot Follow Hands",
      description: "Move a foot to wherever your hand goes. Reinforces body alignment.",
    },
    {
      name: "Precision Toe Touches",
      description: "Tap tiny footholds without shifting weight. Sharpens foot accuracy.",
    },
  ],
  Endurance: [
    {
      name: "Downclimbing",
      description: "Climb down what you just climbed. Builds endurance and control.",
    },
    {
      name: "Arcing",
      description: "Climb easy terrain nonstop for 15–30 minutes.",
    },
    {
      name: "4x4s",
      description: "Climb 4 problems in a row, rest 2 min, repeat x4 rounds.",
    },
  ],
  Mobility: [
    {
      name: "Slab Flow",
      description:
        "Link slab climbs with minimal rest. Encourages balance and posture.",
    },
    {
      name: "High Steps & Flags",
      description: "Exaggerate high steps, drop knees, and flags on every move.",
    },
  ],
  Mental: [
    {
      name: "Eliminate Holds",
      description: "Remove certain holds from a route. Trains adaptability and flow.",
    },
    {
      name: "Eliminiate Holds",
      description: "Remove certain holds from a route. Trains adaptability and flow.",
    },
    {
      name: "On-Sight Simulation",
      description: "Climb a new problem with no preview or beta.",
    },
  ],
};

const colorWave = keyframes`
  0% {background-position: 0% 50%;text-shadow: 2px 4px 16px #122;}
  50% {background-position: 100% 50%;text-shadow: 0 0 22px #24c6dc77;}
  100% {background-position: 0% 50%;text-shadow: 2px 4px 16px #122;}
`;

const theme = extendTheme({
  colors: {
    ocean: {
      800: "#0d1a2f",
      700: "#193366",
      600: "#23408f",
      400: "#2b53c0",
      200: "#7da7f9",
      100: "#d9e5fc",
    },
  },
  fonts: {
    heading: "'Montserrat', 'Segoe UI', Arial, sans-serif",
    body: "'Inter', 'Segoe UI', Arial, sans-serif",
  },
  styles: { global: { body: { color: "black" } } },
});

// ----- DRILL LIBRARY ACCORDION -----
function DrillLibraryAccordion() {
  const [search, setSearch] = useState("");

  const filteredCategories = search
    ? Object.fromEntries(
      Object.entries(drillCategories)
        .map(([category, drills]) => [
          category,
          drills.filter(
            (d) =>
              d.name.toLowerCase().includes(search.toLowerCase()) ||
              d.description.toLowerCase().includes(search.toLowerCase())
          ),
        ])
        .filter(([, drills]) => drills.length > 0)
    )
    : drillCategories;

  return (
    <Box>
      <Input
        placeholder="Search any drill or keyword"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={3}
        bg="white"
      />
      <Accordion allowMultiple>
        {Object.entries(filteredCategories).map(([category, drills]) => (
          <AccordionItem key={category}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold" color="ocean.600">
                  {category}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                {drills.map((drill, idx) => (
                  <ListItem
                    key={idx}
                    borderLeft="4px solid"
                    borderColor="ocean.400"
                    pl={3}
                    mb={2}
                    bg="whiteAlpha.900"
                    borderRadius="lg"
                    transition="all 0.2s"
                    _hover={{ bg: "ocean.100" }}
                  >
                    <Text fontWeight="bold" fontSize="md" color="black">
                      {drill.name}
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      {drill.description}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Divider my={8} />
      <Text fontSize="sm" color="gray.600" textAlign="center">
        Mix and match drills based on your goals — a balanced climber trains strength, skill, and the mind 🧠💪
      </Text>
    </Box>
  );
}

// ----- PROGRESS ANALYTICS COMPONENT -----
function ProgressAnalytics() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("sessionLogs") || "[]");
    setSessions(logs);
  }, []);

  // Compute simple stats:
  const totalSessions = sessions.length;
  const daysActive = [...new Set(sessions.map(s => s.date?.slice(0, 10)))].length;
  const totalDrills = sessions.flatMap((s) => s.drills ?? []).length;

  // Calculate current streak (basic consecutive day streak calculation)
  const computeStreak = (logs) => {
    if (!logs.length) return 0;
    const dates = [...new Set(logs.map((l) => l.date?.slice(0, 10)))].sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    let prevDate = new Date();
    for (const dateStr of dates) {
      const date = new Date(dateStr);
      const diffDays = Math.floor((prevDate - date) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        streak++;
        prevDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = computeStreak(sessions);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Your Progress
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Sessions Logged</StatLabel>
          <StatNumber>{totalSessions}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Drills Completed</StatLabel>
          <StatNumber>{totalDrills}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Active Days</StatLabel>
          <StatNumber>{daysActive}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Current Streak</StatLabel>
          <StatNumber>{streak}</StatNumber>
          <StatHelpText>days</StatHelpText>
        </Stat>
      </StatGroup>
      <Divider my={4} />
      <Heading size="sm" mb={2}>
        Recent Sessions
      </Heading>
      <List spacing={2} maxH="200px" overflowY="auto">
        {sessions.slice(-5).reverse().map((s, i) => (
          <ListItem key={i}>
            {new Date(s.date).toLocaleDateString()}: {s.drills?.join(", ") || "No drills"} – {s.duration ?? "?"} min
          </ListItem>
        ))}
        {sessions.length === 0 && <Text>No session data yet.</Text>}
      </List>
    </Box>
  );
}

// ----- AI COACH -----
function ChatBot() {
  // ... your existing ChatBot code remains unchanged ...
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi climber! I'm here to help you get better—not just at what you enjoy, but at what will make the biggest impact. What's on your mind: advice, motivation, or help working through a struggle?",
    },
  ]);
  const [input, setInput] = useState("");
  const [lastFocus, setLastFocus] = useState(null);

  function getBotReply(userText) {
    // ... existing getBotReply logic ...
    // (unchanged for brevity)
    return "Tell me your main focus or what you want to improve: technique, strength, power, endurance, mobility, or mental approach. I’ll help with plans, tips, or honest outside-the-box advice!";
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botText = getBotReply(input);
    const botMsg = { role: "assistant", text: botText };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  }

  return (
    <Box p={4} maxW="500px">
      <VStack align="stretch" spacing={2} w="100%">
        <Box
          borderWidth={1}
          borderRadius="md"
          p={3}
          bg="gray.50"
          maxH="300px"
          overflowY="auto"
          minH="150px"
        >
          {messages.map((m, idx) => (
            <Box key={idx} mb={1} textAlign={m.role === "user" ? "right" : "left"}>
              <Text
                as="span"
                fontWeight="bold"
                color={m.role === "user" ? "ocean.600" : "ocean.800"}
              >
                {m.role === "user" ? "You" : "Assistant"}:
              </Text>{" "}
              <Text as="span">{m.text}</Text>
            </Box>
          ))}
        </Box>
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question, struggle, or what you want to improve..."
            bg="white"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button mt={2} colorScheme="ocean" onClick={sendMessage} w="100%">
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

// ----- SUCCESS PAGE -----
function Success() {
  useEffect(() => {
    localStorage.setItem("betaBoostPremium", "true");
  }, []);

  return (
    <Box p={10} textAlign="center">
      <Heading mb={4}>🎉 Payment Successful!</Heading>
      <Text>Welcome to BetaBoost Premium. Enjoy all features!</Text>
    </Box>
  );
}

// ----- CANCEL PAGE -----
function Cancel() {
  return (
    <Box p={10} textAlign="center">
      <Heading mb={4}>Payment Canceled</Heading>
      <Text>No worries—you can upgrade anytime!</Text>
    </Box>
  );
}

// ----- MAIN APP WITH ROUTING AND PREMIUM GATING -----
function App() {
  const isPremium = localStorage.getItem("betaBoostPremium") === "true";

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Box
                minH="100vh"
                w="100vw"
                bgImage={`url("/indoor-climbing.PNG")`}
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
                  {/* Reminders Control */}
                  <ReminderControls />

                  {/* User info row */}
                  <Flex align="center" justify="flex-end" mb={1}>
                    <Box>
                      <Text fontSize="sm" color="gray.700">
                        <b>{user.name}</b> | Streak: <b>{user.streak} days</b> | Level:{" "}
                        {user.level}
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
                    bgGradient="linear(105deg, #2196f3 0%, #1565c0 60%, #08306b 100%)"
                    bgClip="text"
                    sx={{
                      backgroundSize: "200% 200%",
                      animation: `${colorWave} 3.6s ease-in-out infinite`,
                    }}
                  >
                    BetaBoost
                  </Heading>

                  {/* Tabs with ProgressAnalytics in Progress tab */}
                  <Tabs
                    isFitted
                    variant="soft-rounded"
                    colorScheme="ocean"
                    size="lg"
                    orientation="horizontal"
                  >
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
                        <Heading size="md" color="black" mb={2}>
                          Welcome, {user.name}!
                        </Heading>
                        <Text mb={2}>Last session: V5 limit, 40 minutes. Keep up your streak!</Text>
                        <Flex align="center" gap={4} mb={4} mt={2}>
                          <Box>
                            <Text fontSize="lg" fontWeight="bold">
                              {user.completedDrills}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Drills Completed
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="lg" fontWeight="bold">
                              {user.loggedSessions}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Sessions Logged
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="lg" fontWeight="bold">
                              {user.streak}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Day Streak
                            </Text>
                          </Box>
                        </Flex>
                        <Divider mb={4} />
                        <Text mb={2}>
                          Personalized tip:{" "}
                          <i>Schedule a session focused on your biggest weakness for the fastest
                            progress!</i>
                        </Text>

                        {/* Example: Log Session Button for demo/testing */}
                        <Button
                          mt={4}
                          colorScheme="green"
                          onClick={() => {
                            // Save session log to localStorage on click
                            const currLogs = JSON.parse(localStorage.getItem("sessionLogs") || "[]");
                            currLogs.push({
                              date: new Date().toISOString(),
                              drills: ["Silent Feet"], // Example drill; adjust as needed
                              duration: 40, // Example duration in minutes
                            });
                            localStorage.setItem("sessionLogs", JSON.stringify(currLogs));

                            // Also update last session date for reminders
                            localStorage.setItem("lastSessionDate", new Date().toISOString());

                            window.location.reload();
                          }}
                        >
                          Log Today's Session (Demo)
                        </Button>
                        <Text mt={2} fontSize="sm" color="gray.500">
                          (Click to simulate a workout log and update your progress & reminders)
                        </Text>
                      </TabPanel>

                      <TabPanel>
                        <Heading size="md" mb={2} color="black">
                          Drill Library
                        </Heading>
                        <DrillLibraryAccordion />
                      </TabPanel>

                      <TabPanel>
                        <Heading size="md" mb={2} color="black">
                          Personalized Training Plan
                        </Heading>
                        <Text mb={2}>Tell us your main goal below to unlock a structured plan.</Text>
                        <Input placeholder="e.g., Send V6, Improve Footwork, Build Endurance..." bg="white" mb={3} />
                        {isPremium ? (
                          <Button colorScheme="ocean" mb={2}>Generate Plan (Premium)</Button>
                        ) : (
                          <>
                            <Button colorScheme="gray" mb={2} isDisabled>
                              Generate Plan (Premium)
                            </Button>
                            <Text fontSize="sm" color="red.600">
                              Upgrade to Premium to unlock custom plans and AI-based adjustments.
                            </Text>
                          </>
                        )}
                      </TabPanel>

                      <TabPanel>
                        <ProgressAnalytics />
                      </TabPanel>

                      <TabPanel>
                        <Heading size="md" mb={2} color="black">
                          Community Leaderboard
                        </Heading>
                        <VStack align="stretch" spacing={2} mb={4}>
                          {leaderboard.map((user, idx) => (
                            <Flex key={idx} align="center" gap={3}>
                              <Badge colorScheme="ocean">{idx + 1}</Badge>
                              <Text fontWeight="bold">{user.name}</Text>
                              <Badge colorScheme="orange">{user.badge}</Badge>
                              <Text color="gray.600" ml="auto">
                                Streak: {user.streak}
                              </Text>
                            </Flex>
                          ))}
                        </VStack>
                        <Divider my={2} />
                        <Heading size="sm" color="black" mb={1}>
                          Your Squads
                        </Heading>
                        <List>
                          {user.squads.map((squad, idx) => (
                            <ListItem key={idx} fontSize="sm" pl={2}>
                              {squad}
                            </ListItem>
                          ))}
                        </List>
                        <Button mt={3} colorScheme="ocean" size="sm">
                          Create/Join Squad (Premium)
                        </Button>
                      </TabPanel>

                      <TabPanel>
                        <ChatBot />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>

                  {/* Dev only reset button */}
                  <Box textAlign="center" mt={6}>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        localStorage.removeItem("betaBoostPremium");
                        localStorage.removeItem("sessionLogs");
                        localStorage.removeItem("lastSessionDate");
                        window.location.reload();
                      }}
                    >
                      Reset Premium & Progress (Dev only)
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
