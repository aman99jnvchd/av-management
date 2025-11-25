// Check if 'accessToken' exists in localStorage and 'userData' exists in sessionStorage
const accessToken = localStorage.getItem('accessToken');
// const userData = sessionStorage.getItem('userData');
const userData = localStorage.getItem('userData');

// If either or both are missing or null, redirect to login page
if (!accessToken || !userData) {
    window.location.href = '/login.html';
}

// Load sidebar
fetch("sidebar.html")
.then(res => res.text())
.then(html => {
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = html;
    sidebar.classList.remove("loading");
    // Fire custom event
    document.dispatchEvent(new Event("sidebarLoaded"));
});

// Load data on sidebar load
document.addEventListener("sidebarLoaded", () => {
    // Welcome user name
    const userData = currentUserData();
    const welcomeText = document.querySelector('.welcome-text');
    const span = welcomeText.querySelector('span');
    span.textContent = userData.name;
    
    // Set active menu item
    setActiveMenuItem();
});

// Logout
function doLogout(e) {
    e.currentTarget.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Logging Out...
    `;
    logoutUser();
}

// Function to set active menu item based on current page
function setActiveMenuItem() {
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove all existing active classes
    document.querySelectorAll('.nav-item, .submenu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Handle dashboard/home page
    if (currentPage === 'index.html' || currentPath.endsWith('/admin') || currentPath.endsWith('/admin/')) {
        const dashboardLink = document.querySelector('a[href="/admin"]');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
        return;
    }
    
    // Find matching menu item
    let matchedItem = null;
    let parentDropdown = null;
    
    // Check all nav items and submenu items
    const allLinks = document.querySelectorAll('.nav-item[href], .submenu-item[href]');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Match by exact filename or full path
        if (href === currentPage || href.endsWith('/' + currentPage) || currentPath.endsWith(href)) {
            matchedItem = link;
            
            // Check if this is a submenu item
            if (link.classList.contains('submenu-item')) {
                parentDropdown = link.closest('.nav-dropdown');
            }
        }
    });
    
    // Apply active class to matched item
    if (matchedItem) {
        matchedItem.classList.add('active');
        
        // If it's in a submenu, open the parent dropdown
        if (parentDropdown) {
            const checkbox = parentDropdown.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    }
}
