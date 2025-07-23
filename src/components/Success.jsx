import React, { useEffect } from "react";

function Success() {
    useEffect(() => {
        localStorage.setItem("betaBoostPremium", "true");
    }, []);

    return (
        <div style={{ padding: "3rem", textAlign: "center" }}>
            <h2>🎉 Payment Successful!</h2>
            <p>Welcome to BetaBoost Premium. Enjoy all features!</p>
        </div>
    );
}
export default Success;
