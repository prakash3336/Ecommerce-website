import React, { useState, useEffect, useMemo } from 'react';

// Mock Lucide React Icons using inline SVGs for Canvas environment
const MockIcon = ({ children, className = '', size = 24, strokeWidth = 2 }) => (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        {React.cloneElement(children, { width: size, height: size, strokeWidth: strokeWidth })}
    </span>
);

const UserIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></MockIcon>;
const ListIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></MockIcon>;
const SettingsIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.22a2 2 0 0 0 .73 2.73l.04.04a2 2 0 0 1 0 2.83l-.04.04a2 2 0 0 0-.73 2.73l.78 1.22a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.22a2 2 0 0 0-.73-2.73l-.04-.04a2 2 0 0 1 0-2.83l.04-.04a2 2 0 0 0 .73-2.73l-.78-1.22a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></MockIcon>;
const EditIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></MockIcon>;
const SaveIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg></MockIcon>;
const XCircleIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></MockIcon>;
const CheckCircleIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></MockIcon>;
const UploadIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg></MockIcon>;
const HomeIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></MockIcon>;
const LockIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></MockIcon>;
const Trash2Icon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></MockIcon>;
const EyeIcon = (props) => <MockIcon {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></MockIcon>;


const ProfilePage = () => {
  // State for user profile data
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA 12345',
  });

  // State for editable profile fields
  const [editableProfile, setEditableProfile] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // State for order history (mock data)
  const [orders, setOrders] = useState([
    { id: 'ORD001', date: '2024-05-20', total: 120.50, status: 'Delivered', items: 3 },
    { id: 'ORD002', date: '2024-06-01', total: 75.00, status: 'Processing', items: 2 },
    { id: 'ORD003', date: '2024-06-10', total: 250.75, status: 'Shipped', items: 5 },
    { id: 'ORD004', date: '2024-05-15', total: 50.00, status: 'Delivered', items: 1 },
    { id: 'ORD005', date: '2024-06-05', total: 300.00, status: 'Processing', items: 4 },
    { id: 'ORD006', date: '2024-04-22', total: 99.99, status: 'Delivered', items: 2 },
    { id: 'ORD007', date: '2024-06-15', total: 15.00, status: 'Processing', items: 1 },
  ]);

  // State for current active tab
  const [activeTab, setActiveTab] = useState('dashboard'); // New default tab

  // State for messages (success/error notifications)
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', ''

  // New state for password change form (inside Settings)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // New state for delete account confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // New states for order filtering/sorting
  const [sortOrder, setSortOrder] = useState('dateDesc'); // 'dateDesc', 'dateAsc', 'totalDesc', 'totalAsc'
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [darkMode, setDarkMode] = useState(false);// 'all', 'Delivered', 'Processing', 'Shipped'


  // Initialize editable profile when starting edit mode
  useEffect(() => {
    if (isEditingProfile) {
      setEditableProfile({ ...profile });
    }
  }, [isEditingProfile, profile]);

  // Handle message display timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Derived state for filtered and sorted orders using useMemo for performance
  const filteredSortedOrders = useMemo(() => {
    let sorted = [...orders];

    // Sorting logic
    switch (sortOrder) {
      case 'dateAsc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'dateDesc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'totalAsc':
        sorted.sort((a, b) => a.total - b.total);
        break;
      case 'totalDesc':
        sorted.sort((a, b) => b.total - a.total);
        break;
      default:
        // Default to dateDesc if no valid sortOrder
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    // Filtering logic
    if (filterStatus !== 'all') {
      sorted = sorted.filter(order => order.status === filterStatus);
    }

    return sorted;
  }, [orders, sortOrder, filterStatus]);


  // Function to handle profile field changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({ ...prev, [name]: value }));
  };

  // Function to save profile changes
  const handleSaveProfile = () => {
    // In a real application, you would send this data to a backend API
    // For now, we'll just update the local state.
    try {
      setProfile({ ...editableProfile });
      setIsEditingProfile(false);
      setMessage('Profile updated successfully!');
      setMessageType('success');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
      setMessageType('error');
    }
  };

  // Function to cancel profile editing
  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditableProfile({}); // Clear editable state
    setMessage('Profile editing cancelled.');
    setMessageType('info'); // Changed to info as it's not an error
  };

  // Function to handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match!');
      setMessageType('error');
      return;
    }
    if (newPassword.length < 6) { // Basic validation
        setMessage('Password must be at least 6 characters long.');
        setMessageType('error');
        return;
    }
    // Mock password change logic - in a real app, send to API
    setMessage('Password changed successfully!');
    setMessageType('success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    // In a real app, this would trigger an API call to delete the user account
    setMessage('Account deleted permanently!');
    setMessageType('success');
    setShowDeleteModal(false);
    // In a real app, you would likely redirect the user after deletion
    // e.g., navigate('/logout'); or navigate('/signup');
  };

  // --- Render Components for each tab ---

  const renderDashboardSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Welcome, {profile.name}!</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between transform transition-transform duration-300 hover:scale-[1.02]">
          <div>
            <p className="text-sm opacity-80">Total Orders</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </div>
          <ListIcon size={40} strokeWidth={1.5} />
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between transform transition-transform duration-300 hover:scale-[1.02]">
          <div>
            <p className="text-sm opacity-80">Last Order Status</p>
            <p className="text-xl font-bold">{orders.length > 0 ? orders[orders.length - 1].status : 'N/A'}</p>
          </div>
          <CheckCircleIcon size={40} strokeWidth={1.5} />
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between transform transition-transform duration-300 hover:scale-[1.02]">
          <div>
            <p className="text-sm opacity-80">Account Type</p>
            <p className="text-xl font-bold">Standard</p> {/* Or 'Premium', 'VIP' */}
          </div>
          <UserIcon size={40} strokeWidth={1.5} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button onClick={() => setActiveTab('profile')} className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 transform hover:translate-y-[-2px]">
            <EditIcon size={18} strokeWidth={1.5} />
            <span>Edit Profile</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 transform hover:translate-y-[-2px]">
            <ListIcon size={18} strokeWidth={1.5} />
            <span>View Orders</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 transform hover:translate-y-[-2px]">
            <SettingsIcon size={18} strokeWidth={1.5} />
            <span>Account Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white ring-2 ring-purple-500">
          {/* Placeholder for profile image */}
          <img
            src="https://placehold.co/128x128/9272d4/ffffff?text=JP" // Placeholder with initials
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/9272d4/ffffff?text=JP"; }} // Fallback if image fails
          />
          <button className="absolute bottom-0 right-0 p-1 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors duration-200 shadow-md">
            <UploadIcon size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900">{profile.name}</h3>
          <p className="text-gray-600 text-lg">{profile.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-6 border border-gray-100">
        <h4 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
          Personal Information
          {!isEditingProfile ? (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              <EditIcon size={18} strokeWidth={1.5} />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                <SaveIcon size={18} strokeWidth={1.5} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                <XCircleIcon size={18} strokeWidth={1.5} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditingProfile ? editableProfile.name : profile.name}
              onChange={handleProfileChange}
              readOnly={!isEditingProfile}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base
                ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent cursor-not-allowed'}
                transition-all duration-200`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={isEditingProfile ? editableProfile.email : profile.email}
              onChange={handleProfileChange}
              readOnly={!isEditingProfile}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base
                ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent cursor-not-allowed'}
                transition-all duration-200`}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={isEditingProfile ? editableProfile.phone : profile.phone}
              onChange={handleProfileChange}
              readOnly={!isEditingProfile}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base
                ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent cursor-not-allowed'}
                transition-all duration-200`}
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={isEditingProfile ? editableProfile.address : profile.address}
              onChange={handleProfileChange}
              readOnly={!isEditingProfile}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base
                ${isEditingProfile ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent cursor-not-allowed'}
                transition-all duration-200`}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Your Orders</h3>

      {/* Order Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="w-full sm:w-auto">
          <label htmlFor="filterStatus" className="sr-only">Filter by Status</label>
          <select
            id="filterStatus"
            name="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-2 px-3 transition-colors duration-200"
          >
            <option value="all">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="sortOrder" className="sr-only">Sort By</label>
          <select
            id="sortOrder"
            name="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-2 px-3 transition-colors duration-200"
          >
            <option value="dateDesc">Date (Newest first)</option>
            <option value="dateAsc">Date (Oldest first)</option>
            <option value="totalDesc">Total (High to Low)</option>
            <option value="totalAsc">Total (Low to High)</option>
          </select>
        </div>
      </div>


      {filteredSortedOrders.length === 0 ? (
        <p className="text-gray-600 text-center py-4 bg-white rounded-xl shadow-sm border border-gray-100">No orders match your criteria.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert(`Viewing details for order: ${order.id}`)} // Placeholder: replace with custom modal
                      className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-900 transition-colors duration-200"
                    >
                      <EyeIcon size={16} strokeWidth={1.5} />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Account Settings</h3>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-8 border border-gray-100">
        <div>
          <h4 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <LockIcon size={20} strokeWidth={1.5} />
            <span>Change Password</span>
          </h4>
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" id="confirm-new-password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-base transition-colors duration-200" />
            </div>
            <button type="submit" className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition-all duration-300 shadow-md transform hover:scale-105">
              Update Password
            </button>
          </form>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h4 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <SettingsIcon size={20} strokeWidth={1.5} />
            <span>General Preferences</span>
          </h4>
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <input id="email-notifications" name="notifications" type="checkbox" className="h-5 w-5 text-purple-600 border-gray-300 rounded-md focus:ring-purple-500" defaultChecked />
              <label htmlFor="email-notifications" className="ml-3 block text-base font-medium text-gray-700">Receive email notifications</label>
            </div>
            <div className="flex items-center">
              <input id="sms-notifications" name="notifications" type="checkbox" className="h-5 w-5 text-purple-600 border-gray-300 rounded-md focus:ring-purple-500" />
              <label htmlFor="sms-notifications" className="ml-3 block text-base font-medium text-gray-700">Receive SMS notifications</label>
            </div>
            <div className="flex items-center">
              <input id="dark-mode" name="dark-mode" type="checkbox" className="h-5 w-5 text-purple-600 border-gray-300 rounded-md focus:ring-purple-500" />
              <label htmlFor="dark-mode" className="ml-3 block text-base font-medium text-gray-700">Enable Dark Mode</label>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h4 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <Trash2Icon size={20} strokeWidth={1.5} />
            <span>Danger Zone</span>
          </h4>
          <p className="text-gray-600 mt-2">
            Proceed with caution. These actions are irreversible.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 shadow-md transform hover:scale-105 flex items-center space-x-2"
          >
            <Trash2Icon size={18} strokeWidth={1.5} />
            <span>Delete My Account</span>
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full space-y-6 animate-scale-in">
            <h3 className="text-xl font-bold text-red-700 text-center">Confirm Account Deletion</h3>
            <p className="text-gray-700 text-center">
              Are you absolutely sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 transition-colors duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 lg:p-8 font-inter">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 pt-4 drop-shadow-sm">My Account</h1>

      {/* Message Notification */}
      {message && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-3 transition-all duration-300 ease-out
          ${messageType === 'success' ? 'bg-green-600' : messageType === 'error' ? 'bg-red-600' : 'bg-blue-600'}
          ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          {messageType === 'success' && <CheckCircleIcon size={20} strokeWidth={2} className="text-white" />}
          {messageType === 'error' && <XCircleIcon size={20} strokeWidth={2} className="text-white" />}
          <span className="text-white font-medium text-lg">{message}</span>
        </div>
      )}

      {/* Main Profile Content Area */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        {/* Sidebar / Tabs Navigation */}
        <div className="w-full lg:w-1/4 p-6 bg-gradient-to-b from-purple-700 to-purple-900 text-white lg:rounded-l-3xl rounded-t-3xl lg:rounded-tr-none flex lg:flex-col justify-around lg:justify-start items-center lg:items-start lg:space-y-4 flex-wrap gap-2 lg:gap-4 border-b lg:border-b-0 lg:border-r border-purple-600">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300 transform hover:scale-105 hover:bg-purple-600
              ${activeTab === 'dashboard' ? 'bg-purple-600 shadow-lg ring-2 ring-white' : 'bg-transparent'}`}
          >
            <HomeIcon size={20} strokeWidth={1.5} />
            <span className="font-semibold text-lg">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300 transform hover:scale-105 hover:bg-purple-600
              ${activeTab === 'profile' ? 'bg-purple-600 shadow-lg ring-2 ring-white' : 'bg-transparent'}`}
          >
            <UserIcon size={20} strokeWidth={1.5} />
            <span className="font-semibold text-lg">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300 transform hover:scale-105 hover:bg-purple-600
              ${activeTab === 'orders' ? 'bg-purple-600 shadow-lg ring-2 ring-white' : 'bg-transparent'}`}
          >
            <ListIcon size={20} strokeWidth={1.5} />
            <span className="font-semibold text-lg">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-300 transform hover:scale-105 hover:bg-purple-600
              ${activeTab === 'settings' ? 'bg-purple-600 shadow-lg ring-2 ring-white' : 'bg-transparent'}`}
          >
            <SettingsIcon size={20} strokeWidth={1.5} />
            <span className="font-semibold text-lg">Settings</span>
          </button>
        </div>

        {/* Content Area with Fade-in-from-left transition */}
        <div key={activeTab} className="w-full lg:w-3/4 p-6 sm:p-8 lg:p-10 animate-fade-in-from-left">
          {activeTab === 'dashboard' && renderDashboardSection()}
          {activeTab === 'profile' && renderProfileSection()}
          {activeTab === 'orders' && renderOrdersSection()}
          {activeTab === 'settings' && renderSettingsSection()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
