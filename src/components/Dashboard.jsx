import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const recentClimbs = [
  { grade: "V4", style: "Redpoint", date: "2025-07-12" },
  { grade: "V6", style: "Flash", date: "2025-07-10" },
  { grade: "V5", style: "Onsight", date: "2025-07-08" },
];

export default function Dashboard() {
  return (
    <Box>
      <Heading size="md" mb={4} color="black">
        Dashboard
      </Heading>
      <List spacing={3}>
        {recentClimbs.map((climb, i) => (
          <ListItem key={i} borderBottom="1px" borderColor="gray.100" pb={2}>
            <Text color="black">
              <b>{climb.grade}</b> — {climb.style}
              <Text as="span" color="gray.500" fontSize="sm" ml={2}>
                ({climb.date})
              </Text>
            </Text>
          </ListItem>
        ))}
      </List>
      <Text fontSize="sm" mt={5} color="gray.500">
        Push your limits thoughtfully to maximize gains and avoid injury!
      </Text>
    </Box>
  );
}
