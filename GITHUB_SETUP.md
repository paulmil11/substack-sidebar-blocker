# 🚀 GitHub Setup Guide

## Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** in the top-right corner
3. **Select "New repository"**
4. **Repository name:** `substack-sidebar-blocker`
5. **Description:** `Chrome extension to block Substack recommendation sections`
6. **Make it Public** (so others can use it)
7. **Don't initialize** with README (we already have one)
8. **Click "Create repository"**

## Push Your Code

After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/substack-sidebar-blocker.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Repository Structure

Your repository will contain:
- `manifest.json` - Extension configuration
- `script.js` - Main JavaScript logic  
- `styles.css` - CSS to hide recommendations
- `test.html` - Test page
- `README.md` - Documentation
- Icon files (optional)

## Next Steps

Once pushed to GitHub:
1. **Add a release** with the extension files
2. **Add topics** like: `chrome-extension`, `substack`, `productivity`, `ad-blocker`
3. **Share the repository** with others who want to use it

## Usage Instructions for Others

Users can install the extension by:
1. Downloading the repository
2. Following the installation steps in README.md
3. Loading it as an unpacked extension in Chrome

That's it! Your extension is now on GitHub and ready to share! 🎉
