#!/bin/bash

echo "Installing dependencies..."

cd "slight-form-wizard"
npm install 
npm run build
echo "slight-form-wizard [x]"
cd - > /dev/null

folders=("backend" "form-page")

for folder in "${folders[@]}"; do
    cd "$folder" || { echo "Failed to navigate to $folder"; exit 1; }

    npm install || { echo "npm install failed in $folder"; exit 1; }
    
    cd - > /dev/null

    echo "$folder [x]"
done

cd "form-page"
if [ ! -f ".env" ]; then
  touch .env
  echo "VITE_API_URL=http://localhost:3000" >> .env
fi

echo "Dependencies installed successfully in all folders."