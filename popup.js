// Popup script for Substack Cleaner extension
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(['removeTrending', 'removeNotifications'], function(result) {
        document.getElementById('removeTrending').checked = result.removeTrending !== false; // Default to true
        document.getElementById('removeNotifications').checked = result.removeNotifications || false;
    });
    
    // Save settings when toggles change
    document.getElementById('removeTrending').addEventListener('change', function() {
        chrome.storage.sync.set({removeTrending: this.checked});
    });
    
    document.getElementById('removeNotifications').addEventListener('change', function() {
        chrome.storage.sync.set({removeNotifications: this.checked});
    });
});
