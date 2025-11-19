let numProc = 3,
    numRes = 3;
let allocation = [],
    maximum = [],
    available = [];

const numProcEl = document.getElementById("numProc");
const numResEl = document.getElementById("numRes");
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const checkBtn = document.getElementById("checkBtn");



numProcEl.addEventListener("change", initMatrices);
numResEl.addEventListener("change", initMatrices);
generateBtn.addEventListener("click", generateRandom);
resetBtn.addEventListener("click", reset);

function initMatrices() {
    numProc = parseInt(numProcEl.value);
    numRes = parseInt(numResEl.value);

    allocation = Array(numProc).fill().map(() => Array(numRes).fill(0));
    maximum = Array(numProc).fill().map(() => Array(numRes).fill(5));
    available = Array(numRes).fill(3);

    renderAllocationTable();
    renderMaximumTable();
    renderFinishTable();
    renderAvailableInputs();

    document.getElementById("needTable").innerHTML = "";
    document.getElementById("workTable").innerHTML = "";
    resultCard.classList.add("hidden");
}

function generateRandom() {
    // Random allocation
    allocation = allocation.map(row => row.map(() =>
        Math.floor(Math.random() * 7)
    ));

    // Random maximum (must be >= allocation)
    maximum = maximum.map((row, i) =>
        row.map((_, j) => allocation[i][j] + Math.floor(Math.random() * 5) + 1)
    );

    // Random available
    available = available.map(() => Math.floor(Math.random() * 8) + 1);

    render();
}

function reset() {
    numProcEl.value = 3;
    numResEl.value = 3;

    initMatrices();
}

function render() {
    renderAllocationTable();
    renderMaximumTable();
    renderFinishTable();
    renderAvailableInputs();
}

function renderAllocationTable() {
    let html = `<tr><th>P\\R</th>${makeHeaders()}</tr>`;
    allocation.forEach((row, i) => {
        html += `<tr><td>P${i}</td>`;
        row.forEach((v, j) =>
            html += `<td><input type="number" data-type="alloc" data-i="${i}" data-j="${j}" value="${v}"/></td>`
        );
        html += "</tr>";
    });
    document.getElementById("allocationInputTable").innerHTML = html;
    attachInputs();
}

function renderMaximumTable() {
    let html = `<tr><th>P\\R</th>${makeHeaders()}</tr>`;
    maximum.forEach((row, i) => {
        html += `<tr><td>P${i}</td>`;
        row.forEach((v, j) =>
            html += `<td><input type="number" data-type="max" data-i="${i}" data-j="${j}" value="${v}"/></td>`
        );
        html += "</tr>";
    });
    document.getElementById("maximumInputTable").innerHTML = html;
    attachInputs();
}

function renderFinishTable() {
    let html = `<tr><th>Process</th><th>Status</th></tr>`;
    for (let i = 0; i < numProc; i++) {
        html += `<tr><td>P${i}</td><td style="color:red;font-weight:600;">False</td></tr>`;
    }
    document.getElementById("finishTable").innerHTML = html;
}

function renderAvailableInputs() {
    availableInputs.innerHTML = "";
    available.forEach((v, i) => {
        availableInputs.innerHTML += `
            <div class="form-group">
                <label>Resource R${i}</label>
                <input type="number" class="availInput" data-idx="${i}" value="${v}">
            </div>`;
    });


}

function attachInputs() {
    document.querySelectorAll("[data-type]").forEach(inp => {
        inp.addEventListener("change", e => {
            const type = e.target.dataset.type;
            const i = parseInt(e.target.dataset.i);
            const j = parseInt(e.target.dataset.j);
            const v = parseInt(e.target.value) || 0;

            if (type === "alloc") allocation[i][j] = v;
            else maximum[i][j] = v;
        });
    });
}

function renderResult() {
    // ฝากทำด้วย
}

function makeHeaders() {
    return Array.from({ length: numRes }, (_, i) => `<th>R${i}</th>`).join("");
}

initMatrices();