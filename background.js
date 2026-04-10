// background.js - Service Worker para actualizaciones automáticas
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Padinjavier/product-search-extension/main/";
let currentVersion = "1.0.0";

async function checkForUpdates() {
    console.log("🔍 Verificando actualizaciones...");
    
    try {
        const response = await fetch(GITHUB_RAW_URL + "version.json");
        const data = await response.json();
        
        if (data.version !== currentVersion) {
            console.log(`🎉 Nueva versión disponible: ${data.version}`);
            
            // Descargar nuevo content.js
            const contentResponse = await fetch(GITHUB_RAW_URL + "content.js");
            const newContent = await contentResponse.text();
            
            // Guardar en storage
            await chrome.storage.local.set({ 
                updatedContent: newContent,
                extensionVersion: data.version,
                lastUpdate: Date.now()
            });
            
            currentVersion = data.version;
            console.log(`✅ Actualizado a versión ${data.version}`);
            
            // Recargar pestañas
            const tabs = await chrome.tabs.query({ url: "https://businessmanagementweb.herokuapp.com/*" });
            tabs.forEach(tab => chrome.tabs.reload(tab.id));
        }
    } catch (error) {
        console.log("Error verificando actualizaciones:", error);
    }
}

// Verificar al iniciar y cada hora
checkForUpdates();
setInterval(checkForUpdates, 60 * 60 * 1000);