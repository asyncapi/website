# Define the root folder
$rootFolder = "scripts"

# Get all .js files recursively
$jsFiles = Get-ChildItem -Path $rootFolder -Recurse -Filter "*.js"

# Loop through each .js file and run the git mv command
foreach ($file in $jsFiles) {
    # Construct the new file name with .ts extension
    $newFileName = $file.FullName -replace "\.js$", ".ts"

    # Execute the git mv command
    git mv $file.FullName $newFileName
}
