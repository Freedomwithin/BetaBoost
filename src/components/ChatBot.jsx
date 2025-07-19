import React, { useState } from "react";
import { Box, VStack, Text, Input, Button } from "@chakra-ui/react";
import { getHFReply } from "./utils/hf"; // 👈 update path if this is inside src/components/

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi climber! I'm your AI coach. Want help with drills, training routines, mindset, or breaking your plateaus?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const botText = await getHFReply(input, updatedMessages);
      const botMsg = { role: "assistant", text: botText };
      setMessages([...updatedMessages, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        text: "Oops! My climbing shoes got stuck. Try again shortly.",
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} maxW="500px">
      <VStack align="stretch" spacing={2} w="100%">
        <Box
          borderWidth={1}
          borderRadius="md"
          p={3}
          bg="gray.50"
          maxH="300px"
          overflowY="auto"
          minH="150px"
        >
          {messages.map((m, idx) => (
            <Box key={idx} mb={1} textAlign={m.role === "user" ? "right" : "left"}>
              <Text
                as="span"
                fontWeight="bold"
                color={m.role === "user" ? "blue.500" : "green.600"}
              >
                {m.role === "user" ? "You" : "Coach"}:
              </Text>{" "}
              <Text as="span">{m.text}</Text>
            </Box>
          ))}
          {loading && <Text color="gray.500">⏳ Coach is thinking...</Text>}
        </Box>

        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI climbing coach anything..."
            bg="white"
          />
          <Button mt={2} colorScheme="teal" onClick={sendMessage} w="100%" isLoading={loading}>
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
