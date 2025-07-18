import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const cooldownSteps = [
  "5-10 min light cardio to bring heart rate down (brisk walk or slow spin bike)",
  "Forearm and finger stretches (hold 30-60 sec each)",
  "Shoulder, chest, and back stretching",
  "Gentle yoga or foam rolling",
  "Hydrate and refuel"
];

export default function CoolDown() {
  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        Cool Down
      </Heading>
      <List spacing={3}>
        {cooldownSteps.map((step, i) => (
          <ListItem key={i}>
            <Text as="span" fontWeight="medium">Step {i + 1}: </Text>
            {step}
          </ListItem>
        ))}
      </List>
      <Text mt={5} fontSize="sm" color="gray.500">
        Cool downs aid recovery and help prevent soreness.
      </Text>
    </Box>
  );
}
