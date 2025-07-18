// src/components/ProgressTab.jsx

import { Box, Heading, Stat, StatLabel, StatNumber, StatGroup, List, ListItem, Badge, Divider, Text } from "@chakra-ui/react";

function hardestGrade(logs) {
    // Simplistic: returns "highest" by string (custom logic possible)
    if (!logs.length) return "-";
    // Example for V grades
    const vGrades = logs
        .map(l => l.grade)
        .filter(g => /^V\d+/.test(g))
        .map(g => +g.replace("V", ""));
    return vGrades.length ? "V" + Math.max(...vGrades) : logs[0].grade;
}

function styleBreakdown(logs) {
    const styles = {};
    logs.forEach(l => {
        styles[l.style] = (styles[l.style] || 0) + 1;
    });
    return styles;
}

export default function ProgressTab({ climbLogs }) {
    const total = climbLogs.length;
    const styles = styleBreakdown(climbLogs);
    const mostFrequentStyle = Object.entries(styles)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    return (
        <Box>
            <Heading size="md" mb={4} color="black">Progress & Analytics</Heading>
            {total === 0 ? (
                <Text color="gray.500" fontStyle="italic">No climbs yet. Start logging to track your progress!</Text>
            ) : (
                <>
                    <StatGroup>
                        <Stat>
                            <StatLabel>Total Climbs</StatLabel>
                            <StatNumber>{total}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Favorite Style</StatLabel>
                            <StatNumber>{mostFrequentStyle}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Hardest Grade</StatLabel>
                            <StatNumber>{hardestGrade(climbLogs)}</StatNumber>
                        </Stat>
                    </StatGroup>
                    <Divider my={4} />
                    <Heading size="sm" mb={2} color="black">Recent Climbs</Heading>
                    <List spacing={2}>
                        {climbLogs.slice(0, 5).map((log, i) => (
                            <ListItem key={i}>
                                <Badge colorScheme="teal">{log.grade}</Badge>{" "}
                                {log.style && <Badge colorScheme="blue">{log.style}</Badge>}{" "}
                                <Text as="span" fontSize="sm" color="gray.600">({log.date})</Text>
                                {log.type && (
                                    <Text as="span" fontSize="xs" color="gray.500"> [{log.type}]</Text>
                                )}
                                {log.notes && (
                                    <Text as="span" fontSize="xs" color="gray.400"> - {log.notes}</Text>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Divider my={4} />
                    <Heading size="sm" mb={2} color="black">Style Breakdown</Heading>
                    <List>
                        {Object.entries(styles).map(([style, count], i) => (
                            <ListItem key={i}>
                                <Badge colorScheme="blue">{style}</Badge>: {count}
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
}
