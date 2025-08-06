import React from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  SimpleGrid,
  Badge,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

// Sample static recent climbs data; replace with props or context as needed
const recentClimbs = [
  { grade: "V4", style: "Redpoint", date: "2025-07-12" },
  { grade: "V6", style: "Flash", date: "2025-07-10" },
  { grade: "V5", style: "Onsight", date: "2025-07-08" },
];

export default function Dashboard() {
  const textColor = useColorModeValue("gray.900", "gray.100");

  // Extract the highest grade number from recent climbs (e.g., from "V6" extract 6)
  const topGradeNumber = recentClimbs.length
    ? Math.max(...recentClimbs.map((c) => parseInt(c.grade.slice(1))))
    : 0;

  return (
    <Box>
      <Heading size="md" mb={4} color={textColor}>
        Dashboard
      </Heading>

      {/* Summary Stats */}
      <SimpleGrid columns={[1, null, 2]} spacing={4} mb={4}>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {recentClimbs.length}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Sessions
          </Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {topGradeNumber > 0 ? `V${topGradeNumber}` : "N/A"}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Top Grade
          </Text>
        </Box>

        {/* Placeholder for future stats, e.g., streak */}
        {/* <Box>
          <Text fontWeight="bold" fontSize="lg">🔥 3-day</Text>
          <Text fontSize="sm" color="gray.500">Streak</Text>
        </Box> */}
      </SimpleGrid>

      {/* Button to log a new session */}
      <Button colorScheme="blue" mb={5}>
        Log New Session
      </Button>

      {/* Recent Climbs List */}
      <List spacing={3}>
        {recentClimbs.map((climb) => (
          <ListItem
            key={`${climb.date}-${climb.grade}-${climb.style}`}
            borderBottom="1px"
            borderColor="gray.100"
            pb={2}
          >
            <Box display="flex" alignItems="center">
              <Badge colorScheme="blue" mr={2}>
                {climb.grade}
              </Badge>
              <Text color={textColor}>{climb.style}</Text>
              <Text as="span" color="gray.500" fontSize="sm" ml={2}>
                ({climb.date})
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>

      <Text fontSize="sm" mt={5} color="gray.500">
        Push your limits thoughtfully to maximize gains and avoid injury!
      </Text>
    </Box>
  );
}
