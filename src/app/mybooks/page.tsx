'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import Image from 'next/image';

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

export default function MyBooksPage() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserBooks = async () => {
        const q = query(collection(db, 'books'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        const myBooks: Book[] = [];
        snapshot.forEach((doc) => {
          myBooks.push({ id: doc.id, ...doc.data() } as Book);
        });
        setBooks(myBooks);
        setLoading(false);
      };
      fetchUserBooks();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this book?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'books', id));
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      alert('Failed to delete book.');
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Please log in to view your books.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 My Uploaded Books</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">You haven't uploaded any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white relative"
            >
              {book.imageUrl && (
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-lg font-bold text-green-700 mt-2">Rs {book.price}</p>
              <p className="text-sm mt-1">📘 Level: {book.level}</p>
              <p className="text-sm">📍 {book.location}</p>
              <p className="text-sm">📞 {book.contact}</p>

              <button
                onClick={() => handleDelete(book.id)}
                className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
