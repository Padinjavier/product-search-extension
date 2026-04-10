// updater.js - Carga el código actualizado
(async function() {
    const result = await chrome.storage.local.get(["updatedContent", "extensionVersion"]);
    
    if (result.updatedContent) {
        console.log(`📦 Cargando código versión: ${result.extensionVersion}`);
        eval(result.updatedContent);
    }
})();