yarn build
echo "node build/index.js" > scripts/phone-screenshot
chmod +x scripts/phone-screenshot

ln -s ~/Programming/scripts/phone-screenshot /usr/local/bin/phone-screenshot