import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const drills = [
  {
    name: "Silent Feet",
    description: "Climb making as little noise as possible. Teaches precise footwork."
  },
  {
    name: "Downclimbing",
    description: "Climb down what you just climbed up. Improves control and balance."
  },
  {
    name: "One-handed Climbing",
    description: "Use only one hand (alternate per attempt). Builds power and body tension."
  },
];

export default function DrillLibrary() {
  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        Drill Library
      </Heading>
      <List spacing={3}>
        {drills.map((drill, idx) => (
          <ListItem key={idx} borderLeft="4px solid teal" pl={3} mb={2}>
            <Text fontWeight="bold">{drill.name}</Text>
            <Text fontSize="sm" color="gray.700">{drill.description}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
