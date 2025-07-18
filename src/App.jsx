import React, { useState } from "react";
import {
  ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, extendTheme, HStack, Button, Text, Flex, Badge, Input, VStack, List, ListItem, Divider, IconButton
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Mock User Data
const mockUser = {
  name: "Alex",
  streak: 7,
  level: "Projector",
  completedDrills: 15,
  loggedSessions: 42,
  squads: ["Momentum Crew", "Weekend Senders"],
};

// Mock Leaderboard
const leaderboard = [
  { name: "Alex", streak: 7, badge: "🔥 Projector" },
  { name: "Sam", streak: 6, badge: "Enduro" },
  { name: "Kim", streak: 5, badge: "Tech Master" }
];

// Drill Library with Tags & Search
const drillLibrary = [
  { name: "Silent Feet", description: "Climb quietly for precise footwork.", tags: ["technique"] },
  { name: "Downclimbing", description: "Climb down to improve balance.", tags: ["endurance", "technique"] },
  { name: "Double Dyno", description: "Explosive jumping for power.", tags: ["power"] },
  { name: "Backstep Drill", description: "Hip positioning & efficiency.", tags: ["technique"] },
  { name: "Pause and Hold", description: "Pause 3s on each move for control.", tags: ["endurance", "mental"] },
  { name: "Eliminate Holds", description: "Remove a hold for creativity.", tags: ["mental", "technique"] },
  { name: "4x4 Endurance", description: "Climb 4 problems, 4 times.", tags: ["endurance"] },
  { name: "Slab Flow", description: "Link up slab climbs for mobility.", tags: ["mobility"] },
];

// Modern theme and animated heading
const colorPalettes = {
  leafy: {
    name: "Leafy",
    colors: {
      800: "#154f33",
      600: "#1a804a",
      100: "#c8efdb",
      400: "#4fc582",
    }
  },
  ocean: {
    name: "Ocean",
    colors: {
      800: "#08306b",
      600: "#1565c0",
      100: "#bbeeff",
      400: "#2196f3"
    }
  },
  sunset: {
    name: "Sunset",
    colors: {
      800: "#bf360c",
      600: "#f4511e",
      100: "#ffecb3",
      400: "#ff9100"
    }
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
  const theme = extendTheme({
    fonts: {
      heading: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      body: "'Inter', 'Segoe UI', Arial, sans-serif",
    },
    colors: { [palette]: colorPalettes[palette].colors },
    styles: { global: { body: { color: "black" } } }
  });

  // Filtered drill list by tag or search
  const displayDrills = drillLibrary.filter(
    drill =>
      drill.name.toLowerCase().includes(drillSearch.toLowerCase()) ||
      drill.tags.some(tag => tag.includes(drillSearch.toLowerCase()))
  );

  // ----- Main Return -----
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
          {/* Theme Picker & App Streak/Stats Mini-Topbar */}
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
                <b>{mockUser.name}</b> | Streak: <b>{mockUser.streak} days</b> | Level: {mockUser.level}
              </Text>
            </Box>
          </Flex>

          {/* Animated Title */}
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

          {/* Tabs */}
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
                {/* Dashboard with stats and call to action */}
                <Heading size="md" color="black" mb={2}>Welcome, {mockUser.name}!</Heading>
                <Text mb={2}>Last session: V5 limit, 40 mins. Keep up your streak!</Text>
                <Flex align="center" gap={4} mb={4} mt={2}>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{mockUser.completedDrills}</Text>
                    <Text fontSize="sm" color="gray.600">Drills Completed</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{mockUser.loggedSessions}</Text>
                    <Text fontSize="sm" color="gray.600">Sessions Logged</Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{mockUser.streak}</Text>
                    <Text fontSize="sm" color="gray.600">Day Streak</Text>
                  </Box>
                </Flex>
                <Divider mb={4} />
                <Text mb={2}>Personalized tip: <i>Don’t just repeat your strengths—schedule a session focused on your weakest skill this week!</i></Text>
              </TabPanel>

              <TabPanel>
                {/* Drill Library: Search, list, add to routine */}
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
                {/* Training Plans – scaffold for premium */}
                <Heading size="md" mb={2} color="black">Personalized Training Plan</Heading>
                <Text mb={2}>
                  Tell us your main goal below and unlock a structured plan.
                </Text>
                <Input placeholder="e.g., Send V6, Improve Footwork, Build Endurance..." bg="white" mb={3} />
                <Button colorScheme="teal" mb={2}>Generate Plan (Premium Feature)</Button>
                <Text fontSize="sm" color="gray.500">Custom plans and AI-based weekly adjustments are available for paid users.</Text>
              </TabPanel>

              <TabPanel>
                {/* Progress tracking – scaffold */}
                <Heading size="md" mb={2} color="black">Progress & Analytics</Heading>
                <Text mb={4}>
                  Data visualization and detailed progress over time coming soon. Upgrade to premium for advanced stats, milestone tracking, and export.
                </Text>
                <Box bg="gray.100" borderRadius="md" p={4}>
                  <Text fontWeight="bold" color="gray.600">Recent Activity</Text>
                  <List fontSize="sm" mt={2}>
                    <ListItem>Logged Session: Limit Bouldering – V4-V5 – 1 hour</ListItem>
                    <ListItem>Completed Drill: Silent Feet</ListItem>
                    <ListItem>Streak extended: 7 days active</ListItem>
                  </List>
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Community tab – squads & leaderboard */}
                <Heading size="md" mb={2} color="black">Community Leaderboard</Heading>
                <VStack align="stretch" spacing={2} mb={4}>
                  {leaderboard.map((user, idx) => (
                    <Flex key={idx} align="center" gap={3}>
                      <Badge colorScheme={idx === 0 ? "teal" : "gray"}>
                        {idx + 1}
                      </Badge>
                      <Text fontWeight="bold">{user.name}</Text>
                      <Badge colorScheme="orange">{user.badge}</Badge>
                      <Text color="gray.600" ml="auto">Streak: {user.streak}</Text>
                    </Flex>
                  ))}
                </VStack>
                <Divider my={2} />
                <Heading size="sm" color="black" mb={1}>Your Squads</Heading>
                <List>
                  {mockUser.squads.map((squad, idx) => (
                    <ListItem key={idx} fontSize="sm" pl={2}>{squad}</ListItem>
                  ))}
                </List>
                <Button mt={3} colorScheme="teal" size="sm">Create/Join Squad (Premium)</Button>
              </TabPanel>

              <TabPanel>
                {/* AI ChatBot – deep motivational logic included */}
                <ChatBot />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

// AI ChatBot Component – motivational responses, weakness focus, goal prompts
function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi climber! I'm here to help you get better, not just at what you enjoy, but at what will make the biggest impact. What's on your mind—do you want advice, motivation, or help working through a struggle?",
    },
  ]);
  const [input, setInput] = useState("");
  const [lastFocus, setLastFocus] = useState(null);

  function getBotReply(userText) {
    const txt = userText.toLowerCase();

    if (txt.includes("hi") || txt.includes("hello")) {
      return "Welcome back! What aspect of your climbing do you want to talk about or improve today?";
    }
    if (txt.includes("struggle") || txt.includes("problem") || txt.includes("stuck")) {
      return "Many climbers hit plateaus or avoid their weak points. What's the one thing you struggle with or avoid most? Let's tackle it together.";
    }
    if (txt.includes("burnout")) {
      return "Climbing can be intense. Remember to take rest days, celebrate progress, and keep the fun in your sessions.";
    }
    if (txt.includes("scared") || txt.includes("afraid") || txt.includes("nervous")) {
      return "It's normal to feel nervous! Fears only shrink when you face them. Is it the height, falling, or something else? Let's break it down.";
    }
    if (txt.includes("injury") || txt.includes("hurt") || txt.includes("pain")) {
      return "Please listen to your body! Focus on recovery, mobility, and technique drills that don't aggravate the area. Healing now means stronger sessions later.";
    }
    if (txt.includes("progress") || txt.includes("plateau")) {
      return "Plateaus are a sign you’re pushing your limits! Target what you avoid most and measure any improvement—no matter how small. Consistent effort will crack the plateau.";
    }
    if (
      txt.includes("i'm good at") ||
      txt.includes("i am good at") ||
      txt.includes("i like") ||
      txt.includes("i enjoy") ||
      txt.includes("favourite") ||
      txt.includes("favorite")
    ) {
      if (lastFocus) {
        return `Enjoying your strengths is important, but true progress comes from facing your weaknesses. Want to work on your ${lastFocus}?`;
      }
      return "It's great to enjoy climbing what you love. But real growth happens where you're least comfortable. Want to talk about what you avoid or dread at the gym?";
    }
    if (txt.includes("technique")) {
      setLastFocus("technique");
      return "Focusing on technique is a game-changer. Practice drills like silent feet, backsteps, or foot-swap challenges. Do you know which movement feels least natural or most insecure for you?";
    }
    if (txt.includes("strength")) {
      setLastFocus("strength");
      return "Strength comes from quality over quantity. Limit bouldering, weighted hangs, and core tension work help a lot. Need a simple routine, or advice on finger training safety?";
    }
    if (txt.includes("power")) {
      setLastFocus("power");
      return "Power is built explosively. Try double dynos, campus board moves, or big coordinated reaches. But start rested and focus on good form first to avoid injury.";
    }
    if (txt.includes("endurance")) {
      setLastFocus("endurance");
      return "Endurance grows from time-on-wall: ARC (easy, continuous climbing), 4x4s, and lap sessions help you stay in motion and recover faster. Would you like an example session or a pacing tip?";
    }
    if (txt.includes("mobility") || txt.includes("flexibility")) {
      setLastFocus("mobility");
      return "Mobility unlocks more climbable positions and injury resistance. Incorporate lower body stretches and high-step drills. Want a few favorite mobility drills?";
    }
    if (txt.includes("mental") || txt.includes("head") || txt.includes("focus")) {
      setLastFocus("mental");
      return "Mental training is often overlooked, but it's crucial. Try visualization, breathing routines, and controlled falls to master your nerves. Is fear or focus the bigger block for you?";
    }
    if (txt.includes("plan") || txt.includes("routine")) {
      if (lastFocus === "technique") {
        return "Try silent feet and backstep drills every warmup. Afterward, focus on smooth, controlled movement on at least one climb per session. Want to track your results after a week?";
      }
      if (lastFocus === "strength") {
        return "Mix two days a week of fingerboard hangs and core work with low-rep bouldering. Rest well and listen to your body. Want detailed sets and rest schedules?";
      }
      if (lastFocus === "endurance") {
        return "ARC: 2–3 sets of 15 minutes easy climbing, with 10 minutes rest between. Modify difficulty to never 'pump out.' Would you like a 4x4 protocol as well?";
      }
      if (lastFocus === "mobility") {
        return "Try including deep squats, hip opener stretches, and controlled high steps before you climb. Consistency trumps intensity with mobility!";
      }
      if (lastFocus === "power") {
        return "Schedule max power moves like campus laddering or limit boulder problems early in your session, when freshest. Space out attempts and focus on exploding through hard moves.";
      }
      if (lastFocus === "mental") {
        return "Spend a few minutes every session visualizing a send, or practice mindfulness between climbs. Try embracing stress as your body preparing for performance!";
      }
      return "Let me know what you want a plan for: strength, technique, endurance, mobility, power, or mental training.";
    }
    if (txt.includes("tip") || txt.includes("advice") || txt.includes("drill")) {
      if (lastFocus === "technique") {
        return "Drill: Repeat a climb but pause for 2 seconds on every hold before moving—forces body awareness and control. Slow equals smooth, smooth equals strong!";
      }
      if (lastFocus === "strength") {
        return "Drill: Reduce the number of holds used to force bigger pulls and full-body engagement.";
      }
      if (lastFocus === "mental") {
        return "Tip: Before a difficult route, try box breathing and mentally rehearse each movement.";
      }
      if (lastFocus === "endurance") {
        return "Drill: 4x4s – climb 4 problems in a row, rest 2 minutes, repeat 4 times. Focus on smooth movement and controlled breathing.";
      }
      if (lastFocus === "mobility") {
        return "Tip: Use hip openers like lizard stretch before and after climbing. Try to high-step on every climb.";
      }
      if (lastFocus === "power") {
        return "Try 'max blast' moves—pick one hard move per set and go all-in with perfect form. Full recovery between attempts!";
      }
      return "Let me know your main focus area (technique/strength/endurance/mobility/power/mental), and I'll share a relevant drill or tip!";
    }
    return "Tell me what you want to improve most—technique, strength, endurance, power, mobility, or mental approach? Want an actionable drill, a routine, or just some outside-the-box advice?";
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
                color={m.role === "user" ? "blue.500" : "green.600"}
              >
                {m.role === "user" ? "You" : "Assistant"}:
              </Text>{" "}
              <Text as="span">{m.text}</Text>
            </Box>
          ))}
        </Box>
        <Box
          as="form"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question, struggle, or what you want to improve..."
            bg="white"
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <Button mt={2} colorScheme="teal" onClick={sendMessage} w="100%">
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
