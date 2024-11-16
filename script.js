document.getElementById("themeToggle").addEventListener("click", function () {
  const body = document.body;

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    this.textContent = "🌞"; 
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    this.textContent = "🌙"; 
  }
});


document.getElementById("fareForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const duration = document.getElementById("duration").value;
  const distance = document.getElementById("distance").value;
  const rideCharge = document.getElementById("ride_charge").value;


  const rideData = {
    duration: parseFloat(duration),
    distance: parseFloat(distance),
    ride_charge: parseFloat(rideCharge),
    
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideData),
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("result").innerText = `Predicted Fare: ₹${data.predicted_fare.toFixed(2)}`;
    } else {
      document.getElementById("result").innerText = "Error: Could not fetch prediction!";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Error: Failed to connect to server.";
  }
});
