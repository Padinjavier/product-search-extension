// funcion de enter para buscar mas rapido (inicio)
function initSearchListener() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {

            const searchIcon = document.querySelector("span.bx.bx-search-alt");

            if (!searchIcon) return;

            searchIcon.click();

            // 👇 La ventanita que bloquea y obliga a refrescar
            alert("Búsqueda ejecutada");
        }
    });
}

initSearchListener();
// fucion de enter para buscar mas rapido (fin)




// # función de copiar de la tabla de productos (inicio)


(function() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', agregarBotonesCopiar);
    } else {
        agregarBotonesCopiar();
    }
    
    function agregarBotonesCopiar() {
        // Seleccionar todas las filas de la tabla de productos
        const filas = document.querySelectorAll('.tbl_stock_producto tr');
        
        filas.forEach(fila => {
            // Obtener la primera celda (columna de producto)
            const celdaProducto = fila.querySelector('td:first-child');
            
            if (celdaProducto) {
                const nombreProducto = celdaProducto.textContent.trim();
                
                // Crear el botón copiar
                const botonCopiar = document.createElement('button');
                botonCopiar.innerHTML = '📋';
                botonCopiar.className = 'btn-copiar-producto';
                botonCopiar.style.cssText = `
                background-color: #4eac6d;
                color: white;
                border: none;
                border-radius: 4px;
                // padding: 4px 8px;
                // margin-left: 8px;
                font-size: 10px;
                cursor: pointer;
                // transition: all 0.3s ease;
                `;
                
                // Evento al pasar el mouse
                botonCopiar.onmouseover = () => {
                    botonCopiar.style.backgroundColor = '#3d8a57';
                };
                botonCopiar.onmouseout = () => {
                    botonCopiar.style.backgroundColor = '#4eac6d';
                };
                
                // Función para copiar
                botonCopiar.onclick = async (e) => {
                    e.stopPropagation();
                    try {
                        await navigator.clipboard.writeText(nombreProducto);
                        
                        // Feedback visual temporal
                        const textoOriginal = botonCopiar.innerHTML;
                        botonCopiar.innerHTML = '✓';
                        botonCopiar.style.backgroundColor = '#28a745';
                        
                        setTimeout(() => {
                            botonCopiar.innerHTML = textoOriginal;
                            botonCopiar.style.backgroundColor = '#4eac6d';
                        }, 1500);
                        
                        console.log(`✅ Copiado: ${nombreProducto}`);
                    } catch (err) {
                        console.error('Error al copiar: ', err);
                        // Fallback para navegadores antiguos
                        const textarea = document.createElement('textarea');
                        textarea.value = nombreProducto;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        
                        botonCopiar.innerHTML = '✓';
                        setTimeout(() => {
                            botonCopiar.innerHTML = '📋';
                        }, 1500);
                    }
                };
                
                // Agregar el botón dentro de la celda del producto
                celdaProducto.appendChild(botonCopiar);
                
                // Ajustar el estilo de la celda para mejor visualización
                celdaProducto.style.display = 'flex';
                celdaProducto.style.alignItems = 'center';
                celdaProducto.style.justifyContent = 'center';
                celdaProducto.style.gap = '8px';
                celdaProducto.style.flexWrap = 'wrap';
            }
        });
        
        console.log('✅ Botones "Copiar" agregados a todos los productos');
    }
})();

// # función de copiar de la tabla de productos (fin)


