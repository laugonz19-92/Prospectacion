param (
    [string]$RepoUrl,
    [string]$GitHubToken
)

$git = "C:\Users\laugo\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"

if (-not (Test-Path $git)) {
    Write-Error "No se encontró git.exe"
    exit 1
}

Write-Host "=== Subiendo Sistema de Agentes a GitHub ===" -ForegroundColor Cyan

if ($GitHubToken -and $RepoUrl) {
    # Formatear URL con Token para autenticación automática sin contraseña
    $cleanUrl = $RepoUrl -replace 'https://', ''
    $authenticatedUrl = "https://${GitHubToken}@${cleanUrl}"
    
    & $git remote remove origin 2>$null
    & $git remote add origin $authenticatedUrl
    & $git branch -M main
    & $git push -u origin main --force
    Write-Host "¡Éxito! El código ha sido subido automáticamente a GitHub." -ForegroundColor Green
} elseif ($RepoUrl) {
    & $git remote remove origin 2>$null
    & $git remote add origin $RepoUrl
    & $git branch -M main
    & $git push -u origin main
    Write-Host "¡Proceso de push finalizado!" -ForegroundColor Green
} else {
    Write-Host "Uso: .\deploy-github.ps1 -RepoUrl 'https://github.com/TU_USUARIO/TU_REPO.git' -GitHubToken 'tu_token_pat'" -ForegroundColor Yellow
}
