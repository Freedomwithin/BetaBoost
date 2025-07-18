import React, { useState } from "react";
import { Box, VStack, Text, Input, Button } from "@chakra-ui/react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi climber! I'm here to help you get better, not just at what you enjoy, but at what will make the biggest impact. What's on your mind—do you want advice, motivation, or help working through a struggle?",
    },
  ]);
  const [input, setInput] = useState("");
  const [lastFocus, setLastFocus] = useState(null);

  function getBotReply(userText) {
    const txt = userText.toLowerCase();

    if (txt.includes("hi") || txt.includes("hello")) {
      return "Welcome back! What aspect of your climbing do you want to talk about or improve today?";
    }
    if (txt.includes("struggle") || txt.includes("problem") || txt.includes("stuck")) {
      return "Many climbers hit plateaus or avoid their weak points. What's the one thing you struggle with or avoid most? Let's tackle it together.";
    }
    if (txt.includes("burnout")) {
      return "Climbing can be intense. Remember to take rest days, celebrate progress, and keep the fun in your sessions.";
    }
    if (txt.includes("scared") || txt.includes("afraid") || txt.includes("nervous")) {
      return "It's normal to feel nervous! Fears only shrink when you face them. Is it the height, falling, or something else? Let's break it down.";
    }
    if (txt.includes("injury") || txt.includes("hurt") || txt.includes("pain")) {
      return "Please listen to your body! Focus on recovery, mobility, and technique drills that don't aggravate the area. Healing now means stronger sessions later.";
    }
    if (txt.includes("progress") || txt.includes("plateau")) {
      return "Plateaus are a sign you’re pushing your limits! Target what you avoid most and measure any improvement—no matter how small. Consistent effort will crack the plateau.";
    }

    if (
      txt.includes("i'm good at") ||
      txt.includes("i am good at") ||
      txt.includes("i like") ||
      txt.includes("i enjoy") ||
      txt.includes("favourite") ||
      txt.includes("favorite")
    ) {
      if (lastFocus) {
        return `Enjoying your strengths is important, but true progress comes from facing your weaknesses. Want to work on your ${lastFocus}?`;
      }
      return "It's great to enjoy climbing what you love. But real growth happens where you're least comfortable. Want to talk about what you avoid or dread at the gym?";
    }

    if (txt.includes("technique")) {
      setLastFocus("technique");
      return "Focusing on technique is a game-changer. Practice drills like silent feet, backsteps, or foot-swap challenges. Do you know which movement feels least natural or most insecure for you?";
    }
    if (txt.includes("strength")) {
      setLastFocus("strength");
      return "Strength comes from quality over quantity. Limit bouldering, weighted hangs, and core tension work help a lot. Need a simple routine, or advice on finger training safety?";
    }
    if (txt.includes("power")) {
      setLastFocus("power");
      return "Power is built explosively. Try double dynos, campus board moves, or big coordinated reaches. But start rested and focus on good form first to avoid injury.";
    }
    if (txt.includes("endurance")) {
      setLastFocus("endurance");
      return "Endurance grows from time-on-wall: ARC (easy, continuous climbing), 4x4s, and lap sessions help you stay in motion and recover faster. Would you like an example session or a pacing tip?";
    }
    if (txt.includes("mobility") || txt.includes("flexibility")) {
      setLastFocus("mobility");
      return "Mobility unlocks more climbable positions and injury resistance. Incorporate lower body stretches and high-step drills. Want a few favorite mobility drills?";
    }
    if (txt.includes("mental") || txt.includes("head") || txt.includes("focus")) {
      setLastFocus("mental");
      return "Mental training is often overlooked, but it's crucial. Try visualization, breathing routines, and controlled falls to master your nerves. Is fear or focus the bigger block for you?";
    }

    if (txt.includes("plan") || txt.includes("routine")) {
      if (lastFocus === "technique") {
        return "Try silent feet and backstep drills every warmup. Afterward, focus on smooth, controlled movement on at least one climb per session. Want to track your results after a week?";
      }
      if (lastFocus === "strength") {
        return "Mix two days a week of fingerboard hangs and core work with low-rep bouldering. Rest well and listen to your body. Want detailed sets and rest schedules?";
      }
      if (lastFocus === "endurance") {
        return "ARC: 2–3 sets of 15 minutes easy climbing, with 10 minutes rest between. Modify difficulty to never 'pump out.' Would you like a 4x4 protocol as well?";
      }
      if (lastFocus === "mobility") {
        return "Try including deep squats, hip opener stretches, and controlled high steps before you climb. Consistency trumps intensity with mobility!";
      }
      if (lastFocus === "power") {
        return "Schedule max power moves like campus laddering or limit boulder problems early in your session, when freshest. Space out attempts and focus on exploding through hard moves.";
      }
      if (lastFocus === "mental") {
        return "Spend a few minutes every session visualizing a send, or practice mindfulness between climbs. Try embracing stress as your body preparing for performance!";
      }
      return "Let me know what you want a plan for: strength, technique, endurance, mobility, power, or mental training.";
    }

    if (txt.includes("tip") || txt.includes("advice") || txt.includes("drill")) {
      if (lastFocus === "technique") {
        return "Drill: Repeat a climb but pause for 2 seconds on every hold before moving—forces body awareness and control. Slow equals smooth, smooth equals strong!";
      }
      if (lastFocus === "strength") {
        return "Drill: Reduce the number of holds used (eliminate easy feet or hands) to force bigger pulls and full-body engagement.";
      }
      if (lastFocus === "mental") {
        return "Tip: Before a difficult route, try box breathing (4 seconds inhale, 4 hold, 4 exhale, 4 hold) and mentally rehearse each movement.";
      }
      if (lastFocus === "endurance") {
        return "Drill: 4x4s – climb 4 problems in a row, rest 2 minutes, repeat 4 times. Focus on smooth movement and controlled breathing for each set.";
      }
      if (lastFocus === "mobility") {
        return "Tip: Use hip openers like lizard stretch before and after climbing. Try to high-step on every climb, even when it's not required.";
      }
      if (lastFocus === "power") {
        return "Try 'max blast' moves—pick one hard move per set and go all-in with perfect form. Full recovery between attempts!";
      }
      return "Let me know your main focus area (technique/strength/endurance/mobility/power/mental), and I'll share a relevant drill or tip!";
    }

    return "Tell me what you want to improve most—technique, strength, endurance, power, mobility, or mental approach? Want an actionable drill, a routine, or just some outside-the-box advice?";
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botText = getBotReply(input);
    const botMsg = { role: "assistant", text: botText };
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
                {m.role === "user" ? "You" : "Assistant"}:
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
            placeholder="Type your question, struggle, or what you want to improve..."
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
