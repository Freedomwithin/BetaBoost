import React, { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I am here to support your journey! Feel free to ask questions, tips, or struggles" }
  ]);
  const [input, setInput] = useState("");

  // Basic "AI" logic: checks keywords
  function getBotReply(userText) {
    const txt = userText.toLowerCase();

    if (txt.includes("hard")) {
      return "Climbing can be tough! Remember, every challenge is a chance to grow. Keep practicing, break the problem down, and don't give up!";
    }
    if (txt.includes("v4")) {
      return "V4s can feel hard for many climbers. Stay consistent with your training, work on technique, and soon V4 will become your warm-up!";
    }
    if (txt.includes("scared") || txt.includes("afraid")) {
      return "Feeling scared is normal! Trust your training, breathe deep, and take it one move at a time.";
    }
    if (txt.includes("progress")) {
      return "Progress takes time. Celebrate your small victories along the way!";
    }
    if (txt.includes("injury")) {
      return "Be sure to rest and recover. Listen to your body, and come back stronger!";
    }
    if (txt.includes("hi") || txt.includes("hello")) {
      return "Hello! How can I help your climbing today?";
    }
    return "I'm here to encourage you—ask anything about climbing, training, or motivation!";
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botMsg = { role: "assistant", text: getBotReply(input) };
    setMessages(msgs => [...msgs, userMsg, botMsg]);
    setInput("");
  }

  return (
    <Box p={4} maxW="420px">
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
                {m.role === "user" ? "You" : "AI"}:
              </Text>{" "}
              <Text as="span">{m.text}</Text>
            </Box>
          ))}
        </Box>
        <Box as="form" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            bg="white"
            mr={2}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <Button mt={2} colorScheme="blue" onClick={sendMessage} w="100%">
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
