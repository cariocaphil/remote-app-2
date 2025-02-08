import React, { useState, useEffect } from "react";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState("yearly"); // "yearly" or "monthly"
  const [futureValue, setFutureValue] = useState(null);
  const [growthProjection, setGrowthProjection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const n = compoundFrequency === "yearly" ? 1 : 12;
      const calculatedFutureValue = principal * Math.pow(1 + rate / (100 * n), n * years);
      setFutureValue(calculatedFutureValue.toFixed(2));

      // Generate a yearly breakdown for visualization
      const projection = [];
      for (let i = 1; i <= years; i++) {
        const value = principal * Math.pow(1 + rate / (100 * n), n * i);
        projection.push({ year: i, amount: value.toFixed(2) });
      }
      setGrowthProjection(projection);
      setLoading(false);
    }, 1000); // Simulated delay for calculation
  }, [principal, rate, years, compoundFrequency]);

  return (
    <div style={{ backgroundColor: "#d4edda", padding: "20px", margin: "20px 0", borderRadius: "10px" }}>
      <h2>Remote App 2: Interest Calculator</h2>
      <p>Calculate compound interest over time in <strong>EUR (€)</strong>.</p>

      <label>
        Principal (€):
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
        />
      </label>

      <br />

      <label>
        Annual Interest Rate (%):
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
        />
      </label>

      <br />

      <label>
        Years:
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
        />
      </label>

      <br />

      <label>
        Compounded:
        <select
          value={compoundFrequency}
          onChange={(e) => setCompoundFrequency(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <br />

      {loading ? (
        <p>Calculating...</p>
      ) : (
        <>
          <h3>Future Value: <span style={{ fontWeight: "bold" }}>€{futureValue}</span></h3>

          <h4>Growth Projection:</h4>
          <table style={{ width: "auto", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#c3e6cb" }}>
                <th style={{ padding: "8px", border: "1px solid black", width: "50px", textAlign: "center" }}>Yr</th>
                <th style={{ padding: "8px", border: "1px solid black", width: "120px", textAlign: "right" }}>Amount (€)</th>
              </tr>
            </thead>
            <tbody>
              {growthProjection.map((item) => (
                <tr key={item.year} style={{ backgroundColor: item.year % 2 === 0 ? "#f8f9fa" : "#ffffff" }}>
                  <td style={{ padding: "8px", border: "1px solid black", textAlign: "center" }}>{item.year}</td>
                  <td style={{ padding: "8px", border: "1px solid black", textAlign: "right" }}>€{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InterestCalculator;