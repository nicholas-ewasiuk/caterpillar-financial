document.addEventListener('input', updateCircle);

function updateCircle(event) {
  console.clear();
  const scale = 100;

  let revenueCount = 3;
  let expenseCount = 3;

  let totalRevenue = 0;
  let totalExpense = 0;

  let inputNumber;
  let amount = 0;

  let circleRadius;

  for (let i = 0; i < revenueCount; i++) {
    inputNumber = document.getElementById(`number-revenue-${i+1}`)
    amount = Number(inputNumber.value);
    totalRevenue += amount;
  }
  for (let i = 0; i < expenseCount; i++) {
    inputNumber = document.getElementById(`number-expense-${i+1}`)
    amount = Number(inputNumber.value);
    totalExpense += amount;
  }

  if (totalExpense > totalRevenue) {
    circleRadius = 100 * (totalExpense - totalRevenue) / totalExpense;
  } else if (totalRevenue > totalExpense) {
    circleRadius = 100 * (totalRevenue - totalExpense) / totalRevenue;
  }

  const circle = document.getElementById('circle-visual');

  circle.setAttribute('r', `${circleRadius}`);

  console.log(`revenue: ${totalRevenue} expense: ${totalExpense} radius: ${circleRadius}`);
}