// ===== SAMPLE DATA =====
const articles = [
    {
        id: 1,
        title: "The Future of Artificial Intelligence in Education",
        category: "Technology",
        excerpt: "Exploring how AI is revolutionizing the way we learn and teach in the 21st century.",
        author: "Dr. Sarah Johnson",
        date: "2025-07-20",
        likes: 45,
        comments: 12,
        shares: 23
    },
    {
        id: 2,
        title: "Understanding Quantum Physics: A Beginner's Guide",
        category: "Science",
        excerpt: "Demystifying the complex world of quantum mechanics through simple explanations and real-world examples.",
        author: "Prof. Michael Chen",
        date: "2025-07-18",
        likes: 67,
        comments: 18,
        shares: 34
    },
    {
        id: 3,
        title: "The Renaissance: Art, Science, and Cultural Revolution",
        category: "History",
        excerpt: "A comprehensive look at how the Renaissance period shaped modern civilization.",
        author: "Dr. Emma Rodriguez",
        date: "2025-07-15",
        likes: 52,
        comments: 15,
        shares: 28
    },
    {
        id: 4,
        title: "Climate Change and Environmental Sustainability",
        category: "Environment",
        excerpt: "Understanding the science behind climate change and exploring sustainable solutions.",
        author: "Dr. James Wilson",
        date: "2025-07-12",
        likes: 89,
        comments: 25,
        shares: 45
    },
    {
        id: 5,
        title: "The Psychology of Learning and Memory",
        category: "Psychology",
        excerpt: "How our brains process and retain information, and techniques to improve learning efficiency.",
        author: "Dr. Lisa Thompson",
        date: "2025-07-10",
        likes: 73,
        comments: 20,
        shares: 31
    },
    {
        id: 6,
        title: "Modern Literature and Its Impact on Society",
        category: "Literature",
        excerpt: "Examining how contemporary literature reflects and shapes our understanding of the world.",
        author: "Prof. Robert Garcia",
        date: "2025-07-08",
        likes: 41,
        comments: 14,
        shares: 19
    }
];

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let userLikes = new Set();
let filteredArticles = [...articles];

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Load page-specific content
    if (pageId === 'articles') {
        renderArticles(filteredArticles);
    } else if (pageId === 'home') {
        renderLatestArticles();
    }
}

// ===== MODAL FUNCTIONS =====
function showModal(modalType) {
    document.getElementById(modalType + 'Modal').style.display = 'block';
}

function closeModal(modalType) {
    document.getElementById(modalType + 'Modal').style.display = 'none';
}

// ===== AUTHENTICATION FUNCTIONS =====
function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple authentication (in real app, this would be server-side)
    if (email && password) {
        currentUser = { 
            email: email, 
            name: email.split('@')[0] 
        };
        updateAuthUI();
        closeModal('login');
        alert('Login successful!');
        
        // Clear form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Create user account
    if (name && email && password) {
        currentUser = { 
            email: email, 
            name: name 
        };
        updateAuthUI();
        closeModal('signup');
        alert('Account created successfully!');
        
        // Clear form
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }
}

function logout() {
    currentUser = null;
    userLikes.clear();
    updateAuthUI();
    alert('Logged out successfully!');
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const welcomeText = document.getElementById('welcomeText');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userInfo.classList.add('active');
        welcomeText.textContent = `Welcome, ${currentUser.name}!`;
    } else {
        authButtons.style.display = 'flex';
        userInfo.classList.remove('active');
    }
}

// ===== ARTICLE RENDERING FUNCTIONS =====
function renderArticles(articlesToRender) {
    const articlesGrid = document.getElementById('articlesGrid');
    articlesGrid.innerHTML = '';
    
    articlesToRender.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
}

function renderLatestArticles() {
    const latestArticlesGrid = document.getElementById('latestArticles');
    latestArticlesGrid.innerHTML = '';
    
    // Show only the 3 most recent articles
    const latestArticles = articles.slice(0, 3);
    latestArticles.forEach(article => {
        const articleCard = createArticleCard(article);
        latestArticlesGrid.appendChild(articleCard);
    });
}

function createArticleCard(article) {
    const articleCard = document.createElement('div');
    articleCard.className = 'article-card';
    
    const isLiked = userLikes.has(article.id);
    
    articleCard.innerHTML = `
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <div class="article-meta">
                By ${article.author} | ${formatDate(article.date)} | ${article.category}
            </div>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-actions">
                <button class="action-btn ${isLiked ? 'active' : ''}" onclick="toggleLike(${article.id})">
                    ❤️ <span id="likes-${article.id}">${article.likes}</span>
                </button>
                <button class="action-btn" onclick="shareArticle(${article.id})">
                    🔗 ${article.shares}
                </button>
                <button class="action-btn" onclick="showComments(${article.id})">
                    💬 ${article.comments}
                </button>
            </div>
        </div>
    `;
    
    return articleCard;
}

// ===== ARTICLE INTERACTION FUNCTIONS =====
function toggleLike(articleId) {
    if (!currentUser) {
        alert('Please login to like articles!');
        return;
    }
    
    const article = articles.find(a => a.id === articleId);
    const likesSpan = document.getElementById(`likes-${articleId}`);
    const likeButton = likesSpan.parentElement;
    
    if (userLikes.has(articleId)) {
        // Unlike article
        userLikes.delete(articleId);
        article.likes--;
        likeButton.classList.remove('active');
    } else {
        // Like article
        userLikes.add(articleId);
        article.likes++;
        likeButton.classList.add('active');
    }
    
    likesSpan.textContent = article.likes;
}

function shareArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    article.shares++;
    
    // In a real app, this would open share options
    alert(`Article "${article.title}" shared!`);
    
    // Update the share count in the UI
    const currentPage = document.querySelector('.page.active').id;
    if (currentPage === 'articles') {
        renderArticles(filteredArticles);
    } else if (currentPage === 'home') {
        renderLatestArticles();
    }
}

function showComments(articleId) {
    const article = articles.find(a => a.id === articleId);
    alert(`Comments for "${article.title}" - This feature would open a comments section in a full implementation.`);
}

// ===== SEARCH FUNCTIONALITY =====
function searchArticles() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || 
                     document.getElementById('articlesSearchInput')?.value.toLowerCase() || '';
    
    filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm)
    );
    
    const currentPage = document.querySelector('.page.active').id;
    if (currentPage === 'articles') {
        renderArticles(filteredArticles);
    }
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// ===== FORM HANDLERS =====
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    
    if (email) {
        alert(`Thank you for subscribing with email: ${email}`);
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

function submitContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

// ===== EVENT LISTENERS =====

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Handle escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Search functionality on Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'searchInput' || activeElement.id === 'articlesSearchInput') {
            searchArticles();
        }
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with latest articles
    renderLatestArticles();
    
    // Set up search input synchronization
    const searchInput = document.getElementById('searchInput');
    const articlesSearchInput = document.getElementById('articlesSearchInput');
    
    if (searchInput && articlesSearchInput) {
        searchInput.addEventListener('input', function() {
            articlesSearchInput.value = this.value;
        });
        
        articlesSearchInput.addEventListener('input', function() {
            searchInput.value = this.value;
        });
    }
    
    // Initialize authentication UI
    updateAuthUI();
    
    console.log('NeoStotle website initialized successfully!');
});