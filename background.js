// background.js
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Padinjavier/product-search-extension/refs/heads/main/";
let currentVersion = "1.0.0";

async function checkAndUpdate() {
    try {
        const response = await fetch(GITHUB_RAW_URL + "version.json?t=" + Date.now());
        const data = await response.json();
        
        if (data.version !== currentVersion) {
            console.log(`🎉 Actualizando a versión ${data.version}`);
            
            const contentRes = await fetch(GITHUB_RAW_URL + "content.js?t=" + Date.now());
            const newCode = await contentRes.text();
            
            await chrome.storage.local.set({ 
                extensionCode: newCode,
                extensionVersion: data.version 
            });
            
            currentVersion = data.version;
            
            // Recargar todas las pestañas para aplicar cambios
            const tabs = await chrome.tabs.query({ url: "https://businessmanagementweb.herokuapp.com/*" });
            tabs.forEach(tab => chrome.tabs.reload(tab.id));
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// En lugar de updater.js, inyectar el código desde content.js
// Modifica tu content.js para que al inicio busque el código actualizado
checkAndUpdate();
setInterval(checkAndUpdate, 60 * 60 * 1000);