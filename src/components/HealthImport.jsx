import React, { useState } from "react";
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";

function HealthImport() {
    const [file, setFile] = useState(null);

    // Optionally handle the import action
    const handleImport = () => {
        if (!file) return;
        alert(`Ready to import: ${file.name}`);
        // TODO: add file parsing and processing logic here
    };

    return (
        <Box p={3}>
            <Heading size="sm" mb={2}>Sync Your Health Data</Heading>
            <Input
                type="file"
                accept=".xml,.csv,.json"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Button mt={2} isDisabled={!file} onClick={handleImport}>
                Import
            </Button>
            <Text mt={2} fontSize="xs" color="gray.500">
                Supports Apple Health export (.xml), Google Fit (.json/.csv), Strava .gpx
            </Text>
        </Box>
    );
}

export default HealthImport;
