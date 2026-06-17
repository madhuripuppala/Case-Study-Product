import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (err) {
        setError('Unable to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    setError(null);

    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&sort=${sortOption}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Search failed');
        setFilteredProducts([]);
      } else {
        setFilteredProducts(data.results || []);
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sort change
  const handleSortChange = async (sort) => {
    setSortOption(sort);
    
    if (searchQuery.trim()) {
      // If there's an active search, call API with new sort
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&sort=${sort}`);
        const data = await response.json();
        
        if (response.ok) {
          setFilteredProducts(data.results || []);
        }
      } catch (err) {
        console.error('Sort error:', err);
      }
    } else {
      // If no search query, sort client-side
      let sorted = [...filteredProducts];
      
      if (sort === 'price-asc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sort === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      setFilteredProducts(sorted);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>Product Search System</h1>
          <p>Find the perfect product for your needs</p>
        </div>
      </header>

      <main className="container">
        <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} sortOption={sortOption} />

        {error && <ErrorMessage message={error} />}

        {isLoading && <div className="loading">Loading...</div>}

        {!isLoading && (
          <>
            {hasSearched && (
              <div className="results-info">
                {filteredProducts.length > 0 ? (
                  <p>Found <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                ) : (
                  <p>No products found for "{searchQuery}"</p>
                )}
              </div>
            )}

            {!hasSearched && (
              <div className="welcome-message">
                <p>Search for products above to get started</p>
                <p className="secondary-text">Browse {products.length} available products</p>
              </div>
            )}

            <ProductList products={filteredProducts} />
          </>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Product Search System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
