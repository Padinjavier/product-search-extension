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

// Función para extraer solo el número de un string "S/ 123.4567"
function extraerNumero(texto) {
    // Elimina "S/ " y devuelve el número como string con 5 decimales
    let numero = texto.replace('S/ ', '').trim();
    // Asegurar 5 decimales (sin redondear, solo cortar)
    if (numero.includes('.')) {
        let partes = numero.split('.');
        let decimales = partes[1].padEnd(5, '0').substring(0, 5);
        numero = `${partes[0]}.${decimales}`;
    } else {
        numero = `${numero}.00000`;
    }
    return numero;
}

// Función para copiar texto
async function copiarTexto(texto, boton) {
    await navigator.clipboard.writeText(texto);
    const textoOriginal = boton.textContent;
    boton.textContent = '✓';
    setTimeout(() => {
        boton.textContent = textoOriginal;
    }, 1000);
}

// Función para formatear con 5 decimales sin redondear (truncar)
function formatear5Decimales(valor) {
    let partes = valor.toFixed(10).split('.');
    let decimales = partes[1].substring(0, 5);
    decimales = decimales.padEnd(5, '0');
    return `${partes[0]}.${decimales}`;
}

// Calcular + IGV
btnSumar.addEventListener('click', () => {
    let monto = parseFloat(montoInput.value) || 0;
    let igv = monto * 0.18;
    let total = monto + igv;
    
    baseSpan.textContent = `S/ ${formatear5Decimales(monto)}`;
    igvSpan.textContent = `S/ ${formatear5Decimales(igv)}`;
    totalSpan.textContent = `S/ ${formatear5Decimales(total)}`;
});

// Calcular - IGV
btnRestar.addEventListener('click', () => {
    let totalConIgv = parseFloat(montoInput.value) || 0;
    let base = totalConIgv / 1.18;
    let igv = totalConIgv - base;
    
    baseSpan.textContent = `S/ ${formatear5Decimales(base)}`;
    igvSpan.textContent = `S/ ${formatear5Decimales(igv)}`;
    totalSpan.textContent = `S/ ${formatear5Decimales(totalConIgv)}`;
});

// Copiar solo BASE (solo número)
copyBase.addEventListener('click', async () => {
    const texto = extraerNumero(baseSpan.textContent);
    await copiarTexto(texto, copyBase);
});

// Copiar solo IGV (solo número)
copyIgv.addEventListener('click', async () => {
    const texto = extraerNumero(igvSpan.textContent);
    await copiarTexto(texto, copyIgv);
});

// Copiar solo TOTAL (solo número)
copyTotal.addEventListener('click', async () => {
    const texto = extraerNumero(totalSpan.textContent);
    await copiarTexto(texto, copyTotal);
});

// Copiar TODO (solo números)
copyAllBtn.addEventListener('click', async () => {
    const base = extraerNumero(baseSpan.textContent);
    const igv = extraerNumero(igvSpan.textContent);
    const total = extraerNumero(totalSpan.textContent);
    const texto = `${base} | ${igv} | ${total}`;
    
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