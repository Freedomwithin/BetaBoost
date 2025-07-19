import React from "react";

function TrainingPlans() {
    const handlePremiumClick = async () => {
        try {
            // ✅ Use public Codespaces backend URL
            const stripeUrl =
                "https://ominous-space-couscous-7v7jwv9j7px4fwv9-4242.app.github.dev/create-checkout-session";

            const response = await fetch(stripeUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("🔁 Stripe server response:", data);

            if (data.url) {
                console.log("✅ Redirecting to Stripe Checkout:", data.url);
                window.location = data.url;
            } else {
                console.warn("⚠️ Stripe did not return a URL.");
                alert("Something went wrong. Please try again or check console.");
            }
        } catch (err) {
            console.error("❌ Error contacting Stripe backend:", err);
            alert("Error connecting to server. Is your backend running?");
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Training Plans</h2>
            <p>Unlock premium weekly and monthly climbing routines tailored to your goals.</p>
            <button
                onClick={handlePremiumClick}
                style={{ marginTop: "1rem", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
                🔒 Unlock Premium Plans
            </button>
        </div>
    );
}

export default TrainingPlans;
