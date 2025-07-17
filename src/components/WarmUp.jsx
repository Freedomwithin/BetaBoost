import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const warmupSteps = [
  "5-10 min light cardio (jog, jump rope, or brisk walk)",
  "Shoulder circles, arm swings, and wrist rotations",
  "Finger and forearm stretches",
  "Easy traversing or climbing on the wall (2-3 grades below max)",
  "Mobility: hip openers, gentle squats, and lunges"
];

export default function WarmUp() {
  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        Warm Up
      </Heading>
      <List spacing={3}>
        {warmupSteps.map((step, i) => (
          <ListItem key={i}>
            <Text as="span" fontWeight="medium">Step {i + 1}: </Text>
            {step}
          </ListItem>
        ))}
      </List>
      <Text mt={5} fontSize="sm" color="gray.500">
        A good warm up reduces injury and improves session quality.
      </Text>
    </Box>
  );
}
