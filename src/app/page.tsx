'use client';

import { useEffect, useState } from 'react';
import { db, auth, provider } from './lib/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  level: string;
  location: string;
  contact: string;
  imageUrl?: string;
  uid?: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const bookList: Book[] = [];
      querySnapshot.forEach((doc) => {
        bookList.push({ id: doc.id, ...doc.data() } as Book);
      });
      setBooks(bookList);
    };

    fetchBooks();
  }, []);

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.level.toLowerCase().includes(search.toLowerCase());

    const matchLocation = locationFilter
      ? book.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    return matchSearch && matchLocation;
  });

  return (
    <main className="min-h-screen p-6 bg-white text-gray-800">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">📚 PustakLink</h1>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout ({user.displayName})
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded"
          >
            Login with Google
          </button>
        )}
      </div>

      <p className="text-xl italic text-center mb-6 text-gray-600">
        &quot;You always buy a book by judging its cover.&quot;
      </p>

      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title, author, or level"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by location (e.g., Kathmandu)"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="flex-1 p-3 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white"
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">
                by {book.author || 'Unknown'}
              </p>
              <p className="text-lg font-bold text-green-700 mt-2">
                Rs {book.price}
              </p>
              <p className="text-sm mt-1">📘 Level: {book.level}</p>
              <p className="text-sm">📍 Location: {book.location}</p>
              <p className="text-sm">📞 Contact: {book.contact}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No books found
          </p>
        )}
      </div>
    </main>
  );
}
