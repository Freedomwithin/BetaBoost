import React from "react";

function TrainingPlans() {
    const handlePremiumClick = async () => {
        const response = await fetch("http://localhost:4242/create-checkout-session", {
            method: "POST",
        });

        const data = await response.json();

        if (data.url) {
            window.location = data.url; // Redirect to Stripe checkout
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Training Plans</h2>
            <p>Unlock premium weekly and monthly climbing routines tailored to your goals.</p>

            <button onClick={handlePremiumClick} style={{ marginTop: "1rem", padding: "10px 20px" }}>
                🔒 Unlock Premium Plans
            </button>
        </div>
    );
}

export default TrainingPlans;
