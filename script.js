// Substack Sidebar Blocker - Remove Trending Section Completely
console.log('🚫 Substack Sidebar Blocker: Extension loaded');

function removeTrendingSection() {
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
  
  // Method 4: More aggressive targeting - look for any element with "Trending" text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.textContent && el.textContent.trim() === 'Trending') {
      let parent = el.parentElement;
      let attempts = 0;
      while (parent && attempts < 5) {
        if (parent.textContent && parent.textContent.includes('Trending') && 
            !parent.textContent.includes('Up Next') &&
            parent.textContent.length < 2000) {
          parent.remove();
          console.log('🚫 Aggressively removed Trending parent:', parent);
          removedCount++;
          break;
        }
        parent = parent.parentElement;
        attempts++;
      }
    }
  });
  
  console.log(`🚫 Removed ${removedCount} Trending sections completely`);
  
  // Add credit to the page if not already added
  if (!document.querySelector('.substack-credit')) {
    const credit = document.createElement('div');
    credit.className = 'substack-credit';
    credit.style.cssText = 'position: fixed; bottom: 10px; right: 10px; font-size: 10px; color: #999; z-index: 9999;';
    credit.innerHTML = 'Created by <a href="https://newsletter.pathlesspath.com/" target="_blank" style="color: #999; text-decoration: underline;">Paul Millerd</a>';
    document.body.appendChild(credit);
  }
}

// Run immediately
removeTrendingSection();

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', removeTrendingSection);
}

// Run on window load
window.addEventListener('load', removeTrendingSection);

// Watch for new content - run immediately without delay
const observer = new MutationObserver(() => {
  removeTrendingSection();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run more aggressively for longer
let runs = 0;
const interval = setInterval(() => {
  removeTrendingSection();
  runs++;
  if (runs >= 60) { // Run for 30 seconds (60 * 500ms)
    clearInterval(interval);
  }
}, 500);
