# Substack Sidebar Blocker

A simple Chrome extension that blocks the "Up Next" and "Trending" sections on Substack to minimize distractions.

## Features

- Blocks "Up Next" recommendation sections
- Blocks "Trending" sections  
- Preserves all navigation and functionality
- Lightweight and fast
- No data collection

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the `substack-cleaner` folder
6. Done! The extension will automatically block recommendation sections on Substack

## Testing

Open `test.html` in your browser to see the extension in action.

## How It Works

The extension uses simple text detection and CSS selectors to hide recommendation content while preserving all navigation elements.

## Privacy

This extension:
- Does NOT collect any data
- Does NOT send information to any server
- Only runs on Substack domains
- All processing happens locally in your browser

## License

MIT License - feel free to use and modify as needed.