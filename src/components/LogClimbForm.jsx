import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack
} from "@chakra-ui/react";

export default function LogClimbForm() {
  const [grade, setGrade] = useState("");
  const [style, setStyle] = useState("");
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    toast({
      title: "Climb logged!",
      description: `Grade: ${grade}, Style: ${style}`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    setGrade("");
    setStyle("");
  }

  return (
    <Box as="form" onSubmit={handleSubmit} bg="whiteAlpha.90" p={5} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4} color="black">
        Log a Climb
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="black">Grade</FormLabel>
          <Input
            value={grade}
            onChange={e => setGrade(e.target.value)}
            placeholder="e.g. V5 or 5.11c"
            size="md"
            borderRadius="xl"
            shadow="sm"
            focusBorderColor="blue.400"
            _placeholder={{ color: "gray.500", fontStyle: "italic" }}
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
            shadow="sm"
            focusBorderColor="blue.400"
            color="black"
          >
            <option value="Redpoint">Redpoint</option>
            <option value="Flash">Flash</option>
            <option value="Onsight">Onsight</option>
            <option value="Repeat">Repeat</option>
          </Select>
        </FormControl>
        <Button
          colorScheme="blue"
          size="md"
          fontWeight="bold"
          borderRadius="xl"
          boxShadow="sm"
          _hover={{ boxShadow: "md", filter: "brightness(1.04)" }}
          type="submit"
          isDisabled={!grade || !style}
        >
          Log Climb
        </Button>
      </VStack>
    </Box>
  );
}
