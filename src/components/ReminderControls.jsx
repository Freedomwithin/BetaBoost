import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

function ReminderControls() {
    const [permission, setPermission] = useState(Notification?.permission);

    const enableReminders = () => {
        if (!("Notification" in window)) {
            alert("Notifications are not supported in your browser yet.");
            return;
        }
        Notification.requestPermission().then(result => setPermission(result));
    };

    const sendReminder = () => {
        if (permission === "granted") {
            new Notification("⏰ Climbing Reminder", {
                body: "Hey! You missed your climbing day. Want to reschedule a session?",
            });
        }
    };

    return (
        <Box bg="whiteAlpha.700" borderRadius="md" p={3} mb={4} maxW="sm">
            <Button onClick={enableReminders} mr={2}>
                {permission === "granted" ? "Notifications Enabled" : "Enable Reminders"}
            </Button>
            <Button
                colorScheme="blue"
                onClick={sendReminder}
                disabled={permission !== "granted"}
            >
                Test Reminder
            </Button>
            {permission === "denied" && (
                <Text color="red.500" fontSize="sm">
                    Reminders denied in browser settings.
                </Text>
            )}
        </Box>
    );
}

export default ReminderControls;
