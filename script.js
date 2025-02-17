function calculateMonthlyCompoundInterest(principal, yearlyRate, months, monthlyExpense) {
    const monthlyRate = yearlyRate / 12 / 100; // Convert yearly rate to monthly decimal
    let balance = principal;
    
    // Apply monthly compounding and subtract expenses for each month
    for (let month = 0; month < months; month++) {
        // Add monthly interest
        balance = balance * (1 + monthlyRate);
        // Subtract monthly expense
        balance = balance - monthlyExpense;
    }
    
    return Math.max(0, balance); // Prevent negative balance
}

function generateSchedule(principal, yearlyRate, years, monthlyExpense) {
    const schedule = [];
    
    for (let year = 0; year <= years; year++) {
        const months = year * 12;
        const balance = calculateMonthlyCompoundInterest(principal, yearlyRate, months, monthlyExpense);
        schedule.push([year, balance]);
    }
    return schedule;
}

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseInt(document.getElementById('time').value);
    const monthlyExpense = parseFloat(document.getElementById('monthlyExpense').value);

    const finalAmount = calculateMonthlyCompoundInterest(principal, rate, time * 12, monthlyExpense);

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p>Initial Investment: $${principal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p>Interest Rate: ${rate}%</p>
        <p>Time Period: ${time} years</p>
        <p>Monthly Expense: $${monthlyExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p>Final Amount: $${finalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
    `;

    // Generate and display schedule
    const schedule = generateSchedule(principal, rate, time, monthlyExpense);
    const scheduleDiv = document.getElementById('schedule');
    let scheduleHTML = `
        <h2>Yearly Investment Schedule</h2>
        <table>
            <tr>
                <th>Year</th>
                <th>Balance</th>
            </tr>
    `;
    
    schedule.forEach(([year, balance]) => {
        scheduleHTML += `
            <tr>
                <td>Year ${year}</td>
                <td>$${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            </tr>
        `;
    });
    
    scheduleHTML += '</table>';
    scheduleDiv.innerHTML = scheduleHTML;
}

// Calculate on page load
calculate();