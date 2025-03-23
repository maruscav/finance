// Update Investment Chart and calculate P/L
function updateInvestmentChart() {
  const investmentData = {
    Crypto: [],
    Trading212: [],
    BT: [],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 1; i <= 12; i++) {
    const crypto =
      parseFloat(document.getElementById(`crypto${getMonthName(i)}`).value) ||
      0;

    const trading212 =
      parseFloat(
        document.getElementById(`trading212${getMonthName(i)}`).value
      ) || 0;

    const bt =
      parseFloat(document.getElementById(`bt${getMonthName(i)}`).value) || 0;

    investmentData.Crypto.push(crypto);
    investmentData.Trading212.push(trading212);
    investmentData.BT.push(bt);
  }

  if (investmentChart) investmentChart.destroy();

  const ctx = document.getElementById("investmentChart").getContext("2d");
  investmentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Crypto ($)",
          data: investmentData.Crypto,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Trading212 ($)",
          data: investmentData.Trading212,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },

        {
          label: "BT ($)",
          data: investmentData.BT,
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}

// Helper function to get month name
function getMonthName(monthIndex) {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][monthIndex - 1];
}

// Download Investment Data as a JSON file
function downloadInvestmentData() {
  const investmentData = [];
  for (let i = 1; i <= 12; i++) {
    investmentData.push({
      month: getMonthName(i),
      crypto:
        parseFloat(document.getElementById(`crypto${getMonthName(i)}`).value) ||
        0,

      trading212:
        parseFloat(
          document.getElementById(`trading212${getMonthName(i)}`).value
        ) || 0,

      bt:
        parseFloat(document.getElementById(`bt${getMonthName(i)}`).value) || 0,
    });
  }
  const dataStr = JSON.stringify(investmentData);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "investmentData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Upload Investment Data from a JSON file
function uploadInvestmentData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        data.forEach((item, i) => {
          document.getElementById(`crypto${item.month}`).value = item.crypto;

          document.getElementById(`trading212${item.month}`).value =
            item.trading212;

          document.getElementById(`bt${item.month}`).value = item.bt;
        });
        updateInvestmentChart(); // Update the chart with the uploaded data
      } else {
        alert(
          "Invalid data format. Please upload a valid investment data file."
        );
      }
    } catch (error) {
      alert(
        "Error reading the uploaded file. Please ensure it's a valid JSON file."
      );
    }
  };
  reader.readAsText(file);
}

// Automatically update the chart when a new data is added
function addAutoUpdateInvestments() {
  // Loop through each month to add the event listener for each investment input
  const investments = ["crypto", "trading212", "bt"];

  investments.forEach((investment) => {
    for (let i = 1; i <= 12; i++) {
      const input = document.getElementById(`${investment}${getMonthName(i)}`);
      if (input) {
        input.addEventListener("input", function () {
          updateInvestmentChart(); // Update the chart whenever an input field is changed
        });
      }
    }
  });
}

// Call this function on page load to set up automatic chart updates
window.onload = function () {
  addAutoUpdateInvestments();
  updateInvestmentChart(); // Initialize chart with existing data
};
