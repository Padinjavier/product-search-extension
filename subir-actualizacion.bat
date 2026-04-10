@echo off
echo ========================================
echo  Subiendo actualizacion de extension
echo ========================================
echo.

set /p version="Nueva version (ej: 1.0.2): "

echo {> version.json
echo   "version": "%version%",>> version.json
echo   "min_extension_version": "1.0.0",>> version.json
echo   "changelog": "Actualizacion automatica",>> version.json
echo   "files": {>> version.json
echo     "content.js": "https://raw.githubusercontent.com/Padinjavier/mi-extension-updates/main/content.js",>> version.json
echo     "updater.js": "https://raw.githubusercontent.com/Padinjavier/mi-extension-updates/main/updater.js">> version.json
echo   }>> version.json
echo }>> version.json

echo.
echo Actualizando archivos...
git add .
git commit -m "Version %version%"
git push origin main

echo.
echo ========================================
echo ✅ Actualizacion subida!
echo Los usuarios se actualizaran automaticamente
echo ========================================
pause