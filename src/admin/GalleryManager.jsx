import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Upload, X, Loader } from 'lucide-react';
import API_URL from '../api/config';
import { useAdmin } from '../context/AdminContext';

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const { token } = useAdmin();

  // Fetch images from backend
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const response = await fetch(`${API_URL}/gallery/upload`, {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });

      if (response.ok) {
        await fetchImages(); // Refresh gallery
      } else {
        const error = await response.json();
        alert(error.message || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        await fetchImages(); // Refresh gallery
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Error deleting image');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <Loader className="animate-spin mx-auto" size={32} />
        <p className="mt-2 text-gray-500">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#0e2540]">Gallery Manager</h3>
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 bg-[#0e2540] text-white rounded-lg hover:bg-[#1a3a5c] transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader size={18} className="animate-spin" /> : <Upload size={18} />}
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Upload size={48} className="mx-auto mb-3 opacity-50" />
          <p>No images uploaded yet</p>
          <p className="text-sm">Click "Upload Images" to add photos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200">
              <img src={img.url} alt={img.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-600 p-2 truncate">{img.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}