const pilotos = [
    { nome: "Verstappen", equipe: "Red Bull", skill: 97, pop: 90 },
    { nome: "Hamilton", equipe: "Ferrari", skill: 95, pop: 98 },
    { nome: "Leclerc", equipe: "Ferrari", skill: 92, pop: 94 },
    { nome: "Norris", equipe: "McLaren", skill: 91, pop: 88 },
    { nome: "Piastri", equipe: "McLaren", skill: 89, pop: 85 },
    { nome: "Russell", equipe: "Mercedes", skill: 90, pop: 80 },
    { nome: "Antonelli", equipe: "Mercedes", skill: 82, pop: 85 },
    { nome: "Pérez", equipe: "Cadillac", skill: 85, pop: 82 }, // F1 2024
    { nome: "Bottas", equipe: "Cadillac", skill: 84, pop: 75 }, // F1 2024
    { nome: "Alonso", equipe: "Aston Martin", skill: 91, pop: 95 },
    { nome: "Stroll", equipe: "Aston Martin", skill: 78, pop: 40 },
    { nome: "Sainz", equipe: "Williams", skill: 89, pop: 87 },
    { nome: "Albon", equipe: "Williams", skill: 85, pop: 80 },
    { nome: "Bortoleto", equipe: "Audi", skill: 81, pop: 99 }, // Torcida Brasileira!
    { nome: "Hülkenberg", equipe: "Audi", skill: 83, pop: 70 },
    { nome: "Gasly", equipe: "Alpine", skill: 84, pop: 75 },
    { nome: "Colapinto", equipe: "Alpine", skill: 80, pop: 88 },
    { nome: "Ocon", equipe: "Haas", skill: 82, pop: 50 },
    { nome: "Bearman", equipe: "Haas", skill: 80, pop: 78 },
    { nome: "Lawson", equipe: "RB", skill: 82, pop: 75 },
    { nome: "Hadjar", equipe: "Red Bull", skill: 79, pop: 60 },
    { nome: "Lindblad", equipe: "RB", skill: 78, pop: 55 }
];

let eliminados = [];
let corridaAtual = 1;
const totalCorridas = 24;

function atualizarInterface() {
    const listaVivos = document.getElementById('lista-vivos');
    listaVivos.innerHTML = pilotos.map(p => `
        <li class="piloto-item ${p.equipe === 'Cadillac' ? 'cadillac' : ''}">
            <span>${p.nome}</span> <span>${p.equipe}</span>
        </li>`).join('');

    const listaEliminados = document.getElementById('lista-eliminados');
    listaEliminados.innerHTML = eliminados.map(p => `
        <li class="piloto-item" style="color: gray;"><s>${p.nome}</s></li>`).join('');
    
    document.getElementById('info-temporada').innerText = `GP ${corridaAtual} de ${totalCorridas} | Restam ${pilotos.length} Pilotos`;
}

function proximaRodada() {
    if (pilotos.length > 3) {
        simularGPNormal();
    } else if (corridaAtual <= totalCorridas) {
        simularGrandeFinal();
    } else {
        alert("A temporada acabou!");
    }
    atualizarInterface();
}

function simularGPNormal() {
    // Calcula performance: Skill + Sorte (0 a 20)
    let resultado = pilotos.map(p => ({
        ...p,
        performance: p.skill + Math.random() * 20
    }));

    resultado.sort((a, b) => b.performance - a.performance);

    // Os 3 últimos vão para o Paredão
    let paredao = resultado.slice(-3);
    
    // Votação Popular: O que tiver menor Popularidade (pop) entre os 3 sai!
    // Simulando que o público elimina quem tem menos carisma/fãs
    paredao.sort((a, b) => a.pop - b.pop);
    let eliminado = paredao[0];

    // Remove do array de pilotos
    const index = pilotos.findIndex(p => p.nome === eliminado.nome);
    eliminados.push(pilotos.splice(index, 1)[0]);

    document.getElementById('resultado-texto').innerHTML = `
        Vencedor do GP: <b>${resultado[0].nome}</b><br>
        Paredão foi: ${paredao.map(p => p.nome).join(', ')}
    `;
    
    document.getElementById('paredao-box').classList.remove('hidden');
    document.getElementById('candidatos-paredao').innerHTML = `
        O público votou e <b>${eliminado.nome}</b> está eliminado do BBB F1!
    `;

    corridaAtual++;
}

function simularGrandeFinal() {
    document.getElementById('btn-simular').innerText = "Simular Reta Final";
    pilotos.forEach(p => {
        p.pontosFinal += Math.floor(Math.random() * 25) + p.skill/10;
    });

    let lider = [...pilotos].sort((a,b) => b.pontosFinal - a.pontosFinal);

    document.getElementById('resultado-texto').innerHTML = `
        <b>DISPUTA DE TÍTULO:</b><br>
        1º ${lider[0].nome}: ${lider[0].pontosFinal.toFixed(1)} pts<br>
        2º ${lider[1].nome}: ${lider[1].pontosFinal.toFixed(1)} pts<br>
        3º ${lider[2].nome}: ${lider[2].pontosFinal.toFixed(1)} pts
    `;

    if (corridaAtual === totalCorridas) {
        alert(`O CAMPEÃO DO BBB F1 É ${lider[0].nome}!`);
    }
    corridaAtual++;
}

atualizarInterface();