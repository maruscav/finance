// On page load, show the dashboard and hide others
window.onload = function () {
  navigateToDashboardPage(); // Show dashboard by default
};

// Corrected function names and logic
function navigateToPage() {
  const selectedPage = document.getElementById("pageSelect").value;
  if (selectedPage === "income") {
    document.getElementById("incomePage").style.display = "block";
    document.getElementById("investmentPage").style.display = "none";
    document.getElementById("spendingPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "none";
  } else if (selectedPage === "investment") {
    document.getElementById("incomePage").style.display = "none";
    document.getElementById("investmentPage").style.display = "block";
    document.getElementById("spendingPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "none";
  } else if (selectedPage === "spending") {
    document.getElementById("incomePage").style.display = "none";
    document.getElementById("investmentPage").style.display = "none";
    document.getElementById("spendingPage").style.display = "block";
    document.getElementById("dashboardPage").style.display = "none";
  } else if (selectedPage === "dashboard") {
    document.getElementById("incomePage").style.display = "none";
    document.getElementById("investmentPage").style.display = "none";
    document.getElementById("spendingPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";

    updateIncomeChart(); // Update the chart on the dashboard when it's displayed
  }
}
let incomeChart, investmentChart, spendingChart;

function navigateToDashboardPage() {
  document.getElementById("incomePage").style.display = "none";
  document.getElementById("investmentPage").style.display = "none";
  document.getElementById("spendingPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
}
