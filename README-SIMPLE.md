# 🚫 Substack Sidebar Blocker

A completely rewritten, simple and effective Chrome extension that blocks the "Up Next" and "Trending" sections on Substack.

## ✨ Features

- **Simple and effective** approach
- **Reliable blocking** of recommendation sections
- **Preserves navigation** completely
- **Lightweight and fast**

## 🚀 Installation

### Step 1: Load Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select this `substack-cleaner` folder
5. Click "Select"

### Step 2: Test It
1. Open `test.html` in your browser
2. The right sidebar should disappear
3. Navigation links should remain visible
4. Visit https://substack.com/home
5. The "Up Next" and "Trending" sections should be gone

## 🔧 How It Works

The extension uses three simple methods:

1. **Text Detection**: Finds elements containing "Up Next", "Trending", or "See all"
2. **CSS Selectors**: Targets recommendation-related classes and attributes
3. **Content Analysis**: Hides elements with recommendation content

## 📁 Files

- `manifest.json` - Extension configuration
- `styles.css` - CSS to hide recommendation sections
- `script.js` - JavaScript logic
- `test.html` - Test page
- `README.md` - This file

## 🧪 Testing

**Test with the included test page:**
1. Open `test.html` in your browser
2. Load the extension in Chrome
3. Refresh the test page
4. The right sidebar should be hidden
5. Navigation should remain visible

## 🐛 Debugging

**Check if it's working:**
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for messages starting with "🚫 Substack Sidebar Blocker"
4. You should see logs about hidden elements

**If not working:**
- Make sure Developer mode is enabled
- Try reloading the extension
- Check the console for error messages
- Test with the included test page first

## 🎯 What It Blocks

✅ "Up Next" recommendation sections  
✅ "Trending" sections  
✅ "See all" links in recommendations  
✅ Recommendation-related CSS classes  
✅ Recommendation aria-labels and data attributes  

## 🛡️ What It Preserves

✅ All navigation buttons  
✅ All navigation links  
✅ Main navigation menu  
✅ Profile links  
✅ Settings and other functional elements  

## 🔄 Updates

This is a completely rewritten version that should be much more reliable. If you still have issues:

1. **Check the console** for "🚫" messages
2. **Try the test page** to verify the extension works
3. **Reload the extension** if needed

The new version is much simpler and should work consistently! 🎉
