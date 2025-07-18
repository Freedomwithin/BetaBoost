import React, { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi climber! I'm your personal support bot. Tell me what you're working on or struggling with — let's level up your game! 🧗‍♂️💪",
    },
  ]);
  const [input, setInput] = useState("");
  const [userWeakness, setUserWeakness] = useState(null);

  // Smarter AI logic: emotion, struggle, motivation
  function getBotReply(userText) {
    const txt = userText.toLowerCase();
    let reply = "";

    // BASIC CONVERSATION STARTERS
    if (txt.includes("hi") || txt.includes("hello")) {
      return "Hey there! What's going on in your climbing lately?";
    }

    // MOTIVATIONAL / EMOTIONAL RESPONSES
    if (txt.includes("scared") || txt.includes("afraid")) {
      return "It’s okay to feel scared! Are you more nervous on overhangs or runs where you’re high off the ground?";
    }

    // DETECT SPECIFIC STRUGGLES
    if (txt.includes("grip") || txt.includes("fingers")) {
      setUserWeakness("grip");
      return "Finger strength is a long game. Try dead-hangs or limit boulders on small edges. Want help designing a grip routine?";
    }
    if (txt.includes("footwork")) {
      setUserWeakness("footwork");
      return "Footwork takes attention! Try Silent Feet or Eyes-Closed Feet drills to level up. Want me to suggest some?";
    }
    if (txt.includes("core") || txt.includes("body tension")) {
      setUserWeakness("core");
      return "Core is key! Planks, L-sits, and one-arm moves can make a huge difference. Need a weekly plan?";
    }
    if (txt.includes("endurance")) {
      setUserWeakness("endurance");
      return "Endurance comes with time. ARC sessions and 4x4s help. Want a sample endurance day plan?";
    }
    if (txt.includes("injury") || txt.includes("hurt")) {
      return "First — rest and don’t rush it. Recovery is training too. Is it related to fingers, shoulders, or something else?";
    }

    // WEAKNESS FOLLOW-UP HINTING
    if (txt.includes("i'm good at") || txt.includes("i like") || txt.includes("i prefer")) {
      if (userWeakness) {
        return `That's awesome — but don't forget to work on your ${userWeakness} too 😉. Want help tackling it with a fun drill?`;
      } else {
        return `Nice! What do you think you're *not yet* good at? That can unlock huge gains. Want to explore that?`;
      }
    }

    // IF USER ASK GENERAL THING
    if (txt.includes("what should") && txt.includes("do")) {
      return "Let’s figure that out — what's your current goal: Send a grade? Improve a skill? Avoid burning out?";
    }

    if (txt.includes("progress") || txt.includes("stuck")) {
      return "Plateauing happens to every climber. The trick is consistency + attacking your weak points. Want a creative drill suggestion?";
    }

    // CATCHALL
    reply = "Hmm… I'm feeling your energy. Want to focus today on power, technique, or mindset?";
    return reply;
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botReply = getBotReply(input);
    const botMsg = { role: "assistant", text: botReply };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  }

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
                {m.role === "user" ? "You" : "AI"}:
              </Text>{" "}
              <Text as="span">{m.text}</Text>
            </Box>
          ))}
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
            placeholder="Ask me anything about your climbing..."
            bg="white"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button mt={2} colorScheme="teal" onClick={sendMessage} w="100%">
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
