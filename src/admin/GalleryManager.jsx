import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Upload, X, Loader, Edit3, Check, XCircle } from 'lucide-react';
import { API_URL, MEDIA_URL } from '../api/config';
import { useAdmin } from '../context/AdminContext';

const getImageSrc = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${MEDIA_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState({ show: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });
  const [confirmAllModal, setConfirmAllModal] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const fileInputRef = useRef(null);
  const editInputRef = useRef(null);
  const { token } = useAdmin();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

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
        headers: { 'x-auth-token': token },
        body: formData
      });

      if (response.ok) {
        await fetchImages();
        setModal({ show: true, message: 'Image uploaded successfully!', type: 'success' });
      } else {
        const error = await response.json();
        setModal({ show: true, message: error.message || 'Upload failed', type: 'error' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setModal({ show: true, message: 'Error uploading image', type: 'error' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const startEditing = (img) => {
    setEditingId(img._id);
    setEditTitle(img.title || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveTitle = async (id) => {
    if (!editTitle.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ title: editTitle.trim() })
      });

      if (response.ok) {
        await fetchImages();
        setModal({ show: true, message: 'Title updated successfully!', type: 'success' });
      } else {
        const error = await response.json();
        setModal({ show: true, message: error.message || 'Failed to update title', type: 'error' });
      }
    } catch (err) {
      console.error('Update error:', err);
      setModal({ show: true, message: 'Error updating title', type: 'error' });
    } finally {
      setSaving(false);
      setEditingId(null);
      setEditTitle('');
    }
  };

  const removeImage = async (id) => {
    setDeleting(id);
    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      const data = await response.json();

      if (response.ok) {
        await fetchImages();
        setModal({ show: true, message: 'Image deleted successfully!', type: 'success' });
      } else {
        console.error('Delete error:', data);
        setModal({ show: true, message: data.message || 'Failed to delete image', type: 'error' });
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setModal({ show: true, message: 'Error deleting image', type: 'error' });
    } finally {
      setDeleting(null);
      setConfirmModal({ show: false, id: null });
    }
  };

  const deleteAllImages = async () => {
    setDeletingAll(true);
    try {
      const response = await fetch(`${API_URL}/gallery/all`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      const data = await response.json();

      if (response.ok) {
        setImages([]);
        setModal({ show: true, message: 'All images deleted successfully!', type: 'success' });
      } else {
        setModal({ show: true, message: data.message || 'Failed to delete all images', type: 'error' });
      }
    } catch (err) {
      console.error('Delete all error:', err);
      setModal({ show: true, message: 'Error deleting all images', type: 'error' });
    } finally {
      setDeletingAll(false);
      setConfirmAllModal(false);
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
        <div className="flex gap-2">
          {images.length > 0 && (
            <button
              onClick={() => setConfirmAllModal(true)}
              disabled={deletingAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deletingAll ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
              {deletingAll ? 'Deleting...' : 'Delete All'}
            </button>
          )}
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#0e2540] text-white rounded-lg hover:bg-[#1a3a5c] transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader size={18} className="animate-spin" /> : <Upload size={18} />}
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
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
            <div key={img._id} className="relative group rounded-lg overflow-hidden border border-gray-200">
              <img
                src={getImageSrc(img.url)}
                alt={img.title}
                className="w-full h-32 object-cover"
                onError={(e) => { e.target.src = ''; e.target.alt = 'Image not found'; }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => startEditing(img)}
                  className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => setConfirmModal({ show: true, id: img._id })}
                  disabled={deleting === img._id}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {deleting === img._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
              {editingId === img._id ? (
                <div className="p-2 flex gap-1">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 text-xs border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:border-blue-400"
                    onKeyDown={(e) => { if (e.key === 'Enter') saveTitle(img._id); if (e.key === 'Escape') cancelEditing(); }}
                  />
                  <button onClick={() => saveTitle(img._id)} disabled={saving} className="text-green-600 hover:text-green-700">
                    {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                  </button>
                  <button onClick={cancelEditing} className="text-red-600 hover:text-red-700">
                    <XCircle size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-gray-600 p-2 truncate">{img.title}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {confirmAllModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#0e2540] mb-3">Delete All Images</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete all {images.length} images? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmAllModal(false)}
                disabled={deletingAll}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteAllImages}
                disabled={deletingAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deletingAll ? 'Deleting...' : 'Delete All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#0e2540] mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this image? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmModal({ show: false, id: null })}
                disabled={deleting !== null}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => removeImage(confirmModal.id)}
                disabled={deleting !== null}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting === confirmModal.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                modal.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`text-lg font-bold ${
                  modal.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {modal.type === 'success' ? '✓' : '✕'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#0e2540]">
                {modal.type === 'success' ? 'Success' : 'Error'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">{modal.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setModal({ show: false, message: '', type: 'success' })}
                className="px-6 py-2 bg-[#0e2540] text-white rounded-lg hover:bg-[#1a3a5c] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}