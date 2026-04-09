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
                padding: 4px 8px;
                margin-left: 8px;
                font-size: 11px;
                cursor: pointer;
                    transition: all 0.3s ease;
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
                // celdaProducto.style.display = 'flex';
                celdaProducto.style.alignItems = 'center';
                // celdaProducto.style.justifyContent = 'center';
                // celdaProducto.style.gap = '8px';
                // celdaProducto.style.flexWrap = 'wrap';
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