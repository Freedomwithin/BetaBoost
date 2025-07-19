import axios from "axios";

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const MODEL_ID = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // You can update based on tests

export async function getHFReply(_, chatHistory = []) {
    // 🧠 System primer to guide tone and behavior
    const SYSTEM_PRIMER = `You are a world-class, supportive rock climbing coach. 
You are motivational yet practical. Always give responses grounded in climbing knowledge. 
Answer clearly, based on the conversation so far. Mention drills, routines, mindset strategies, or advice that helps people improve.`;

    // 💬 Turn the full chat history into a single prompt string
    const formattedHistory = chatHistory
        .map((msg) => `${msg.role === "user" ? "User" : "Coach"}: ${msg.text}`)
        .join("\n");

    // 👇 Final prompt includes system instructions + chat + next message
    const prompt = `${SYSTEM_PRIMER}\n${formattedHistory}\nCoach:`;

    try {
        const res = await axios.post(
            `https://api-inference.huggingface.co/models/${MODEL_ID}`,
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            }
        );

        const generated = res.data?.generated_text || res.data?.[0]?.generated_text;

        // Try to remove the repeated prompt from the model's response
        return generated?.replace(prompt, "").trim() || "Hmm, I’m not sure. Can you rephrase that?";
    } catch (err) {
        console.error("Hugging Face API error:", err.message);
        return "⚠️ Sorry, I couldn't connect to beta central. Try again in a moment.";
    }
}
