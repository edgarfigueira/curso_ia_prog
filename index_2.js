let expensesData = {};

function addExpense() {
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const month = document.getElementById("expenseMonth").value;

  if (!expensesData[month]) {
    expensesData[month] = 0;
    updateMonthsList(month, amount);
  }

  expensesData[month] += amount;

  renderChart();
}

function updateMonthsList(month, amount) {
  const monthsList = document.getElementById("monthsList");
  const existingMonth = document.querySelector(
    `#monthsList li[data-month="${month}"]`
  );

  if (!existingMonth) {
    const listItem = document.createElement("li");
    listItem.textContent = `${month}: €${amount.toFixed(2)}`;
    listItem.dataset.month = month;
    monthsList.appendChild(listItem);
  } else {
    existingMonth.textContent = `${month}: €${amount.toFixed(2)}`;
  }
}

function renderChart() {
  const months = Object.keys(expensesData);
  const amounts = Object.values(expensesData);

  const options = {
    chart: {
      type: "line"
    },
    series: [
      {
        name: "Despesas",
        data: amounts
      }
    ],
    xaxis: {
      categories: months
    }
  };

  const chart = new ApexCharts(
    document.querySelector("#expensesChart"),
    options
  );
  chart.render();
}

renderChart(); // Initial rendering
