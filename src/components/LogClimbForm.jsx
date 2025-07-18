import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";

export default function LogClimbForm({ onLogClimb }) {
  const [grade, setGrade] = useState("");
  const [style, setStyle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().substring(0, 10));
  const [notes, setNotes] = useState("");
  const [feltGrade, setFeltGrade] = useState("");
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    const log = {
      grade,
      style,
      type,
      date,
      notes,
      feltGrade
    };
    toast({
      title: "Climb logged!",
      description: `Grade: ${grade}, Style: ${style}, Type: ${type}, Date: ${date}`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    if (typeof onLogClimb === "function") onLogClimb(log);
    setGrade("");
    setStyle("");
    setType("");
    setNotes("");
    setFeltGrade("");
    setDate(new Date().toISOString().substring(0, 10));
  }

  return (
    <Box as="form" onSubmit={handleSubmit} bg="whiteAlpha.90" p={5} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4} color="black">
        Log a Climb
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="black">Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            size="md"
            borderRadius="xl"
            color="black"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="black">Climb Type</FormLabel>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="Select"
            size="md"
            borderRadius="xl"
            color="black"
          >
            <option value="Bouldering">Bouldering</option>
            <option value="Sport">Sport</option>
            <option value="Trad">Trad</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="black">Grade</FormLabel>
          <Input
            value={grade}
            onChange={e => setGrade(e.target.value)}
            placeholder="e.g. V5 or 5.11c"
            size="md"
            borderRadius="xl"
            color="black"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="black">Felt Grade (optional)</FormLabel>
          <Input
            value={feltGrade}
            onChange={e => setFeltGrade(e.target.value)}
            placeholder="How hard did it feel?"
            size="md"
            borderRadius="xl"
            color="black"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="black">Style</FormLabel>
          <Select
            value={style}
            onChange={e => setStyle(e.target.value)}
            placeholder="Select"
            size="md"
            borderRadius="xl"
            color="black"
          >
            <option value="Redpoint">Redpoint</option>
            <option value="Flash">Flash</option>
            <option value="Onsight">Onsight</option>
            <option value="Repeat">Repeat</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="black">Notes (optional)</FormLabel>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Beta, struggles, proud moments, conditions, etc…"
            rows={2}
            borderRadius="xl"
            color="black"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          size="md"
          fontWeight="bold"
          borderRadius="xl"
          boxShadow="sm"
          _hover={{ boxShadow: "md", filter: "brightness(1.04)" }}
          type="submit"
          isDisabled={!grade || !style || !type || !date}
        >
          Log Climb
        </Button>
      </VStack>
    </Box>
  );
}
