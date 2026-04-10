// background.js
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Padinjavier/product-search-extension/refs/heads/main/";
let currentVersion = "1.0.0";

async function checkForUpdates() {
    console.log("🔍 Verificando actualizaciones...");
    
    try {
        const response = await fetch(GITHUB_RAW_URL + "version.json?t=" + Date.now());
        
        if (!response.ok) {
            console.log(`⚠️ Error HTTP: ${response.status}`);
            return;
        }
        
        const data = await response.json();
        console.log(`📦 Versión remota: ${data.version}, Local: ${currentVersion}`);
        
        if (data.version !== currentVersion) {
            console.log(`🎉 Nueva versión disponible: ${data.version}`);
            
            // Solo guardar la nueva versión, NO descargar el código
            await chrome.storage.local.set({ 
                extensionVersion: data.version,
                lastUpdate: Date.now()
            });
            
            currentVersion = data.version;
            
            // Recargar todas las pestañas para que usen el nuevo content.js
            const tabs = await chrome.tabs.query({ url: "https://businessmanagementweb.herokuapp.com/*" });
            console.log(`🔄 Recargando ${tabs.length} pestaña(s) para aplicar actualización...`);
            for (const tab of tabs) {
                chrome.tabs.reload(tab.id);
            }
        }
    } catch (error) {
        console.log("⚠️ Error:", error.message);
    }
}

// Verificar al iniciar y cada hora
checkForUpdates();
setInterval(checkForUpdates, 60 * 60 * 1000);