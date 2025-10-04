// Substack Cleaner - Customizable Substack cleaner
console.log('🚫 Substack Cleaner: Extension loaded');

// Get settings from storage
let settings = {
  removeTrending: true,
  removeNotifications: false
};

// Load settings and listen for changes
function loadSettings() {
  chrome.storage.sync.get(['removeTrending', 'removeNotifications'], function(result) {
    settings.removeTrending = result.removeTrending !== false; // Default to true
    settings.removeNotifications = result.removeNotifications || false;
    console.log('🚫 Settings loaded:', settings);
  });
}

// Load settings initially
loadSettings();

// Listen for settings changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    if (changes.removeTrending) settings.removeTrending = changes.removeTrending.newValue;
    if (changes.removeNotifications) settings.removeNotifications = changes.removeNotifications.newValue;
    console.log('🚫 Settings updated:', settings);
  }
});

function removeTrendingSection() {
  if (!settings.removeTrending) return;
  
  console.log('🚫 Removing Trending sections completely...');
  
  let removedCount = 0;
  
  // Method 1: Find "Trending" sections and remove them completely
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent.trim();
    // Only look for "Trending" - keep "Up Next" visible
    if (text === 'Trending') {
      textNodes.push(walker.currentNode);
    }
  }
  
  textNodes.forEach(textNode => {
    let element = textNode.parentElement;
    let attempts = 0;
    
    // Find the Trending container and remove it completely
    while (element && attempts < 10) {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || '';
      
      // Find if this is a Trending section container
      if ((tagName === 'div' || tagName === 'section' || tagName === 'aside') &&
          text.includes('Trending') &&
          text.length < 2000 && // Not too large
          text.length > 10 && // Not too small
          !element.querySelector('[aria-label="Main navigation"]') && // Not main nav
          !element.querySelector('button[data-href]') && // Not navigation buttons
          !element.querySelector('input') && // Not search bars or input fields
          !element.querySelector('[type="search"]') && // Not search elements
          !element.querySelector('[placeholder*="Search"]') && // Not search boxes
          !element.closest('header') && // Not in header
          !element.closest('nav') && // Not in navigation
          !element.closest('[role="search"]')) { // Not in search areas
        
        // Remove the entire Trending section
        element.remove();
        console.log('🚫 Removed Trending section completely:', element);
        removedCount++;
        break;
      }
      
      element = element.parentElement;
      attempts++;
    }
  });
  
  // Method 2: Remove Trending elements by CSS selectors
  const selectors = [
    '[class*="trending"]:not([aria-label="Main navigation"])',
    '[aria-label*="trending"]',
    '[data-testid*="trending"]'
  ];
  
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.querySelector('[aria-label="Main navigation"]') &&
            !el.querySelector('button[data-href]') &&
            !el.querySelector('input') &&
            !el.querySelector('[type="search"]') &&
            !el.querySelector('[placeholder*="Search"]') &&
            !el.closest('header') &&
            !el.closest('nav') &&
            !el.closest('[role="search"]')) {
          // Remove the entire Trending section
          el.remove();
          console.log('🚫 Removed Trending element by selector:', el);
          removedCount++;
        }
      });
    } catch (e) {
      // Invalid selector, skip
    }
  });
  
  // Method 3: Remove any remaining Trending elements (but keep Up Next)
  document.querySelectorAll('*').forEach(el => {
    const text = el.textContent || '';
    if (text.includes('Trending') &&
        !text.includes('Up Next') && // Keep Up Next sections
        text.length < 1000 &&
        text.length > 10 &&
        !el.querySelector('[aria-label="Main navigation"]') &&
        !el.querySelector('button[data-href]') &&
        !el.querySelector('input') &&
        !el.querySelector('[type="search"]') &&
        !el.querySelector('[placeholder*="Search"]') &&
        !el.closest('header') &&
        !el.closest('nav') &&
        !el.closest('[role="search"]') &&
        el.tagName !== 'BUTTON' &&
        el.tagName !== 'A' &&
        el.tagName !== 'INPUT') {
      
      // Remove the entire Trending section
      el.remove();
      console.log('🚫 Removed Trending element by content:', el);
      removedCount++;
    }
  });
  
  // Method 4: Conservative targeting - only remove if it's clearly a trending section
  document.querySelectorAll('*').forEach(el => {
    const text = el.textContent || '';
    if (text.trim() === 'Trending' && 
        !el.closest('header') &&
        !el.closest('nav') &&
        !el.closest('main') &&
        !el.closest('[role="main"]')) {
      
      let parent = el.parentElement;
      let attempts = 0;
      while (parent && attempts < 3) {
        const parentText = parent.textContent || '';
        if (parentText.includes('Trending') && 
            parentText.length < 2000 &&
            parentText.length > 10 &&
            !parent.querySelector('input') &&
            !parent.querySelector('button[data-href]') &&
            !parent.closest('header') &&
            !parent.closest('nav') &&
            !parent.closest('main')) {
          parent.remove();
          console.log('🚫 Removed Trending parent:', parent);
          removedCount++;
          break;
        }
        parent = parent.parentElement;
        attempts++;
      }
    }
  });
  
  console.log(`🚫 Removed ${removedCount} Trending sections completely`);
}

