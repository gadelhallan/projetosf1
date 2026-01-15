// Dados iniciais dos pilotos com tempos em segundos (para facilitar o cálculo)
let drivers = [
    { name: "Verstappen", teamColor: "#4781D7", totalTime: 100.000 },
    { name: "Tsunoda", teamColor: "#4781D7", totalTime: 101.000 },
    { name: "Norris", teamColor: "#FF8000", totalTime: 101.100 },
    { name: "Piastri", teamColor: "#FF8000", totalTime: 101.254 },
    { name: "Leclerc", teamColor: "#ED1131", totalTime: 102.882 },
    { name: "Hamilton", teamColor: "#ED1131", totalTime: 103.430 },
    { name: "Russell", teamColor: "#6CD3BF", totalTime: 103.450 },
    { name: "Antonelli", teamColor: "#6CD3BF", totalTime: 103.800 },
    { name: "Alonso", teamColor: "#229971", totalTime: 104.100 },
    { name: "Stroll", teamColor: "#229971", totalTime: 104.600 },
    { name: "Albon", teamColor: "#1868DB", totalTime: 104.800 },
    { name: "Sainz", teamColor: "#1868DB", totalTime: 104.900 },
    { name: "Lawson", teamColor: "#6C98FF", totalTime: 105.100 },
    { name: "Hadjar", teamColor: "#6C98FF", totalTime: 105.400 },
    { name: "Ocon", teamColor: "#9C9FA2", totalTime: 105.700 },
    { name: "Bearman", teamColor: "#9C9FA2", totalTime: 105.920 },
    { name: "Gasly", teamColor: "#00A1E8", totalTime: 106.100 },
    { name: "Colapinto", teamColor: "#00A1E8", totalTime: 106.300 },
    { name: "Hulkenberg", teamColor: "#53FC18", totalTime: 106.700 },
    { name: "Bortoleto", teamColor: "#53FC18", totalTime: 107.200 }
];

function renderBoard() {
    const board = document.getElementById('timing-board');
    board.innerHTML = "";

    // Quem tem o menor tempo (chegou antes) fica no topo.
    drivers.sort((a, b) => a.totalTime - b.totalTime);

    drivers.forEach((driver, index) => {
        // Cálculo do Gap (diferença para o líder)
        let gapDisplay = index === 0 
            ? "LÍDER" 
            : `+${(driver.totalTime - drivers[0].totalTime).toFixed(3)}s`;

        const row = `
            <div class="driver-card">
                <div class="pos">${index + 1}</div>
                <div class="team-stripe" style="background-color: ${driver.teamColor}"></div>
                <div class="name">${driver.name}</div>
                <div class="gap">${gapDisplay}</div>
            </div>
        `;
        board.innerHTML += row;
    });
}

// Altera os tempos aleatoriamente, simulando a corrida
function simulateRace() {
    drivers.forEach(driver => {
        // Adiciona um valor aleatório entre 0.1 e 0.8 segundos a cada "ciclo"
        const performance = Math.random() * 0.8;
        driver.totalTime += performance;
    });

    renderBoard();
}

// Inicia o painel
renderBoard();

// Atualiza a corrida a cada 2 segundos
setInterval(simulateRace, 2000);