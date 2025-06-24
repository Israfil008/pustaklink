'use client';

import { useState } from 'react';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, author, price, level, location, contact });
    // 🔥 Here we'll later add Firebase upload
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Add a Book for Sale</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          className="w-full p-3 border rounded"
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded"
          type="number"
          placeholder="Price (Rs)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded"
          type="text"
          placeholder="Level (Class 10/11/12, Entrance, etc.)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded"
          type="text"
          placeholder="Location (e.g. Pokhara)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded"
          type="text"
          placeholder="Contact (Phone or WhatsApp)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Submit Book
        </button>
      </form>
    </main>
  );
}
