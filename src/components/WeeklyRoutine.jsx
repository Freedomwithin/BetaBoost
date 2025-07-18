import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";

// Example climbing week data
const climbingWeek = [
  {
    day: "Monday",
    type: "Strength + Project",
    exercises: [
      "Bouldering (limit attempts on hard problems)",
      "Max hangs (fingerboard, advanced only)",
      "Core: leg raises, planks",
    ],
  },
  {
    day: "Wednesday",
    type: "Technique + Volume",
    exercises: [
      "Moderate climbs (focus on form/footwork)",
      "Footwork drills (e.g., silent feet)",
      "Antagonist: pushups, reverse wrist curls",
    ],
  },
  {
    day: "Friday",
    type: "Endurance",
    exercises: [
      "ARC: 15–20 min continuous easy climbing",
      "4x4s or circuit laps",
      "Mobility: dynamic stretching, shoulder mobility",
    ],
  },
  {
    day: "Saturday",
    type: "Varied/Outdoor/Session",
    exercises: [
      "Project outdoors or gym session",
      "Top-rope laps",
      "Grip strength: rice bucket or putty",
    ],
  },
];

export default function WeeklyRoutine() {
  return (
    <Box /* No extra p, mx, py, etc. */>
      <Heading size="md" mb={4} color="black" textAlign="center">
        Weekly Routine
      </Heading>
      {/* Use variant="unstyled" for a truly transparent table */}
      <Table variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th color="black">Day</Th>
            <Th color="black">Focus</Th>
            <Th color="black">Exercises</Th>
          </Tr>
        </Thead>
        <Tbody>
          {climbingWeek.map((session, i) => (
            <Tr key={i}>
              <Td fontWeight="bold" color="black">
                {session.day}
              </Td>
              <Td color="black">{session.type}</Td>
              <Td>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {session.exercises.map((ex, j) => (
                    <li key={j}>
                      <Text as="span" fontSize="sm" color="black">
                        {ex}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={5} fontSize="sm" color="black" textAlign="center">
        This routine balances strength, technique, and recovery. Adjust for your level. Climb hard, climb smart, and stay consistent 💪
      </Text>
    </Box>
  );
}