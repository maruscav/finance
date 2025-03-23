// Function to calculate the total for each column
function updateTotal() {
  const months = [
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
  ];

  // Initialize totals
  let totals = {
    fuel: 0,
    health: 0,
    general: 0,
    groceries: 0,
    travel: 0,
    coffee: 0,
    clothes: 0,
    misc: 0,
    tradeville: 0,
    trading212: 0,
  };

  // Loop through each month and calculate the sum for each category
  months.forEach((month) => {
    totals.fuel +=
      parseFloat(document.getElementById(`fuel${month}`)?.value) || 0;
    totals.health +=
      parseFloat(document.getElementById(`health${month}`)?.value) || 0;
    totals.general +=
      parseFloat(document.getElementById(`general${month}`)?.value) || 0;
    totals.groceries +=
      parseFloat(document.getElementById(`groceries${month}`)?.value) || 0;
    totals.travel +=
      parseFloat(document.getElementById(`travel${month}`)?.value) || 0;
    totals.coffee +=
      parseFloat(document.getElementById(`coffee${month}`)?.value) || 0;
    totals.clothes +=
      parseFloat(document.getElementById(`clothes${month}`)?.value) || 0;
    totals.misc +=
      parseFloat(document.getElementById(`misc${month}`)?.value) || 0;
    totals.tradeville +=
      parseFloat(document.getElementById(`tradeville${month}`)?.value) || 0;
    totals.trading212 +=
      parseFloat(document.getElementById(`trading212${month}`)?.value) || 0;
  });

  // Update the totals in the table
  document.getElementById("totalFuel").value = totals.fuel.toFixed(2);
  document.getElementById("totalHealth").value = totals.health.toFixed(2);
  document.getElementById("totalGeneral").value = totals.general.toFixed(2);
  document.getElementById("totalGroceries").value = totals.groceries.toFixed(2);
  document.getElementById("totalTravel").value = totals.travel.toFixed(2);
  document.getElementById("totalCoffee").value = totals.coffee.toFixed(2);
  document.getElementById("totalClothes").value = totals.clothes.toFixed(2);
  document.getElementById("totalMisc").value = totals.misc.toFixed(2);
  document.getElementById("totalTradeville").value =
    totals.tradeville.toFixed(2);
  document.getElementById("totalTrading212").value =
    totals.trading212.toFixed(2);
}

// Wait for the DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all input fields to update totals when the value changes
  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.addEventListener("input", updateTotal);
  });

  // Initial calculation when the page loads
  updateTotal();
});

// Update Spending Chart and calculate P/L
function updateSpendingChart() {
  const SpendingData = {
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

    SpendingData.Crypto.push(crypto);
    SpendingData.Trading212.push(trading212);
    SpendingData.BT.push(bt);
  }

  if (spendingChart) spendingChart.destroy();

  const ctx = document.getElementById("spendingChart").getContext("2d");
  spendingChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Crypto ($)",
          data: SpendingData.Crypto,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Trading212 ($)",
          data: SpendingData.Trading212,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },

        {
          label: "BT ($)",
          data: SpendingData.BT,
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
// Download Spending Data as a JSON file
function downloadSpendingData() {
  const SpendingData = [];
  for (let i = 1; i <= 12; i++) {
    SpendingData.push({
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
  const dataStr = JSON.stringify(SpendingData);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SpendingData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Upload Spending Data from a JSON file
function uploadSpendingData(event) {
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
        updateSpendingChart(); // Update the chart with the uploaded data
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
