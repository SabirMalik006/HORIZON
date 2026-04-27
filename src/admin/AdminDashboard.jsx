import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import GalleryManager from './GalleryManager';
import ContentManager from './ContentManager';
import ServicesManager from './ServicesManager';
import { LogOut, Image, FileText, Grid, ExternalLink, Loader } from 'lucide-react';

export default function AdminDashboard() {
    const { logout, isAuthenticated } = useAdmin();
    const [activeTab, setActiveTab] = useState('services');

    if (!isAuthenticated) {
        return null; // Will redirect via ProtectedRoute
    }

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Admin Header */}
            <div className="bg-[#0e2540] text-white py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <a
                        href="/"
                        
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm font-medium border border-white/20 hover:border-white/40"
                    >
                        <ExternalLink size={14} />
                        Continue to Main Page
                    </a>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="max-w-8xl mx-auto px-6 py-8">
                <div className="flex justify-center gap-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${activeTab === 'services'
                                ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Grid size={18} />
                        Services Manager
                    </button>
                </div>

                {activeTab === 'content' && <ContentManager />}
                {activeTab === 'services' && <ServicesManager />}
                {activeTab === 'gallery' && <GalleryManager />}
            </div>
        </div>
    );
}