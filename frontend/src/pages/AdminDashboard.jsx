import { useState, useEffect } from 'react';
import { Home, Package, LogOut, Menu, X, Plus, Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function AdminDashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: '',
        description: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/items`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setItems(data.items || []);
        } catch (error) {
            showMessage('Error fetching items', 'error');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            let response;
            if (editingItem) {
                response = await fetch(`${API_BASE_URL}/items/${editingItem._id}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch(`${API_BASE_URL}/items`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });
            }
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to save item');
            }
            
            showMessage(data.message, 'success');
            setEditingItem(null);
            setFormData({ itemName: '', quantity: '', description: '', category: '' });
            setShowAddForm(false);
            fetchItems();
        } catch (error) {
            showMessage(error.message || 'Error saving item', 'error');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            itemName: item.itemName,
            quantity: item.quantity,
            description: item.description,
            category: item.category
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
    
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete item');
            }
            
            showMessage(data.message, 'success');
            fetchItems();
        } catch (error) {
            showMessage(error.message || 'Error deleting item', 'error');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');


        window.location.href = '/login';

    };

    const cancelEdit = () => {
        setEditingItem(null);
        setFormData({ itemName: '', quantity: '', description: '', category: '' });
        setShowAddForm(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
            <nav className="bg-white shadow-lg">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
                        </div>

                        <div className="items-center hidden space-x-8 md:flex">
                            <a href="#home" className="flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-blue-600">
                                <Home size={20} />
                                <span className="font-medium">Home</span>
                            </a>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="flex items-center space-x-2 text-gray-700 transition duration-300 hover:text-blue-600"
                            >
                                <Plus size={20} />
                                <span className="font-medium">Add Products</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-6 py-2 space-x-2 text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-700"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 hover:text-blue-600"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="bg-white border-t md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#home" className="flex items-center px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-blue-50">
                                <Home size={20} />
                                <span>Home</span>
                            </a>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="flex items-center w-full px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-blue-50"
                            >
                                <Plus size={20} />
                                <span>Add Products</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-3 py-2 space-x-2 text-gray-700 rounded-md hover:bg-blue-50"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {message.text && (
                <div className="w-full px-4 mx-auto mt-4 max-w-7xl">
                    <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                </div>
            )}

            <main className="flex-1 px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    {showAddForm && (
                        <div className="p-6 mb-8 bg-white shadow-2xl rounded-2xl md:p-8">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800">
                                {editingItem ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            name="itemName"
                                            value={formData.itemName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter item name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter quantity"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter category"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter description"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="px-8 py-3 font-medium text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : editingItem ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="px-8 py-3 font-medium text-gray-700 transition duration-300 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-white shadow-2xl rounded-2xl md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Products List</h2>
                            <button
                                onClick={fetchItems}
                                className="px-4 py-2 text-blue-600 transition duration-300 bg-blue-100 rounded-lg hover:bg-blue-200"
                            >
                                Refresh
                            </button>
                        </div>

                        {loading && !showAddForm ? (
                            <div className="py-8 text-center">
                                <div className="inline-block w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <Package size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-xl">No products found. Add your first product!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-gray-50">
                                            <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">Item Name</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">Quantity</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">Category</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">Description</th>
                                            <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900">{item.itemName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-blue-600 transition duration-300 rounded-lg hover:bg-blue-50"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 text-red-600 transition duration-300 rounded-lg hover:bg-red-50"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="py-8 mt-8 text-white bg-gray-900">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="mb-2 text-lg font-semibold">Admin Dashboard</p>
                        <p className="mb-4 text-gray-400">
                            &copy; 2025 Admin Panel. All rights reserved.
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
                            <a href="mailto:admin@portal.com" className="transition duration-300 hover:text-white">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}