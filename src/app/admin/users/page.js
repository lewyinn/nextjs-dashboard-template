'use client';
import { useSidebar } from '@/context/SidebarContext';
import {
    Menu,
    Search,
    User,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit,
    Trash2,
    SearchIcon,
    CardSim,
    PlusSquare
} from 'lucide-react';
import Link from 'next/link';
import React, { useState, useMemo, useEffect, useRef } from 'react';

export default function DashboardPage() {
    const { setSidebarOpen } = useSidebar();

    // Sample data
    const [data] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', date: '2024-01-15', revenue: 5200 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', date: '2024-01-14', revenue: 3800 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', status: 'Inactive', date: '2024-01-13', revenue: 7500 },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', date: '2024-01-12', revenue: 2100 },
        { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Admin', status: 'Active', date: '2024-01-11', revenue: 6300 },
        { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'User', status: 'Pending', date: '2024-01-10', revenue: 1900 },
        { id: 7, name: 'Chris Anderson', email: 'chris@example.com', role: 'Manager', status: 'Active', date: '2024-01-09', revenue: 8200 },
        { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', role: 'User', status: 'Inactive', date: '2024-01-08', revenue: 4600 },
        { id: 9, name: 'Robert Miller', email: 'robert@example.com', role: 'Admin', status: 'Active', date: '2024-01-07', revenue: 5800 },
        { id: 10, name: 'Jennifer Garcia', email: 'jennifer@example.com', role: 'User', status: 'Active', date: '2024-01-06', revenue: 3200 },
        { id: 11, name: 'Kevin Martinez', email: 'kevin@example.com', role: 'Manager', status: 'Pending', date: '2024-01-05', revenue: 7100 },
        { id: 12, name: 'Amanda Rodriguez', email: 'amanda@example.com', role: 'User', status: 'Active', date: '2024-01-04', revenue: 2800 },
        { id: 13, name: 'Daniel Lewis', email: 'daniel@example.com', role: 'Admin', status: 'Inactive', date: '2024-01-03', revenue: 6900 },
        { id: 14, name: 'Michelle Walker', email: 'michelle@example.com', role: 'User', status: 'Active', date: '2024-01-02', revenue: 4100 },
        { id: 15, name: 'James Hall', email: 'james@example.com', role: 'Manager', status: 'Active', date: '2024-01-01', revenue: 8500 }
    ]);

    // State untuk fitur table
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Effect untuk menangani klik di luar dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fungsi sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Fungsi filter dan search
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.revenue.toString().includes(searchTerm);
            return matchesSearch;
        });
    }, [data, searchTerm]);

    // Fungsi sorting data
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === 'string') {
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortDirection === 'asc'
                    ? aValue - bValue
                    : bValue - aValue;
            }
        });
    }, [filteredData, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusColors = {
            'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Inactive': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                {status}
            </span>
        );
    };

    // Role badge component
    const RoleBadge = ({ role }) => {
        const roleColors = {
            'Admin': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'Manager': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'User': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>
                {role}
            </span>
        );
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm px-4 sm:px-6 py-4 transition-colors">
                <div className="flex items-center justify-between gap-3">
                    {/* Left Side */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <nav className="text-sm text-gray-500 dark:text-gray-400">
                                <span>Admin</span>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">
                                    Dashboard
                                </span>
                            </nav>
                        </div>
                    </div>

                    {/* Dropdown Profile */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:ring-2 ring-blue-500 transition">
                            <User className="w-5 h-5" />
                        </button>

                        {/* Dropdown animated */}
                        <div
                            className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 ease-out origin-top-right ${dropdownOpen
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                            </div>
                            <button
                                onClick={() => alert('Logging out...')}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-600/10 transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row sm:justify-between mb-6">
                    <div className="flex flex-row md:flex-col-reverse justify-between items-start w-full sm:w-auto gap-0 md:gap-2 mb-4 md:mb-0">
                        <div className="flex flex-col gap-0 md:gap-1">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                                User Management
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Manage your users efficiently
                            </p>
                        </div>
                        <Link href={'/admin/users/create'} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusSquare className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Add User</span>
                        </Link>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="sm:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                        <SearchIcon className="w-4 h-4" />
                        <span>Search Feature</span>
                    </button>
                </div>

                {/* Search and Filters */}
                <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 transition-colors ${showMobileSearch ? 'block' : 'hidden sm:block'}`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th
                                        onClick={() => handleSort('name')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Name</span>
                                            {sortField === 'name' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('email')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Email</span>
                                            {sortField === 'email' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('role')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Role</span>
                                            {sortField === 'role' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('status')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Status</span>
                                            {sortField === 'status' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('date')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Date</span>
                                            {sortField === 'date' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('revenue')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Revenue</span>
                                            {sortField === 'revenue' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="w-4 h-4" /> :
                                                    <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <RoleBadge role={item.role} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {item.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            ${item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center space-x-2 justify-end">
                                                <button className="text-blue-600 hover:text-blue-700 p-1 cursor-pointer">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-700 p-1 cursor-pointer">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-700 p-1 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden">
                        {paginatedData.map((item) => (
                            <div key={item.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.email}
                                        </p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <CardSim className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Role</p>
                                        <RoleBadge role={item.role} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                        <StatusBadge status={item.status} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                        <p className="text-sm text-gray-900 dark:text-white">{item.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            ${item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer">
                                        <Eye className="w-4 h-4" />
                                        <span>View</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm cursor-pointer">
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm cursor-pointer">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        if (totalPages <= 5) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 text-sm rounded-md hover:cursor-pointer ${currentPage === page
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`}>
                                                    {page}
                                                </button>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}