import { Box, Heading, List, ListItem, Text, Stack, Divider } from "@chakra-ui/react";

// Updated drills grouped by category
const drillCategories = {
  Power: [
    {
      name: "One-Handed Climbing",
      description: "Use only one hand (alternate per attempt). Builds power and body tension.",
    },
    {
      name: "Double Dyno",
      description: "Only perform double dynos to train explosive power and commitment.",
    },
    {
      name: "Three Holds Only",
      description: "Limit yourself to 3 holds at a time. Trains static power and body control.",
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
      description: "Climb down what you just climbed up. Builds endurance and control.",
    },
    {
      name: "Arcing",
      description: "Climb easy terrain nonstop for 15–30 minutes. Develops aerobic capacity.",
    },
    {
      name: "Pause and Hold",
      description: "Pause mid-move for 3–5 seconds. Builds static endurance and mental control.",
    },
  ],
  Mobility: [
    {
      name: "Slab Flow",
      description: "Link easy slab climbs with minimal rest. Encourages balance and posture.",
    },
    {
      name: "Quiet Core",
      description: "Climb without core swing. Focus on midline stability and mobility.",
    },
  ],
  Mental: [
    {
      name: "Eliminate Holds",
      description: "Remove certain holds from a route. Trains adaptability and flow.",
    },
    {
      name: "Eyes Closed Feet",
      description: "Use visual input for hands only. Place feet with proprioception.",
    },
  ],
};

export default function DrillLibrary() {
  return (
    <Box>
      <Heading size="md" mb={6} textAlign="center" color="black">
        Drill Library
      </Heading>

      <Stack spacing={10}>
        {Object.entries(drillCategories).map(([category, drills]) => (
          <Box key={category}>
            <Heading size="sm" mb={3} color="teal.700" borderBottom="2px solid teal" pb={1}>
              {category}
            </Heading>
            <List spacing={3}>
              {drills.map((drill, idx) => (
                <ListItem
                  key={idx}
                  borderLeft="4px solid teal"
                  pl={3}
                  mb={2}
                  bg="whiteAlpha.900"
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{ bg: "teal.50" }}
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
          </Box>
        ))}
      </Stack>

      <Divider my={8} />
      <Text fontSize="sm" color="gray.600" textAlign="center">
        Mix and match drills based on your goals — a balanced climber trains strength, skill, and the mind 🧠💪
      </Text>
    </Box>
  );
}
