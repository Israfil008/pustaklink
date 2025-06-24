'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = '';

    try {
      // 1. Upload image to Cloudinary (if selected)
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'pustaklink'); // replace this
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dq5jlquuj/image/upload',
          formData
        );
        imageUrl = res.data.secure_url;
      }

      // 2. Save form data to Firestore
      await addDoc(collection(db, 'books'), {
        title,
        author,
        price,
        level,
        location,
        contact,
        imageUrl,
      });

      alert('Book added successfully!');
      setTitle('');
      setAuthor('');
      setPrice('');
      setLevel('');
      setLocation('');
      setContact('');
      setImage(null);
    } catch (error) {
      alert('Upload failed: ' + error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Add a Book for Sale</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input className="w-full p-3 border rounded" type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="w-full p-3 border rounded" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className="w-full p-3 border rounded" type="number" placeholder="Price (Rs)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input className="w-full p-3 border rounded" type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
        <input className="w-full p-3 border rounded" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className="w-full p-3 border rounded" type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <input className="w-full p-3 border rounded" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400">
          {loading ? 'Uploading...' : 'Submit Book'}
        </button>
      </form>
    </main>
  );
}
