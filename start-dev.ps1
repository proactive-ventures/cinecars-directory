$out = "data\server.out.log"
$err = "data\server.err.log"
if (Test-Path $out) { Remove-Item $out }
if (Test-Path $err) { Remove-Item $err }
Start-Process -FilePath "C:\Program Files\nodejs\node.exe" -ArgumentList "node_modules/next/dist/bin/next","dev","-p","3000" -RedirectStandardOutput $out -RedirectStandardError $err -WorkingDirectory "E:\Sovereign_Vault\cinecars-directory" -WindowStyle Hidden
Write-Output "launched"
