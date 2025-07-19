import axios from "axios";

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const MODEL_ID = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // change if needed

export async function getHFReply(userText, chatHistory = []) {
    const prompt =
        chatHistory
            .map((msg) => `${msg.role === "user" ? "You" : "Coach"}: ${msg.text}`)
            .join("\n") + `\nYou: ${userText}\nCoach:`;

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
        return generated?.replace(prompt, "").trim() || "Hmm, I’m not sure. Try rephrasing that.";
    } catch (err) {
        console.error("Hugging Face API error:", err.message);
        return "Oops! I couldn’t connect to beta central. Try again shortly.";
    }
}
