import { useState, useEffect } from 'react';
import { Home, Package, LogOut, Menu, X, Search, ShoppingCart } from 'lucide-react';
import React from 'react';

// Configure your API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function UserDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, items]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      const fetchedItems = data.items || [];
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(fetchedItems.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleLogout = () => {
  
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    
    window.location.href = '/login';
    
  
};

  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">User</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              <a href="#home" className="flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-purple-600">
                <Home size={20} />
                <span className="font-medium">Home</span>
              </a>
              <a href="#products" className="flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-purple-600">
                <Package size={20} />
                <span className="font-medium">Products</span>
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center px-6 py-2 space-x-2 text-white transition duration-300 bg-purple-600 rounded-full hover:bg-purple-700"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="bg-white border-t md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="flex items-center px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-purple-50">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#products" className="flex items-center px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-purple-50">
                <Package size={20} />
                <span>Products</span>
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-purple-50"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="p-6 mb-8 bg-white shadow-2xl rounded-2xl md:p-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
              Welcome to Your Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Browse and explore our available products
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="p-6 mb-8 bg-white shadow-2xl rounded-2xl">
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchItems}
                className="px-6 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-6 bg-white shadow-2xl rounded-2xl md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Available Products</h2>

            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block w-12 h-12 border-b-2 border-purple-600 rounded-full animate-spin"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <Package size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">No products found</p>
                <p className="mt-2 text-sm">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 transition duration-300 transform border border-gray-200 cursor-pointer rounded-xl hover:shadow-xl hover:scale-105"
                    onClick={() => openItemDetails(item)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Package className="text-purple-600" size={24} />
                      </div>
                      <span className="px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {item.itemName}
                    </h3>
                    
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-lg font-bold text-gray-800">{item.quantity} units</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                        <ShoppingCart size={18} />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeItemDetails}>
          <div className="relative w-full max-w-2xl p-8 bg-white rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeItemDetails}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-100 rounded-full">
                <Package className="text-purple-600" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedItem.itemName}</h2>
                <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
                  {selectedItem.category}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">Description</h3>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">Availability</h3>
                <p className="text-2xl font-bold text-gray-800">{selectedItem.quantity} units available</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="flex items-center justify-center w-full gap-2 px-6 py-3 text-lg font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 mt-8 text-white bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2 text-lg font-semibold">UserPortal</p>
            <p className="mb-4 text-gray-400">
              &copy; 2025 UserPortal. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#privacy" className="transition duration-300 hover:text-white">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#terms" className="transition duration-300 hover:text-white">
                Terms of Service
              </a>
              <span>|</span>
              <a href="mailto:support@userportal.com" className="transition duration-300 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}