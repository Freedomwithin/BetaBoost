import React, { useState } from "react";
import {
  ChakraProvider, Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel,
  extendTheme, HStack, Button, Text, Flex, Badge, Input, VStack, List, ListItem,
  Divider, IconButton
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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

// Drill Library: Taggable, Searchable
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
                <Heading size="md" mb={2} color="black">Progress & Analytics</Heading>
                <Text mb={4}>
                  Visual statistics and detailed progress coming soon. Upgrade for milestones and export features.
                </Text>
                <Box bg="gray.100" borderRadius="md" p={4}>
                  <Text fontWeight="bold" color="gray.600">Recent Activity</Text>
                  <List fontSize="sm" mt={2}>
                    <ListItem>Logged: Limit Bouldering – V4-V5 – 1 hour</ListItem>
                    <ListItem>Completed Drill: Silent Feet</ListItem>
                    <ListItem>Streak: 9 days active</ListItem>
                  </List>
                </Box>
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

// AI Coach Bot: Motivational, Smart, Weakness-Aware
function ChatBot() {
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
    const txt = userText.toLowerCase();
    if (txt.includes("hi") || txt.includes("hello"))
      return "Welcome! What aspect of your climbing do you want to work on today?";
    if (txt.includes("struggle") || txt.includes("problem") || txt.includes("stuck"))
      return "Most climbers avoid weaknesses. What's the one skill or style you avoid? Let's tackle it.";
    if (txt.includes("burnout"))
      return "Rest is key. Reflect, reset, and find joy in small wins between big projects.";
    if (txt.includes("scared") || txt.includes("afraid") || txt.includes("nervous"))
      return "Nerves are normal! Is it fear of falling, commitment, or something else? We can work on a mental game plan.";
    if (txt.includes("injury") || txt.includes("hurt") || txt.includes("pain"))
      return "Focus on recovery and mobility. Adjust training to avoid aggravating areas—coming back stronger beats rushing.";
    if (txt.includes("progress") || txt.includes("plateau"))
      return "Plateaus are temporary. Consistency and working on what you avoid is the breakthrough combo.";
    if (
      txt.includes("i'm good at") ||
      txt.includes("i am good at") ||
      txt.includes("i like") ||
      txt.includes("i enjoy") ||
      txt.includes("favourite") ||
      txt.includes("favorite")
    ) {
      if (lastFocus)
        return `Enjoying strengths is key—but the biggest gains come from facing weaknesses. Want to work on your ${lastFocus}?`;
      return "Climbing what you enjoy is important. But real growth comes from pushing your boundaries!";
    }
    if (txt.includes("technique")) {
      setLastFocus("technique");
      return "Technique is the foundation. Silent feet, backsteps, and focus on precise movement will elevate you faster than more strength alone. What move feels most awkward to you?";
    }
    if (txt.includes("strength")) {
      setLastFocus("strength");
      return "Strength gains best come from quality efforts: limit boulders, hangs, and big pulls with full rest. Want a sample routine or specific drill?";
    }
    if (txt.includes("power")) {
      setLastFocus("power");
      return "Train power explosively when fresh: try double dynos, campus moves, and dynamic reaches. Aim for max effort, short sets, and pristine form!";
    }
    if (txt.includes("endurance")) {
      setLastFocus("endurance");
      return "ARC and 4x4s build capacity for long sessions—with less pump. Need a session plan or want to track your numbers?";
    }
    if (txt.includes("mobility") || txt.includes("flexibility")) {
      setLastFocus("mobility");
      return "Consistent mobilization and stretch routines make hard moves feel easy. Would you like a list of pre-climbing stretches?";
    }
    if (txt.includes("mental") || txt.includes("head") || txt.includes("focus")) {
      setLastFocus("mental");
      return "Mental strength is as trainable as fingers: try visualization, controlled falls, and mid-session mindfulness breaks. What holds you back most?";
    }
    if (txt.includes("plan") || txt.includes("routine")) {
      if (lastFocus === "technique")
        return "Include silent feet every warmup, focus on control through every move, and pause 1-2s at every hold on a route each day.";
      if (lastFocus === "strength")
        return "Limit bouldering at max effort, add 2x weekly hangboard if ready, and prioritize rest between hard pulls.";
      if (lastFocus === "power")
        return "Maximal efforts: 4–6 hard moves per set, plenty of rest. Quality over quantity!";
      if (lastFocus === "endurance")
        return "2x ARC climbs weekly; 15min sets with light forearm pump, or 4x4s. Log your pump level and aim for progress!";
      if (lastFocus === "mobility")
        return "Hip openers, deep squats, and dynamic arm swings before and after climbing fuel better sessions.";
      if (lastFocus === "mental")
        return "Dedicate 2 minutes before climbs for box breathing and imagine yourself sending. Reflect on what makes you hesitate, then plan to do that move first.";
      return "Specify your focus (technique, strength, endurance, etc.) and I'll give you a routine!";
    }
    if (txt.includes("tip") || txt.includes("advice") || txt.includes("drill")) {
      if (lastFocus === "technique")
        return "Drill: Pause 2 seconds at each foot placement—forces control and mindful movement. Start easy, then challenge yourself!";
      if (lastFocus === "strength")
        return "Drill: Eliminate large footholds or alternate one-arm moves for full-body engagement.";
      if (lastFocus === "mental")
        return "Tip: Visualize the send, then perform box breathing before the climb. Focus on process not perfection.";
      if (lastFocus === "endurance")
        return "Drill: 4x4—climb four different problems back to back, four rounds, resting 2 minutes in between.";
      if (lastFocus === "mobility")
        return "Tip: Incorporate deep lunges, hip openers, and high steps holding each for 10 seconds before start.";
      if (lastFocus === "power")
        return "Drill: Single max-move campus attempts with full (3-5 minute) rest. For experienced climbers only.";
      return "Let me know your main focus area and I'll share an actionable tip or drill!";
    }
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
