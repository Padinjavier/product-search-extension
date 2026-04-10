// background.js - URL corregida
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Padinjavier/product-search-extension/refs/heads/main/";
let currentVersion = "1.0.0";

async function checkForUpdates() {
    console.log("🔍 Verificando actualizaciones...");
    
    try {
        // Usar la URL con refs/heads/main para evitar caché
        const response = await fetch(GITHUB_RAW_URL + "version.json");
        
        if (!response.ok) {
            console.log(`⚠️ Error HTTP: ${response.status}`);
            return;
        }
        
        const data = await response.json();
        console.log(`📦 Versión remota: ${data.version}, Local: ${currentVersion}`);
        
        if (data.version !== currentVersion) {
            console.log(`🎉 Nueva versión disponible: ${data.version}`);
            
            const contentResponse = await fetch(GITHUB_RAW_URL + "content.js");
            const newContent = await contentResponse.text();
            
            await chrome.storage.local.set({ 
                updatedContent: newContent,
                extensionVersion: data.version,
                lastUpdate: Date.now()
            });
            
            currentVersion = data.version;
            console.log(`✅ Actualizado a versión ${data.version}`);
            
            const tabs = await chrome.tabs.query({ url: "https://businessmanagementweb.herokuapp.com/*" });
            tabs.forEach(tab => chrome.tabs.reload(tab.id));
        } else {
            console.log("✅ Ya estás en la última versión");
        }
    } catch (error) {
        console.log("⚠️ Error:", error.message);
    }
}

checkForUpdates();
setInterval(checkForUpdates, 60 * 60 * 1000);