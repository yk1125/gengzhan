<#
T00A 参考站素材抓取与校验脚本（可复现）
- 以 assets-manifest.json 为唯一真源：逐项按「源 URL」下载，比对本地/下载结果的字节数与 SHA256。
- 纪律：单会话低频顺序抓取，每项之间 sleep 400ms；遵守 https://www.seniorweb.cn/robots.txt（User-agent: * / 空 Disallow）。
- 用法：
    # 仅校验仓库内现有文件（不联网）
    powershell -ExecutionPolicy Bypass -File fetch-and-verify.ps1 -VerifyLocalOnly
    # 重新全量下载到临时目录并与本地文件逐字节比对（约 46MB，联网）
    powershell -ExecutionPolicy Bypass -File fetch-and-verify.ps1 -OutDir .scratch-t00a\refetch
#>
[CmdletBinding()]
param(
    [string]$ManifestPath,
    [string]$RepoRoot,
    [string]$OutDir,
    [switch]$VerifyLocalOnly,
    [int]$DelayMs = 400
)

$ErrorActionPreference = 'Stop'
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ManifestPath) { $ManifestPath = Join-Path $scriptDir 'assets-manifest.json' }
if (-not $RepoRoot) { $RepoRoot = (Resolve-Path (Join-Path $scriptDir '..\..\..\..')).Path }
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
$manifest = Get-Content -LiteralPath $ManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json

function Get-Sha256([string]$Path) { (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash }

$rows = @()
$fail = 0
foreach ($item in $manifest.items) {
    $rel   = $item.'本地路径'
    $local = Join-Path $RepoRoot ($rel -replace '/', '\')
    $result = [ordered]@{ 本地路径 = $rel }

    if (-not (Test-Path -LiteralPath $local)) {
        $result.结果 = 'MISSING'
        $fail++
        $rows += [pscustomobject]$result
        continue
    }
    $len = (Get-Item -LiteralPath $local).Length
    $sha = Get-Sha256 $local
    $okLen = ($len -eq $item.'字节数')
    $okSha = ($sha -eq $item.SHA256)
    $result.字节数 = $len
    $result.SHA256 = $sha

    if ($VerifyLocalOnly) {
        if ($okLen -and $okSha -and $len -gt 0) { $result.结果 = 'OK' } else { $result.结果 = 'FAIL' }
    }
    else {
        if (-not $OutDir) { throw '-OutDir 必填（或使用 -VerifyLocalOnly 只校验仓库内文件）' }
        $target = Join-Path $OutDir ($rel -replace '/', '\')
        $targetDir = Split-Path -Parent $target
        if (-not (Test-Path -LiteralPath $targetDir)) { New-Item -ItemType Directory -Force -Path $targetDir | Out-Null }
        & curl.exe -sS --retry 3 --max-time 300 -A $ua -e 'https://www.seniorweb.cn/' -o $target $item.'源 URL'
        Start-Sleep -Milliseconds $DelayMs
        if ($LASTEXITCODE -ne 0) { $result.结果 = "CURL_FAIL($LASTEXITCODE)"; $fail++; $rows += [pscustomobject]$result; continue }
        $dLen = (Get-Item -LiteralPath $target).Length
        $dSha = Get-Sha256 $target
        $result.下载字节数 = $dLen
        $result.下载SHA256 = $dSha
        if ($okLen -and $okSha -and $dLen -eq $item.'字节数' -and $dSha -eq $item.SHA256) { $result.结果 = 'IDENTICAL' } else { $result.结果 = 'DIFF' }
    }

    if ($result.结果 -ne 'OK' -and $result.结果 -ne 'IDENTICAL') { $fail++ }
    $rows += [pscustomobject]$result
}

$rows | Format-Table -AutoSize
Write-Output ("checked=" + $manifest.items.Count + " failed=" + $fail + " mode=" + $(if ($VerifyLocalOnly) { 'local-only' } else { 'redownload' }))
if ($fail -gt 0) { exit 1 }
