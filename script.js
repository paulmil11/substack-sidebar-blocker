// Substack Sidebar Blocker - Simple and Effective
console.log('🚫 Substack Sidebar Blocker: Extension loaded');

function hideRecommendations() {
  console.log('🚫 Running recommendation blocker...');
  
  let removedCount = 0;
  
  // Method 1: Find and hide elements by text content - PRESERVE SEARCH
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
    
    // Find a good container to hide - BUT PRESERVE SEARCH
    while (element && attempts < 10) {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || '';
      
      // Check if this element contains search functionality (Explore/search)
      const hasSearch = element.querySelector('input[type="search"]') || 
                       element.querySelector('input[placeholder*="search"]') ||
                       element.querySelector('input[placeholder*="Search"]') ||
                       element.querySelector('[aria-label*="search"]') ||
                       element.querySelector('[aria-label*="Search"]') ||
                       element.querySelector('button[aria-label*="search"]') ||
                       element.querySelector('button[aria-label*="Search"]') ||
                       element.querySelector('button[aria-label*="explore"]') ||
                       element.querySelector('button[aria-label*="Explore"]') ||
                       text.includes('Search Substack') ||
                       text.includes('search') ||
                       text.includes('Search') ||
                       text.includes('Explore') ||
                       text.includes('explore') ||
                       // Check for navigation elements that might be search/explore
                       element.querySelector('[data-href*="explore"]') ||
                       element.querySelector('[data-href*="search"]') ||
                       // Check for top-right positioned elements that might be search
                       (element.style.position === 'fixed' && element.style.top && element.style.right) ||
                       (element.classList.contains('search') || element.classList.contains('Search') || 
                        element.classList.contains('explore') || element.classList.contains('Explore'));
      
      // Hide if it's a reasonable container and contains recommendation content
      // BUT NOT if it contains search functionality
      if ((tagName === 'div' || tagName === 'section' || tagName === 'aside') &&
          text.length < 2000 && // Not too large
          text.length > 10 && // Not too small
          !hasSearch && // PRESERVE SEARCH ELEMENTS
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
  
  // Method 2: Hide elements by CSS selectors - TARGET SUBSTACK SPECIFIC STRUCTURE
  const selectors = [
    '[class*="recommendation"]:not([aria-label="Main navigation"])',
    '[class*="trending"]:not([aria-label="Main navigation"])',
    '[class*="upNext"]:not([aria-label="Main navigation"])',
    '[aria-label*="recommendations"]',
    '[aria-label*="trending"]',
    '[data-testid*="recommendations"]',
    '[data-testid*="trending"]',
    // Target Substack's specific structure - but be very careful
    '.pencraft:has-text("Up Next"):not(:has(button[data-href])):not(:has(input))',
    '.pencraft:has-text("Trending"):not(:has(button[data-href])):not(:has(input))'
  ];
  
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        // Check if this element contains search functionality (Explore/search)
        const hasSearch = el.querySelector('input[type="search"]') || 
                         el.querySelector('input[placeholder*="search"]') ||
                         el.querySelector('input[placeholder*="Search"]') ||
                         el.querySelector('[aria-label*="search"]') ||
                         el.querySelector('[aria-label*="Search"]') ||
                         el.querySelector('button[aria-label*="search"]') ||
                         el.querySelector('button[aria-label*="Search"]') ||
                         el.querySelector('button[aria-label*="explore"]') ||
                         el.querySelector('button[aria-label*="Explore"]') ||
                         el.textContent.includes('Search Substack') ||
                         el.textContent.includes('search') ||
                         el.textContent.includes('Search') ||
                         el.textContent.includes('Explore') ||
                         el.textContent.includes('explore') ||
                         // Check for navigation elements that might be search/explore
                         el.querySelector('[data-href*="explore"]') ||
                         el.querySelector('[data-href*="search"]') ||
                         // Check for top-right positioned elements that might be search
                         (el.style.position === 'fixed' && el.style.top && el.style.right) ||
                         (el.classList.contains('search') || el.classList.contains('Search') || 
                          el.classList.contains('explore') || el.classList.contains('Explore'));
        
        if (!el.querySelector('[aria-label="Main navigation"]') &&
            !el.querySelector('button[data-href]') &&
            !el.querySelector('a[href*="/"]') &&
            !hasSearch) { // PRESERVE SEARCH ELEMENTS
          el.style.display = 'none';
          console.log('🚫 Hidden element by selector:', el);
          removedCount++;
        }
      });
    } catch (e) {
      // Invalid selector, skip
    }
  });
  
  // Method 3: Hide any remaining elements with recommendation text - PRESERVE SEARCH
  document.querySelectorAll('*').forEach(el => {
    const text = el.textContent || '';
    
    // Check if this element contains search functionality (Explore/search)
    const hasSearch = el.querySelector('input[type="search"]') || 
                     el.querySelector('input[placeholder*="search"]') ||
                     el.querySelector('input[placeholder*="Search"]') ||
                     el.querySelector('[aria-label*="search"]') ||
                     el.querySelector('[aria-label*="Search"]') ||
                     el.querySelector('button[aria-label*="search"]') ||
                     el.querySelector('button[aria-label*="Search"]') ||
                     el.querySelector('button[aria-label*="explore"]') ||
                     el.querySelector('button[aria-label*="Explore"]') ||
                     text.includes('Search Substack') ||
                     text.includes('search') ||
                     text.includes('Search') ||
                     text.includes('Explore') ||
                     text.includes('explore') ||
                     // Check for navigation elements that might be search/explore
                     el.querySelector('[data-href*="explore"]') ||
                     el.querySelector('[data-href*="search"]') ||
                     // Check for top-right positioned elements that might be search
                     (el.style.position === 'fixed' && el.style.top && el.style.right) ||
                     (el.classList.contains('search') || el.classList.contains('Search') || 
                      el.classList.contains('explore') || el.classList.contains('Explore'));
    
    if ((text.includes('Up Next') || text.includes('Trending')) &&
        text.length < 1000 &&
        text.length > 10 &&
        !hasSearch && // PRESERVE SEARCH ELEMENTS
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
  
  // Method 4: Target Substack's specific structure - BE VERY CAREFUL
  // Look for elements that contain recommendation text but are NOT navigation
  document.querySelectorAll('.pencraft').forEach(el => {
    const text = el.textContent || '';
    const hasRecommendationText = text.includes('Up Next') || text.includes('Trending');
    const hasNavigation = el.querySelector('button[data-href]') || 
                         el.querySelector('a[href]') ||
                         el.querySelector('input') ||
                         el.querySelector('[aria-label="Main navigation"]');
    const isNotTooLarge = text.length < 2000;
    
    if (hasRecommendationText && !hasNavigation && isNotTooLarge) {
      el.style.display = 'none';
      console.log('🚫 Hidden Substack pencraft element:', el);
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
