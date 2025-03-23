// Update Income Chart
function updateIncomeChart() {
  const incomeData = [];
  for (let i = 1; i <= 12; i++) {
    // Retrieve income values based on month name (incomeJan, incomeFeb, etc.)
    incomeData.push(
      parseFloat(document.getElementById(`income${getMonthName(i)}`).value) || 0
    );
  }

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

  // Destroy existing chart if it exists
  if (incomeChart) incomeChart.destroy();

  const ctx = document.getElementById("incomeChart").getContext("2d");
  incomeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Income ($)",
          data: incomeData,
          backgroundColor: "rgba(54, 162, 235, 0.3)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}

// Helper function to get month name (Short format)
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

// Upload Investment Data from a JSON file
function uploadIncomeData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        data.forEach((item, i) => {
          document.getElementById(`income${item.month}`).value = item.income;
        });
        updateIncomeChart(); // Update the chart with the uploaded data
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

// Automatically update the chart when a new income data is added
function addAutoUpdateIncome() {
  // Loop through each month and add event listeners to the income inputs
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

  months.forEach((month) => {
    const input = document.getElementById(`income${month}`);
    if (input) {
      // Add event listener for input changes
      input.addEventListener("input", updateIncomeChart);
    }
  });
}

// Call this function on page load to set up automatic chart updates
window.onload = function () {
  addAutoUpdateIncome(); // Add event listeners to the inputs
  updateIncomeChart(); // Initialize the chart with any pre-existing data
};