// funcion para redimensionar la tabla de productos (inicio)
(function() {
    // Buscar la columna derecha (div 3)
    const rightColumn = document.querySelector('.row .col-lg-3');
    const leftColumn = document.querySelector('.row .col-lg-9');
    
    if (!rightColumn) {
        console.error('No se encontró la columna derecha');
        return;
    }
    
    // Verificar si ya existe el botón
    if (document.getElementById('toggleColumnBtn')) {
        console.log('El botón ya existe');
        return;
    }
    
    // Crear el botón flotante
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleColumnBtn';
    toggleBtn.innerHTML = '◀ Ocultar';
    toggleBtn.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #4eac6d;
        color: white;
        border: none;
        border-radius: 8px 0 0 8px;
        padding: 12px 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        letter-spacing: 2px;
    `;
    
    // Efecto hover
    toggleBtn.addEventListener('mouseenter', () => {
        toggleBtn.style.backgroundColor = '#3d8a57';
        toggleBtn.style.padding = '14px 8px';
    });
    toggleBtn.addEventListener('mouseleave', () => {
        toggleBtn.style.backgroundColor = '#4eac6d';
        toggleBtn.style.padding = '12px 8px';
    });
    
    // Estado de la columna
    let isHidden = false;
    
    // Función para ocultar/mostrar
    toggleBtn.addEventListener('click', () => {
        if (!isHidden) {
            // Ocultar columna
            rightColumn.style.display = 'none';
            toggleBtn.innerHTML = '▶ Mostrar';
            toggleBtn.style.right = '0';
            toggleBtn.style.borderRadius = '8px 0 0 8px';
            isHidden = true;
            leftColumn.style.width = '100%';
            console.log('✅ Columna derecha ocultada');
        } else {
            // Mostrar columna
            rightColumn.style.display = '';
            toggleBtn.innerHTML = '◀ Ocultar';
            toggleBtn.style.right = '20px';
            toggleBtn.style.borderRadius = '8px 0 0 8px';
            isHidden = false;
            console.log('✅ Columna derecha visible');
            leftColumn.style.width = '75%';
        }
    });
    
    // Agregar el botón al body
    document.body.appendChild(toggleBtn);
    
    console.log('✅ Botón flotante agregado. Haz clic para ocultar/mostrar la columna derecha');
})();

// funcion para redimensionar la tabla de productos (fin)



// funcion para cambiar entre soluciones agromin y villafuertes con atajos de teclado altgr + s : soluciones agromin y altgr + v : villafuertes (inicio)


(function() {
    const empresa1 = document.querySelector('a.dropdown-item.d-block[href="/CompanyMaster/ChangeMasterCompany/1"]');
    const empresa2 = document.querySelector('a.dropdown-item.d-block[href="/CompanyMaster/ChangeMasterCompany/2"]');
    
    let altGrActive = false;
    let lastTrigger = 0;
    const delay = 500;
    
    document.addEventListener('keydown', function(event) {
        // Detectar que se presionó AltGr (Alt derecho)
        if (event.key === 'AltGraph' || event.code === 'AltRight') {
            altGrActive = true;
            event.preventDefault();
        }
        
        // Detectar que se presionó Control (parte de AltGr)
        if (event.key === 'Control') {
            // No hacemos nada, solo esperamos al AltGraph
            event.preventDefault();
        }
        
        // Si AltGr está activo y se presiona S o V
        if (altGrActive) {
            const now = Date.now();
            if (now - lastTrigger > delay) {
                // Tecla S
                if (event.key === 's' || event.key === 'S') {
                    event.preventDefault();
                    if (empresa1) {
                        empresa1.click();
                        lastTrigger = now;
                        console.log('✅ Cambiado a: Soluciones Agromin SRL');
                    }
                    altGrActive = false; // Resetear
                }
                
                // Tecla V
                if (event.key === 'v' || event.key === 'V') {
                    event.preventDefault();
                    if (empresa2) {
                        empresa2.click();
                        lastTrigger = now;
                        console.log('✅ Cambiado a: Rossana Guisela Villafuerte Garcia');
                    }
                    altGrActive = false; // Resetear
                }
            }
        }
    });
    
    // Resetear AltGr cuando se suelta la tecla
    document.addEventListener('keyup', function(event) {
        if (event.key === 'AltGraph' || event.code === 'AltRight') {
            altGrActive = false;
        }
    });
    
    console.log('✅ Atajos activados:');
    console.log('   Mantén presionado AltGr (o Ctrl izquierdo + Alt derecho) y presiona:');
    console.log('   S → Soluciones Agromin SRL');
    console.log('   V → Rossana Guisela Villafuerte Garcia');
})();

//  funcion para cambiar entre soluciones agromin y villafuertes con atajos de teclado altgr + s : soluciones agromin y altgr + v : villafuertes (fin)


//  funcion para ageegar boton para intercambiar entre soluciones agromin y villafuertes (inicio)

(function() {
    const menuButton = document.querySelector('.dropdown.dropdown-mega .btn.header-item');
    
    if (!menuButton) {
        console.error('No se encontró el botón del menú');
        return;
    }
    
    if (document.getElementById('quickSwitchBtn')) {
        console.log('El botón ya existe');
        return;
    }
    
    const linkSoluciones = document.querySelector('a.dropdown-item[href="/CompanyMaster/ChangeMasterCompany/1"]');
    const linkRossana = document.querySelector('a.dropdown-item[href="/CompanyMaster/ChangeMasterCompany/2"]');
    
    const switchBtn = document.createElement('button');
    switchBtn.id = 'quickSwitchBtn';
    switchBtn.className = 'btn btn-sm btn-success ms-2';
    switchBtn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
    switchBtn.title = 'Cambiar empresa (AltGr + C)';
    switchBtn.style.cssText = `
        border-radius: 50%;
        width: 32px;
        height: 32px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    // Tooltip con Bootstrap
    switchBtn.setAttribute('data-bs-toggle', 'tooltip');
    switchBtn.setAttribute('data-bs-placement', 'bottom');
    switchBtn.setAttribute('data-bs-title', 'Cambiar empresa');
    
    switchBtn.addEventListener('click', () => {
        const currentText = menuButton.querySelector('span')?.textContent || menuButton.textContent;
        
        if (currentText.includes('Soluciones Agromin')) {
            linkRossana?.click();
            console.log('✅ Cambiando a Rossana Guisela Villafuerte Garcia');
        } else {
            linkSoluciones?.click();
            console.log('✅ Cambiando a Soluciones Agromin SRL');
        }
    });
    
    menuButton.appendChild(switchBtn);
    
    // Inicializar tooltip de Bootstrap
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        new bootstrap.Tooltip(switchBtn);
    }
    
    // Atajo de teclado AltGr + C
    let altGrActive = false;
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'AltGraph' || event.code === 'AltRight') {
            altGrActive = true;
            event.preventDefault();
        }
        
        if (altGrActive && (event.key === 'c' || event.key === 'C')) {
            event.preventDefault();
            switchBtn.click();
            altGrActive = false;
        }
    });
    
    document.addEventListener('keyup', function(event) {
        if (event.key === 'AltGraph' || event.code === 'AltRight') {
            altGrActive = false;
        }
    });
    
    console.log('✅ Botón de cambio agregado con icono <i class="fas fa-exchange-alt"></i>');
    console.log('   Click en el botón o presiona AltGr + C para cambiar de empresa');
})();

