# Component Reorganization Script
Write-Host "Starting component reorganization..." -ForegroundColor Cyan

# Create directories if they don't exist
$directories = @(
    "src\components\layout",
    "src\components\charts",
    "src\components\cards",
    "src\components\modals",
    "src\components\filters"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# Define file moves
$moves = @(
    # Layout components
    @{From="src\components\Sidebar.tsx"; To="src\components\layout\Sidebar.tsx"},
    @{From="src\components\DashboardHeader.tsx"; To="src\components\layout\DashboardHeader.tsx"},
    
    # Chart components
    @{From="src\components\OverviewCharts.tsx"; To="src\components\charts\OverviewCharts.tsx"},
    @{From="src\components\StudentCharts.tsx"; To="src\components\charts\StudentCharts.tsx"},
    @{From="src\components\DashboardTooltip.tsx"; To="src\components\charts\DashboardTooltip.tsx"},
    
    # Card components
    @{From="src\components\StatCard.tsx"; To="src\components\cards\StatCard.tsx"},
    
    # Modal components
    @{From="src\components\StudentModal.tsx"; To="src\components\modals\StudentModal.tsx"},
    
    # Filter components
    @{From="src\components\TimeFilter.tsx"; To="src\components\filters\TimeFilter.tsx"},
    @{From="src\components\StudentSearch.tsx"; To="src\components\filters\StudentSearch.tsx"},
    @{From="src\components\FilterButton.tsx"; To="src\components\filters\FilterButton.tsx"}
)

# Execute moves
foreach ($move in $moves) {
    if (Test-Path $move.From) {
        Move-Item -Path $move.From -Destination $move.To -Force
        Write-Host "Moved: $($move.From) -> $($move.To)" -ForegroundColor Green
    } else {
        Write-Host "File not found: $($move.From)" -ForegroundColor Yellow
    }
}

Write-Host "`nReorganization complete!" -ForegroundColor Cyan
Write-Host "Next step: Update import paths in the moved files." -ForegroundColor Yellow
