import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

// ✅ MUST BE CALLED FIRST!
dotenv.config();

const app = express();
const port = 4242;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Must NOT be undefined!

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: "your_stripe_price_id", // FROM STRIPE DASHBOARD
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });
        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4242, () => console.log("Stripe server running on 4242"));
