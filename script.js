function calculateCompoundInterest(principal, rate, time, compounds) {
    const r = rate / 100; // Convert percentage to decimal
    return principal * Math.pow(1 + r/compounds, compounds * time);
}

function generateSchedule(principal, rate, years, compounds) {
    const schedule = [];
    for (let year = 0; year <= years; year++) {
        const balance = calculateCompoundInterest(principal, rate, year, compounds);
        schedule.push([year, balance]);
    }
    return schedule;
}

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseInt(document.getElementById('time').value);
    const compounds = parseInt(document.getElementById('compounds').value);

    const finalAmount = calculateCompoundInterest(principal, rate, time, compounds);

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p>Initial Investment: $${principal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        <p>Interest Rate: ${rate}%</p>
        <p>Time Period: ${time} years</p>
        <p>Compounding Frequency: ${compounds} times per year</p>
        <p>Final Amount: $${finalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
    `;

    // Generate and display schedule
    const schedule = generateSchedule(principal, rate, time, compounds);
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