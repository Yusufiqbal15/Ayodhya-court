# Test Vercel Backend
Write-Host "🚀 Testing Vercel Backend..." -ForegroundColor Green

$baseUrl = "https://ayodhya-court-zjs5.vercel.app"

# Test 1: Check if backend is running
Write-Host "`n📡 Test 1: Checking Backend Status..." -ForegroundColor Cyan
try {
    $statusResponse = Invoke-RestMethod -Uri "$baseUrl" -Method Get
    
    Write-Host "✅ Backend is running:" -ForegroundColor Green
    Write-Host "   Message: $($statusResponse.message)" -ForegroundColor White
    Write-Host "   Version: $($statusResponse.version)" -ForegroundColor White
    Write-Host "   Timestamp: $($statusResponse.timestamp)" -ForegroundColor White
    
} catch {
    Write-Host "❌ Backend not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Test email endpoint
Write-Host "`n📧 Test 2: Testing Email Endpoint..." -ForegroundColor Cyan
try {
    $emailData = @{
        to = "test@example.com"
        subject = "Test Email - Vercel Backend"
        html = "<h1>Test Email</h1><p>This is a test email using Vercel backend.</p>"
    }
    
    $emailResponse = Invoke-RestMethod -Uri "$baseUrl/send-email-working" -Method Post -Body ($emailData | ConvertTo-Json) -ContentType "application/json"
    
    Write-Host "✅ Email endpoint working:" -ForegroundColor Green
    Write-Host "   Success: $($emailResponse.success)" -ForegroundColor White
    Write-Host "   Message: $($emailResponse.message)" -ForegroundColor White
    if ($emailResponse.note) {
        Write-Host "   Note: $($emailResponse.note)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Email endpoint test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   This means the email endpoint needs to be deployed to Vercel" -ForegroundColor Yellow
}

Write-Host "`n🎯 SUMMARY:" -ForegroundColor Green
Write-Host "   Backend URL: $baseUrl" -ForegroundColor White
Write-Host "   If backend is running, your frontend will work!" -ForegroundColor White
Write-Host "   If email endpoint fails, you need to deploy the email code to Vercel" -ForegroundColor Yellow

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