function removeNotifications() {
  if (!settings.removeNotifications) return;
  
  console.log('🚫 Removing notifications bell...');
  
  let removedCount = 0;
  
  // Very specific targeting for notification bells only
  const notificationSelectors = [
    'button[aria-label*="notification"]',
    'button[aria-label*="Notification"]', 
    'button[aria-label*="Activity"]',
    '[role="button"][aria-label*="notification"]',
    '[role="button"][aria-label*="Activity"]'
  ];
  
  notificationSelectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        // Only remove if it's clearly a notification button
        const ariaLabel = el.getAttribute('aria-label') || '';
        if (ariaLabel.toLowerCase().includes('notification') || 
            ariaLabel.toLowerCase().includes('activity')) {
          el.remove();
          console.log('🚫 Removed notification button:', el);
          removedCount++;
        }
      });
    } catch (e) {
      // Invalid selector, skip
    }
  });
  
  console.log(`🚫 Removed ${removedCount} notification elements`);
}


function removeEmptyContainers() {
  console.log('🚫 Removing empty containers and borders...');
  
  let removedCount = 0;
  
  // Only remove very specific empty containers that are clearly leftover from trending
  document.querySelectorAll('div, section, aside').forEach(el => {
    const text = el.textContent || '';
    const className = (el.className || '').toString();
    
    // Only remove if it's clearly an empty trending container
    if (text.trim().length === 0 && 
        el.children.length === 0 &&
        (className.includes('trending') || 
         className.includes('upNext') || 
         className.includes('up-next')) &&
        !el.closest('header') &&
        !el.closest('nav') &&
        !el.closest('main') &&
        !el.closest('[role="main"]')) {
      
      el.remove();
      console.log('🚫 Removed empty trending container:', el);
      removedCount++;
    }
  });
  
  console.log(`🚫 Removed ${removedCount} empty containers`);
}

function addCredit() {
  // Add credit to the page if not already added
  if (!document.querySelector('.substack-credit')) {
    const credit = document.createElement('div');
    credit.className = 'substack-credit';
    credit.style.cssText = 'position: fixed; bottom: 10px; right: 10px; font-size: 10px; color: #999; z-index: 9999;';
    credit.innerHTML = 'Created by <a href="https://newsletter.pathlesspath.com/" target="_blank" style="color: #999; text-decoration: underline;">Paul Millerd</a>';
    document.body.appendChild(credit);
  }
}

function runCleaner() {
  console.log('🚫 runCleaner() called');
  console.log('🚫 Current settings:', settings);
  
  removeTrendingSection();
  removeNotifications();
  removeEmptyContainers();
  addCredit();
}

// Run immediately
runCleaner();

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runCleaner);
}

// Run on window load
window.addEventListener('load', runCleaner);

// Watch for new content - run immediately without delay
const observer = new MutationObserver(() => {
  runCleaner();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run more aggressively for longer
let runs = 0;
const interval = setInterval(() => {
  runCleaner();
  runs++;
  if (runs >= 60) { // Run for 30 seconds (60 * 500ms)
    clearInterval(interval);
  }
}, 500);
