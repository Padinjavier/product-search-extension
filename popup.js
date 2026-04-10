// Elementos
const montoInput = document.getElementById('monto');
const btnSumar = document.getElementById('btnSumar');
const btnRestar = document.getElementById('btnRestar');
const baseSpan = document.getElementById('base');
const igvSpan = document.getElementById('igv');
const totalSpan = document.getElementById('total');
const copyBase = document.getElementById('copyBase');
const copyIgv = document.getElementById('copyIgv');
const copyTotal = document.getElementById('copyTotal');
const copyAllBtn = document.getElementById('copyAllBtn');

// Función para copiar texto
async function copiarTexto(texto, boton) {
    await navigator.clipboard.writeText(texto);
    const textoOriginal = boton.textContent;
    boton.textContent = '✓';
    setTimeout(() => {
        boton.textContent = textoOriginal;
    }, 1000);
}

// Calcular + IGV
btnSumar.addEventListener('click', () => {
    let monto = parseFloat(montoInput.value) || 0;
    let igv = monto * 0.18;
    let total = monto + igv;
    
    baseSpan.textContent = `S/ ${monto.toFixed(2)}`;
    igvSpan.textContent = `S/ ${igv.toFixed(2)}`;
    totalSpan.textContent = `S/ ${total.toFixed(2)}`;
});

// Calcular - IGV
btnRestar.addEventListener('click', () => {
    let totalConIgv = parseFloat(montoInput.value) || 0;
    let base = totalConIgv / 1.18;
    let igv = totalConIgv - base;
    
    baseSpan.textContent = `S/ ${base.toFixed(2)}`;
    igvSpan.textContent = `S/ ${igv.toFixed(2)}`;
    totalSpan.textContent = `S/ ${totalConIgv.toFixed(2)}`;
});

// Copiar solo BASE
copyBase.addEventListener('click', async () => {
    const texto = baseSpan.textContent;
    await copiarTexto(texto, copyBase);
});

// Copiar solo IGV
copyIgv.addEventListener('click', async () => {
    const texto = igvSpan.textContent;
    await copiarTexto(texto, copyIgv);
});

// Copiar solo TOTAL
copyTotal.addEventListener('click', async () => {
    const texto = totalSpan.textContent;
    await copiarTexto(texto, copyTotal);
});

// Copiar TODO
copyAllBtn.addEventListener('click', async () => {
    const base = baseSpan.textContent;
    const igv = igvSpan.textContent;
    const total = totalSpan.textContent;
    const texto = `${base} | IGV: ${igv} | Total: ${total}`;
    
    await navigator.clipboard.writeText(texto);
    const textoOriginal = copyAllBtn.textContent;
    copyAllBtn.textContent = '✓ Copiado!';
    setTimeout(() => {
        copyAllBtn.textContent = textoOriginal;
    }, 1500);
});

// Enter en el input
montoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnSumar.click();
    }
});