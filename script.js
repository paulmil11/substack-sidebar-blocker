// Substack Sidebar Blocker - Simple and Effective
console.log('🚫 Substack Sidebar Blocker: Extension loaded');

function hideRecommendations() {
  console.log('🚫 Running recommendation blocker...');
  
  let removedCount = 0;
  
  // Method 1: Find and hide elements by text content
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent.trim();
    if (text === 'Up Next' || text === 'Trending' || text === 'See all') {
      textNodes.push(walker.currentNode);
    }
  }
  
  textNodes.forEach(textNode => {
    let element = textNode.parentElement;
    let attempts = 0;
    
    // Find a good container to hide
    while (element && attempts < 10) {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || '';
      
      // Hide if it's a reasonable container and contains recommendation content
      if ((tagName === 'div' || tagName === 'section' || tagName === 'aside') &&
          text.length < 2000 && // Not too large
          text.length > 10 && // Not too small
          !element.querySelector('[aria-label="Main navigation"]') && // Not main nav
          !element.querySelector('button[data-href]') && // Not navigation buttons
          !element.querySelector('a[href*="/"]')) { // Not navigation links
        
        element.style.display = 'none';
        console.log('🚫 Hidden element:', element);
        removedCount++;
        break;
      }
      
      element = element.parentElement;
      attempts++;
    }
  });
  
  // Method 2: Hide elements by CSS selectors
  const selectors = [
    '[class*="recommendation"]:not([aria-label="Main navigation"])',
    '[class*="trending"]:not([aria-label="Main navigation"])',
    '[class*="upNext"]:not([aria-label="Main navigation"])',
    '[aria-label*="recommendations"]',
    '[aria-label*="trending"]',
    '[data-testid*="recommendations"]',
    '[data-testid*="trending"]'
  ];
  
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.querySelector('[aria-label="Main navigation"]') &&
            !el.querySelector('button[data-href]') &&
            !el.querySelector('a[href*="/"]')) {
          el.style.display = 'none';
          console.log('🚫 Hidden element by selector:', el);
          removedCount++;
        }
      });
    } catch (e) {
      // Invalid selector, skip
    }
  });
  
  // Method 3: Hide any remaining elements with recommendation text
  document.querySelectorAll('*').forEach(el => {
    const text = el.textContent || '';
    if ((text.includes('Up Next') || text.includes('Trending')) &&
        text.length < 1000 &&
        text.length > 10 &&
        !el.querySelector('[aria-label="Main navigation"]') &&
        !el.querySelector('button[data-href]') &&
        !el.querySelector('a[href*="/"]') &&
        el.tagName !== 'BUTTON' &&
        el.tagName !== 'A') {
      
      el.style.display = 'none';
      console.log('🚫 Hidden element by content:', el);
      removedCount++;
    }
  });
  
  console.log(`🚫 Hidden ${removedCount} elements`);
}

// Run immediately
hideRecommendations();

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideRecommendations);
}

// Run on window load
window.addEventListener('load', hideRecommendations);

// Watch for new content
const observer = new MutationObserver(() => {
  setTimeout(hideRecommendations, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run periodically for the first 10 seconds
let runs = 0;
const interval = setInterval(() => {
  hideRecommendations();
  runs++;
  if (runs >= 20) {
    clearInterval(interval);
  }
}, 500);
