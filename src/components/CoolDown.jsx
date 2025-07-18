import { useState } from "react";
import { Box, Heading, List, ListItem, Text, Checkbox, Button, Collapse, VStack } from "@chakra-ui/react";

const cooldownSteps = [
  {
    label: "5–10 min light cardio",
    details: "Easy walk or spin lowers your heart rate and begins active recovery. Don't skip!"
  },
  {
    label: "Forearm and finger stretches (hold 30–60 sec each)",
    details: "Focus on gentle stretching, never painful. Helps remove metabolic waste from climbing muscles."
  },
  {
    label: "Shoulder, chest, and back stretching",
    details: "Target tight spots: doorway stretch, gentle child’s pose, eagle arms. Hold each for 30 sec."
  },
  {
    label: "Gentle yoga or foam rolling",
    details: "A few minutes of full body movement improves mobility and speeds recovery."
  },
  {
    label: "Hydrate and refuel",
    details: "Rehydrate and eat something with carbs + protein for best muscle repair."
  }
];

export default function CoolDown() {
  const [checked, setChecked] = useState(Array(cooldownSteps.length).fill(false));
  const [showDetail, setShowDetail] = useState(Array(cooldownSteps.length).fill(false));

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

  const resetCooldown = () => {
    setChecked(Array(cooldownSteps.length).fill(false));
    setShowDetail(Array(cooldownSteps.length).fill(false));
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        🧘‍♂️ Cool Down
      </Heading>
      <VStack align="stretch" spacing={3}>
        {cooldownSteps.map((step, i) => (
          <Box key={i} borderRadius="md" bg={checked[i] ? "blue.50" : undefined} p={2}>
            <Checkbox
              isChecked={checked[i]}
              onChange={() => handleCheck(i)}
              colorScheme="blue"
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
                colorScheme="cyan"
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
      <Button mt={4} colorScheme="blue" size="sm" onClick={resetCooldown}>
        Reset
      </Button>
      <Text mt={5} fontSize="sm" color="gray.500">
        Cool downs aid recovery and help prevent soreness. Even the pros do it!
      </Text>
    </Box>
  );
}
