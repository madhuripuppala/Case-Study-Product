# Product Search System

A modern, full-stack web application for searching and browsing products with real-time search capabilities and intelligent sorting options.

## Features

✨ **Core Features:**

- 🔍 **Real-time Product Search** - Search by product name, category, or description
- 📊 **Smart Sorting** - Sort results by relevance, price (ascending/descending), or name
- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Optimized search with relevance-based ranking
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- ❌ **Proper Error Handling** - Validation and user-friendly error messages
- 📦 **Product Catalog** - Browse 8 pre-loaded products across multiple categories

## Technology Stack

### Backend

- **Python 3.8+** - Programming language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **JSON** - Data storage (file-based for simplicity)

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling with animations and flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **React 18** - UI library and component framework
- **Fetch API** - HTTP client for API requests

### Development Tools

- **pip** - Python package manager
- **npm** - Node.js package manager
- **Git** - Version control (recommended)

## Project Structure

```
Case-Study-Product/
├── backend/
│   ├── app.py                 # Flask server & API endpoints
│   ├── products.json          # Product database (JSON)
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.js   # Search input component (React)
│   │   │   ├── ProductList.js # Product grid component (React)
│   │   │   ├── ProductCard.js # Individual product card (React)
│   │   │   └── ErrorMessage.js# Error notification component
│   │   ├── App.js             # Main app component
│   │   ├── App.css            # App styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   └── package.json           # Frontend dependencies
│
└── README.md                  # This file
```

## Setup & Installation

### Prerequisites

- **Python** (v3.8 or higher)
- **pip** - Python package manager
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Start the Flask server:

   ```bash
   python app.py
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install npm dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Running Both Services

For convenience, you can run both backend and frontend in separate terminal windows:

**Terminal 1 (Backend):**

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # or: source venv/bin/activate (macOS/Linux)
pip install -r requirements.txt
python app.py
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm install
npm start
```

Both services will start automatically, and the React frontend will communicate with the Flask backend API.

## API Endpoints

### 1. Get All Products

```
GET /api/products
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 79.99,
      "description": "Premium noise-cancelling wireless headphones..."
    }
  ],
  "count": 8
}
```

### 2. Search Products

```
GET /api/search?q=<query>&sort=<option>
```

**Parameters:**

- `q` (required): Search query (max 100 characters)
- `sort` (optional): Sort option - `relevance` (default), `price-asc`, `price-desc`, `name`

**Example:**

```
GET /api/search?q=headphones&sort=price-asc
```

**Response:**

```json
{
  "success": true,
  "query": "headphones",
  "count": 2,
  "results": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 79.99,
      "description": "Premium noise-cancelling wireless headphones..."
    }
  ]
}
```

### 3. Get Product by ID

```
GET /api/products/<id>
```

**Example:**

```
GET /api/products/1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 79.99,
    "description": "Premium noise-cancelling wireless headphones..."
  }
}
```

### 4. Health Check

```
GET /health
```

## Features & Implementation Details

### Search Algorithm

- **Relevance Scoring**: Products matching at the start of the name get higher scores
- **Multi-field Search**: Searches across product name, description, and category
- **Case-Insensitive**: Search terms are case-insensitive for better UX
- **Trim Whitespace**: Query strings are automatically trimmed

### Sorting Options

1. **Relevance** (default) - Custom relevance scoring algorithm
2. **Price: Low to High** - Ascending price order
3. **Price: High to Low** - Descending price order
4. **Name: A-Z** - Alphabetical order

### Validation & Error Handling

#### Backend Validation:

- Search query must not be empty
- Search query max length: 100 characters
- Sort option must be valid
- Product ID must be a valid number
- Comprehensive error messages

#### Frontend Error Handling:

- Network error handling
- User-friendly error messages
- Graceful fallback states
- Form input validation

### Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 480px
- Flexible grid layouts
- Touch-friendly interactive elements

## Assumptions Made

1. **Data Storage**: Used JSON file storage for simplicit for Python/Flask and React code
2. **Claude** - Architecture planning, API design, and complex problem-solving

### How AI Assisted Development

1. **Full-Stack Scaffolding**: Generated Flask backend structure with proper request handling and React component boilerplate
2. **Python/Flask Implementation**: AI assisted in writing Flask routes, CORS configuration, and JSON file handling
3. **API Design**: Designed RESTful endpoints with validation, error handling, and sorting logic
4. **Frontend Integration**: Generated React hooks (useState, useEffect) for state management and API communication
5. **Search Algorithm**: Implemented relevance scoring algorithm with weighted ranking
6. **Responsive Design**: Generated responsive CSS with modern patterns for multiple screen sizes
7. **Documentation**: Created comprehensive README with setup instructions and API documentation

### Challenges Encountered

1. **Flask JSON File Handling**: Ensured proper file path handling using `pathlib.Path` for cross-platform compatibility
2. **Search Algorithm Optimization**: Implemented multi-field search across name, description, and category with relevance scoring
3. **CORS Configuration**: Properly configured Flask-CORS for frontend-backend communication
4. **State Management**: Managed React component state for search queries, sorting, and loading states
5. **Error Validation**: Implemented comprehensive input validation on both frontend and backend
6. **Responsive Design**: Required multiple CSS media queries for optimal mobile/tablet/desktop experienc
7. **GitHub Copilot** - AI code completion and generation
8. **Claude** - Architecture planning and complex problem-solving

### How AI Assisted Development

1. **Rapid Scaffolding**: Generated boilerplate React components and Express server setup
2. **API Design**: Helped design RESTful API endpoints with proper error handling
3. **Validation Logic**: Suggested input validation patterns and error handling strategies
4. **Styling**: Generated responsive CSS with modern design patterns
5. **Component Architecture**: Recommended component structure for maintainability
6. **Documentation**: Generated comprehensive API documentation and README

### Challenges Encountered

1. **Relevance Algorithm**: Initially used simple string matching; improved with weighted relevance scoring based on position and word boundaries
2. **State Management**: Managed search state between parent and child components; ensured proper data flow
3. **Responsive Design**: Required multiple CSS breakpoints to ensure mobile compatibility
4. **API Error Handling**: Structured consistent error responses across all endpoints
5. **Component Reusability**: Designed components to be flexible and reusable

## How to Test

### Test Search Functionality

1. Type "wireless" in the search box
2. Observe real-time filtering and sorting
3. Try different sort options

### Test Not Found Case

1. Search for a term that doesn't match any products (e.g., "xyz123")
2. Observe the "No products found" message

### Test Categories

- Try searching: "electronics", "accessories", "peripherals"
- Observe category-based filtering works correctly

### Test Sorting

1. Search for "wireless" or similar
2. Try different sort options and verify results order

### Test Responsive Design

1. Open browser developer tools (F12)
2. Toggle device toolbar to test on different screen sizes
3. Verify UI adjusts properly on mobile/tablet

## Future Enhancements

- Add product images
- Implement user reviews and ratings
- Add shopping cart functionality
- User authentication and saved favorites
- Advanced filters (price range, category filters)
- Product recommendations
- Database integration (MongoDB/PostgreSQL)
- Server-side pagination
- Full-text search index
- Analytics and tracking
- Multi-language support

## License

ISC - See LICENSE file for details

## Support

For issues or questions, please refer to the documentation or check the console for error messages.

---

