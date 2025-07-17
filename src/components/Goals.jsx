import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Goals() {
  const [goalText, setGoalText] = useState("");
  const [notes, setNotes] = useState("");
  const [goals, setGoals] = useState([]);
  const toast = useToast();

  function addGoal() {
    if (!goalText.trim()) {
      toast({
        title: "Please enter a goal",
        status: "warning",
        duration: 2000,
        isClosable: true
      });
      return;
    }
    setGoals([...goals, { text: goalText.trim(), notes: notes.trim(), completed: false }]);
    setGoalText("");
    setNotes("");
    toast({
      title: "Goal added",
      status: "success",
      duration: 2000,
      isClosable: true
    });
  }

  function toggleComplete(index) {
    const newGoals = [...goals];
    newGoals[index].completed = !newGoals[index].completed;
    setGoals(newGoals);
  }

  function removeGoal(index) {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
    toast({
      title: "Goal removed",
      status: "info",
      duration: 2000,
      isClosable: true
    });
  }

  return (
    <Box bg="whiteAlpha.90" p={5} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4} color="black">
        Goals
      </Heading>
      <VStack as="form" spacing={4} align="stretch">
        <FormControl>
          <FormLabel color="black">Goal</FormLabel>
          <Input
            placeholder="e.g. Send a V6"
            value={goalText}
            onChange={e => setGoalText(e.target.value)}
            size="md"
            borderRadius="xl"
            shadow="sm"
            focusBorderColor="blue.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
            color="black"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="black">Notes</FormLabel>
          <Textarea
            placeholder="Add any details or plan for this goal"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            borderRadius="xl"
            shadow="sm"
            focusBorderColor="blue.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
            color="black"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          mb={3}
          onClick={addGoal}
          isDisabled={!goalText.trim()}
          size="md"
          fontWeight="bold"
          borderRadius="xl"
          boxShadow="sm"
          _hover={{ boxShadow: "md", filter: "brightness(1.04)" }}
        >
          Add Goal
        </Button>
      </VStack>
      <VStack spacing={4} align="stretch" mt={6}>
        {goals.length === 0 && <Text color="gray.500">No goals added yet.</Text>}
        {goals.map((goal, idx) => (
          <Box
            key={idx}
            p={3}
            borderWidth={1}
            borderRadius="xl"
            bg={goal.completed ? "green.50" : "gray.50"}
            boxShadow="sm"
          >
            <HStack justifyContent="space-between">
              <Checkbox
                isChecked={goal.completed}
                onChange={() => toggleComplete(idx)}
                colorScheme="blue"
                borderRadius="lg"
                color="black"
              >
                <Text as={goal.completed ? "s" : undefined} fontWeight="bold" color="black">
                  {goal.text}
                </Text>
              </Checkbox>
              <IconButton
                aria-label="Remove goal"
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => removeGoal(idx)}
                borderRadius="full"
              />
            </HStack>
            {goal.notes && (
              <Text mt={2} fontSize="sm" color="black">
                {goal.notes}
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