//  funcion para ageegar boton para intercambiar entre soluciones agromin y villafuertes (fin)


(function() {
    // ==================== CREAR BOTÓN DE ENGRANAJE ====================
    const gearBtn = document.createElement('div');
    gearBtn.id = 'reportGearBtn';
    gearBtn.innerHTML = '⚙️';
    gearBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #4eac6d;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        z-index: 99998;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    gearBtn.title = "Herramientas de Reportes";
    
    gearBtn.addEventListener('mouseenter', () => {
        gearBtn.style.transform = 'scale(1.1) rotate(45deg)';
        gearBtn.style.backgroundColor = '#3d8a57';
    });
    gearBtn.addEventListener('mouseleave', () => {
        gearBtn.style.transform = 'scale(1) rotate(0deg)';
        gearBtn.style.backgroundColor = '#4eac6d';
    });
    
    document.body.appendChild(gearBtn);
    
    // ==================== CREAR MENÚ DESPLEGABLE ====================
    const menu = document.createElement('div');
    menu.id = 'reportMenu';
    menu.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 99999;
        display: none;
        overflow: hidden;
        min-width: 180px;
    `;
    
    menu.innerHTML = `
        <div style="background: #4eac6d; color: white; padding: 8px 12px; font-size: 12px; font-weight: bold;">
            <i class="fas fa-tools"></i> Herramientas
        </div>
        <div id="menuOption1" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px;">
            <span>📅</span> <span>Reporte por fechas</span>
        </div>
        <div id="menuOption2" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px;">
        <a href="#" id="analyzeExcelLink">
            <span>📂</span>
            <span>Analizar Excel</span>
        </a>

        </div>
        <div id="menuOption3" style="padding: 10px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <span>❌</span> <span>Cerrar</span>
        </div>
        
    `;
    
    document.body.appendChild(menu);
    
    // ==================== FUNCIONES DEL MENÚ ====================
    
    // Mostrar/ocultar menú
    let menuVisible = false;
    gearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuVisible = !menuVisible;
        menu.style.display = menuVisible ? 'block' : 'none';
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!gearBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = 'none';
            menuVisible = false;
        }
    });
    
    // ==================== OPCIÓN 1: REPORTE POR FECHAS ====================
    document.getElementById('menuOption1').addEventListener('click', () => {
        menu.style.display = 'none';
        menuVisible = false;
        mostrarPanelFechas();
    });
    
    function mostrarPanelFechas() {
        // Eliminar panel si ya existe
        const panelExistente = document.getElementById('fechasPanel');
        if (panelExistente) panelExistente.remove();
        
        const panel = document.createElement('div');
        panel.id = 'fechasPanel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 100000;
            font-family: Arial, sans-serif;
        `;
        
        panel.innerHTML = `
            <div style="background: #4eac6d; color: white; padding: 12px; border-radius: 10px 10px 0 0; display: flex; justify-content: space-between;">
                <span><strong>📅 Reporte por fechas</strong></span>
                <button id="closeFechasPanel" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            <div style="padding: 15px;">
                <div style="margin-bottom: 12px;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">Local:</label>
                    <select id="fechasLocalId" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <option value="5">QUILMANA</option>
                        <option value="9">5 ESQUINAS</option>
                        <option value="2">IMPERIAL</option>
                        <option value="7">NUEVO IMPERIAL</option>
                        <option value="8">SAN VICENTE</option>
                        <option value="10">RINCONADA</option>
                        <option value="13">PUENTE CLARITA</option>
                        <option value="16">NUEVO MALA</option>
                        <option value="17">SAN ISIDRO LABRADOR</option>
                        <option value="19">TECNICO ELVIS</option>
                        <option value="18">TÉCNICO ANCELMO</option>
                        <option value="20">TIENDA SR ENRIQUE</option>
                        <option value="15">ALMACEN LA QUEBRADA</option>
                        <option value="6">SAN LUIS</option>
                        <option value="1">C.P. LA QUEBRADA</option>
                    </select>
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">Fecha Inicio:</label>
                    <input type="date" id="fechasStartDate" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="font-weight: bold; display: block; margin-bottom: 5px;">Fecha Fin:</label>
                    <input type="date" id="fechasEndDate" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div id="fechasProgress" style="font-size: 11px; color: #666; margin-bottom: 10px; display: none;"></div>
                <button id="generarReportesBtn" style="width: 100%; background: #4eac6d; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-download"></i> Generar Reportes
                </button>
                <div id="fechasResultado" style="margin-top: 10px; font-size: 12px;"></div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Cerrar panel
        document.getElementById('closeFechasPanel').addEventListener('click', () => panel.remove());
        
        // Generar reportes
        document.getElementById('generarReportesBtn').addEventListener('click', async () => {
            const localId = document.getElementById('fechasLocalId').value;
            const startDate = document.getElementById('fechasStartDate').value;
            const endDate = document.getElementById('fechasEndDate').value;
            
            if (!localId || !startDate || !endDate) {
                document.getElementById('fechasResultado').innerHTML = '<span style="color: red;">⚠️ Complete todos los campos</span>';
                return;
            }
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            const fechas = [];
            
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                fechas.push(d.toISOString().split('T')[0]);
            }
            
            const progressDiv = document.getElementById('fechasProgress');
            const resultadoDiv = document.getElementById('fechasResultado');
            progressDiv.style.display = 'block';
            
            // Descargar usando window.open (respeta la sesión)
            for (let i = 0; i < fechas.length; i++) {
                progressDiv.innerHTML = `Descargando ${i + 1}/${fechas.length}: ${fechas[i]}...`;
                const url = `https://businessmanagementweb.herokuapp.com/Report/DownloadReportSummarySaleAllDaily?localId=${localId}&date=${fechas[i]}`;
                window.open(url, '_blank');
                await new Promise(r => setTimeout(r, 800)); // Pausa para no sobrecargar
            }
            
            progressDiv.style.display = 'none';
            resultadoDiv.innerHTML = `<span style="color: green;">✅ ${fechas.length} reportes generados. Revisa las descargas.</span>`;
            
            setTimeout(() => panel.remove(), 3000);
        });
    }


 // ==================== OPCIÓN 2: ANALIZAR EXCEL ====================
    document.getElementById("analyzeExcelLink")
    .addEventListener("click", function (e) {
        e.preventDefault();
        window.open("https://padinjavier.github.io/product-search-extension/", "_blank");
    });
    
    console.log('✅ Herramienta cargada. Haz clic en el engranaje ⚙️ en la esquina inferior derecha.');
})();