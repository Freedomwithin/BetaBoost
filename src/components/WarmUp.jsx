import { useState } from "react";
import { Box, Heading, List, ListItem, Text, Checkbox, Button, Collapse, VStack } from "@chakra-ui/react";

// More educational content and tips
const warmupSteps = [
  {
    label: "5–10 min light cardio",
    details: "Jog, jump rope, or brisk walk to raise core temperature and gently increase heart rate. Skipping this step raises injury risk!"
  },
  {
    label: "Shoulder circles, arm swings, and wrist rotations",
    details: "Loosen joints: 10–20 reps per movement. Focus on full, controlled range of motion."
  },
  {
    label: "Finger and forearm stretches",
    details: "Ease into gentle finger pulls and wrist flexion/extension. Hold each for 10–20 sec."
  },
  {
    label: "Easy traversing or climbing (2–3 grades below max)",
    details: "3–5 minutes of relaxed movement. Focus on smooth, controlled footwork. This primes patterns, not pump."
  },
  {
    label: "Mobility: hip openers, gentle squats, and lunges",
    details: "Target climbing-specific movement: deep squats, lizard lunge, leg swings, CARS. Spend more time if you’re tight."
  }
];

export default function WarmUp() {
  const [checked, setChecked] = useState(Array(warmupSteps.length).fill(false));
  const [showDetail, setShowDetail] = useState(Array(warmupSteps.length).fill(false));

  const handleCheck = idx => {
    setChecked(arr => {
      const updated = [...arr];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleExpand = idx => {
    setShowDetail(arr => {
      const updated = [...arr];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const resetWarmup = () => {
    setChecked(Array(warmupSteps.length).fill(false));
    setShowDetail(Array(warmupSteps.length).fill(false));
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        🏁 Warm Up
      </Heading>
      <VStack align="stretch" spacing={3}>
        {warmupSteps.map((step, i) => (
          <Box key={i} borderRadius="md" bg={checked[i] ? "green.50" : undefined} p={2}>
            <Checkbox
              isChecked={checked[i]}
              onChange={() => handleCheck(i)}
              colorScheme="teal"
              fontWeight="bold"
            >
              <Text as="span" fontWeight="medium">
                Step {i + 1}: {step.label}
              </Text>
              <Button
                onClick={() => handleExpand(i)}
                size="xs"
                variant="link"
                ml={2}
                colorScheme="blue"
                tabIndex={-1}
              >
                {showDetail[i] ? "Hide Tip" : "Show Tip"}
              </Button>
            </Checkbox>
            <Collapse in={showDetail[i]}>
              <Text fontSize="sm" color="gray.600" mt={2} ml={6}>
                {step.details}
              </Text>
            </Collapse>
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="teal" size="sm" onClick={resetWarmup}>
        Reset
      </Button>
      <Text mt={5} fontSize="sm" color="gray.500">
        A good warm up reduces injury and improves session quality. Take it seriously, climb longer!
      </Text>
    </Box>
  );
}
