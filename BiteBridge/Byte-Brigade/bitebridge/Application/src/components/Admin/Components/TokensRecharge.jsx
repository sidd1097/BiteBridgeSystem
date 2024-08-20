import React, { useState } from "react";
import "../styles/tokensRecharge.css";
import axiosInstance from "../axiosInstance";

export default function TokensRecharge() {
  const [prnNumber, setPrnNumber] = useState("");
  const [tokens, setTokens] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handler function for the form submission
  const handleRecharge = async (e) => {
    e.preventDefault();

    // Validate PRN Number
    if (prnNumber.length !== 12 || isNaN(prnNumber)) {
      setError("PRN Number must be exactly 12 digits.");
      return;
    }

    // Validate Tokens
    if (tokens <= 0 || tokens < 50 || tokens > 10000) {
      setError("Token amount must be between 50 and 10,000.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.patch(
        `/admin/student/${prnNumber}/${tokens}`
      );
      console.log("Response Data:", response.data);

      if (response.status === 202) {
        setSuccessMessage("Recharge Successful");
        setPrnNumber("");
        setTokens("");
      } else {
        setError(`Failed to recharge tokens. Status Code: ${response.status}`);
      }
    } catch (error) {
      console.error(
        "Error during token recharge:",
        error.response ? error.response.data : error.message
      );
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recharge-form">
      <form onSubmit={handleRecharge}>
        <div>
          <label htmlFor="prnNumber">PRN Number:</label>
          <input
            type="text"
            id="prnNumber"
            value={prnNumber}
            onChange={(e) => setPrnNumber(e.target.value)}
            maxLength="12"
            placeholder="Enter PRN Number"
            pattern="\d*"
            required
          />
        </div>
        <div>
          <label htmlFor="tokens">Tokens to Recharge:</label>
          <input
            type="number"
            id="tokens"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            placeholder="Enter number of tokens"
            min="1"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button className="rechargeBtn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Recharge"}
        </button>
      </form>
    </div>
  );
}
