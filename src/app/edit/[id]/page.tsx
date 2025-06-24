'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(true);

  // Load existing book data
  useEffect(() => {
    const loadBook = async () => {
      const docRef = doc(db, 'books', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price);
        setLevel(data.level);
        setLocation(data.location);
        setContact(data.contact);
      }
      setLoading(false);
    };
    if (id) loadBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, 'books', id as string);
    await updateDoc(docRef, {
      title,
      author,
      price,
      level,
      location,
      contact,
    });
    alert('Book updated!');
    router.push('/mybooks');
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Book</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input className="w-full p-3 border rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="w-full p-3 border rounded" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className="w-full p-3 border rounded" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input className="w-full p-3 border rounded" type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
        <input className="w-full p-3 border rounded" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className="w-full p-3 border rounded" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Update Book</button>
      </form>
    </main>
  );
}
