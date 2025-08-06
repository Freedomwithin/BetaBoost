import React, { useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const drillCategories = {
  Power: [
    { name: "One-Handed Climbing", description: "Use only one hand (alternate per attempt). Builds power and body tension." },
    { name: "Double Dyno", description: "Only perform double dynos to train explosive power and commitment." },
    { name: "Three Holds Only", description: "Limit yourself to 3 holds at a time. Trains static power and body control." },
    { name: "Max Hangs", description: "Hang on the smallest safe edge for 7–10 seconds at max effort. Rest fully. (Advanced only)." },
    { name: "Limit Bouldering", description: "Project the hardest move or problem you can do in 3–8 tries. Power over volume." },
    { name: "Campus Board Ladders", description: "Use a campus board for ladders (no feet). Explosive finger & upper body power." },
    { name: "One-Armed Lockoffs", description: "At the top of a pull-up or reach, hold for 3–5 seconds. Builds lockoff strength." },
    { name: "Deadpoint Challenge", description: "Practice large dynamic reaches with a soft catch." }
  ],
  Technique: [
    { name: "Silent Feet", description: "Climb making as little noise as possible. Teaches precise footwork." },
    { name: "Backstep Drill", description: "Force frequent backsteps. Teaches hip positioning and foot precision." },
    { name: "Foot Follow Hands", description: "Move a foot to wherever your hand goes. Reinforces body alignment." },
    { name: "Precision Toe Touches", description: "Tap tiny footholds without shifting weight. Sharpens foot accuracy." },
    { name: "No Thumbs", description: "Climb only using open-handed (no thumb) grip for contact strength and efficiency." },
    { name: "One-Limb Off", description: "Climb with a foot or hand off the wall. Trains balance and creativity." },
    { name: "Pause-and-Move", description: "Pause and hold any position for 3s before each move." },
    { name: "Feet Only Up/Down", description: "Climb up using only feet, then descend hands-free (careful!)." }
  ],
  Endurance: [
    { name: "Downclimbing", description: "Climb down what you just climbed. Builds endurance and control." },
    { name: "Arcing", description: "Climb easy terrain nonstop for 15–30 minutes." },
    { name: "Pause and Hold", description: "Pause mid-move for 3–5 seconds. Builds static endurance & mental control." },
    { name: "4x4s", description: "Climb 4 problems in a row, rest 2 min, repeat x4 rounds." },
    { name: "Lap Intervals", description: "Climb one route 3–5 times with minimal rest. Builds local endurance." },
    { name: "Rest Timer Drill", description: "Time rests between climbs; gradually decrease rest. Teaches pump recovery." },
    { name: "Circuit Traverse", description: "Link several problems on a long wall without coming down." }
  ],
  Mobility: [
    { name: "Slab Flow", description: "Link slab climbs with minimal rest. Encourages balance and posture." },
    { name: "Quiet Core", description: "Climb without core swing (keep midline super still)." },
    { name: "High Steps & Flags", description: "Exaggerate high steps, drop knees, and flags on every move." },
    { name: "Reverse Start", description: "Climb routes starting with your feet on the start holds." },
    { name: "Shoulder Mobility Circuit", description: "Do arm circles, doorway stretches, YTWs between climbs." },
    { name: "Hip Opener Circuit", description: "Deep squats, Cossack lunges, and lizard stretches during or after session." }
  ],
  Mental: [
    { name: "Eliminate Holds", description: "Remove certain holds from a route. Trains adaptability and flow." },
    { name: "Eyes Closed Feet", description: "Use visual input for hands only. Place feet with proprioception." },
    { name: "On-Sight Simulation", description: "Climb a new problem with no preview or beta." },
    { name: "Mid-Climb Visualization", description: "Before crux, close eyes and visualize yourself executing each move." },
    { name: "Split-Second Commitment", description: "When unsure, pick a sequence and commit instantly." },
    { name: "Send on Command", description: "Have a friend randomly say 'Go!'—climb immediately. Simulates comp pressure." },
    { name: "Failure Reflection", description: "After a fail, pause/reflect: 1 positive, 1 thing to improve." }
  ]
};

export default function DrillLibrary() {
  const [search, setSearch] = useState("");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("blue.400", "blue.300");
  const headingColor = useColorModeValue("blue.800", "blue.200");
  const iconColor = useColorModeValue("blue.600", "blue.300");

  // Filter drills by search term (case-insensitive)
  const filteredCategories = Object.entries(drillCategories).reduce((acc, [category, drills]) => {
    const filteredDrills = drills.filter(({ name, description }) => {
      const searchLower = search.toLowerCase();
      return (
        name.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower)
      );
    });
    if (filteredDrills.length > 0) {
      acc[category] = filteredDrills;
    }
    return acc;
  }, {});

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading size="md" mb={6} textAlign="center" color={headingColor}>
        Drill Library
      </Heading>

      <Input
        mb={6}
        placeholder="Search drills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search climbing drills"
      />

      <Accordion allowMultiple defaultIndex={[0]}>
        {Object.entries(filteredCategories).length === 0 ? (
          <Text textAlign="center" color="gray.500" my={6}>
            No drills found for "{search}"
          </Text>
        ) : (
          Object.entries(filteredCategories).map(([category, drills]) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold" color={headingColor}>
                    {category}
                  </Box>
                  <AccordionIcon color={iconColor} />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <List spacing={3}>
                  {drills.map(({ name, description }) => (
                    <ListItem
                      key={`${category}-${name}`}
                      borderLeft="4px solid"
                      borderColor={borderColor}
                      pl={3}
                      mb={2}
                      bg={bgColor}
                      borderRadius="lg"
                      transition="all 0.2s"
                      _hover={{ bg: hoverBgColor }}
                    >
                      <Text fontWeight="bold" fontSize="md" color={headingColor}>
                        {name}
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {description}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))
        )}
      </Accordion>

      <Divider my={8} />
      <Text fontSize="sm" color="gray.600" textAlign="center" userSelect="none">
        Mix and match drills based on your goals — a balanced climber trains strength, skill, and the mind 🧠💪
      </Text>
    </Box>
  );
}
