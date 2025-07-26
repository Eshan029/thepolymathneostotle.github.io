# NeoStotle Website - File Structure

## Complete Project Organization

```
neostotle-website/
│
├── index.html                 # Main HTML file (entry point)
│
├── css/
│   └── styles.css            # Complete stylesheet with all styles
│
├── js/
│   └── script.js             # Main JavaScript functionality
│
├── assets/
│   ├── images/
│   │   ├── logo.svg          # Website logo (embedded as base64 in current version)
│   │   ├── social-youtube.svg
│   │   ├── social-instagram.svg
│   │   └── social-linkedin.svg
│   └── fonts/               # Custom fonts (if needed)
│
├── README.md                # Project documentation
├── .gitignore              # Git ignore file (optional)
└── LICENSE                 # License file (optional)
```

## File Dependencies

### index.html
- **Links to**: `css/styles.css`
- **Scripts**: `js/script.js`
- **Contains**: All HTML structure, modals, forms

### css/styles.css
- **Contains**: All styling rules organized by sections
- **Includes**: Responsive design, animations, component styles
- **Dependencies**: None (self-contained)

### js/script.js
- **Contains**: All JavaScript functionality
- **Includes**: Navigation, authentication, article management, search
- **Dependencies**: None (vanilla JavaScript)

## Setup Instructions

### 1. Create Folder Structure
```bash
# Create main project folder
mkdir neostotle-website
cd neostotle-website

# Create subfolders
mkdir css js assets assets/images

# Create files
touch index.html README.md
touch css/styles.css
touch js/script.js
```

### 2. File Placement
1. Copy the HTML content to `index.html`
2. Copy the CSS content to `css/styles.css`
3. Copy the JavaScript content to `js/script.js`
4. Copy the README content to `README.md`

### 3. Verification
- Ensure all file paths in `index.html` are correct:
  - `<link rel="stylesheet" href="css/styles.css">`
  - `<script src="js/script.js"></script>`

## Code Organization Summary

### HTML (index.html) - 200+ lines
- Document structure and semantic markup
- Header with navigation and authentication
- Main content with all pages (home, about, articles, contact)
- Modals for login/signup
- Footer with social links

### CSS (css/styles.css) - 400+ lines
- Reset and base styles
- Header and navigation styling
- Page layouts and components
- Form and modal styling
- Responsive design rules
- Animations and transitions

### JavaScript (js/script.js) - 300+ lines
- Article data and management
- Page navigation system
- User authentication logic
- Search functionality
- Form handlers and validation
- Event listeners and initialization

## Benefits of This Structure

### ✅ **Maintainability**
- Separation of concerns (HTML/CSS/JS)
- Easy to locate and edit specific functionality
- Modular code organization

### ✅ **Scalability**
- Easy to add new features
- Simple to add new pages or components
- Clear file structure for team collaboration

### ✅ **Performance**
- Cached CSS and JS files
- Organized code for better minification
- Clear dependency management

### ✅ **Development**
- Better IDE support with separate files
- Easier debugging and testing
- Version control friendly

## Deployment Options

### Local Development
- Use Live Server extension in VS Code
- Python: `python -m http.server 8000`
- Node.js: `npx serve`

### Web Hosting
- Upload all files maintaining folder structure
- Ensure server supports static files
- Update any absolute paths if needed

### Version Control
- Initialize git repository
- Add appropriate `.gitignore` for development files
- Commit each file type separately for better tracking

---

This structure transforms the monolithic single-file website into a professional, maintainable multi-file project ready for development and deployment! 🚀