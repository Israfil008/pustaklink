'use client';

import { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  level: string;
  location: string;
  contact: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

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

  return (
    <main className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">📚 PustakLink</h1>
      <p className="text-xl italic text-center mb-10 text-gray-600">
        &quot;You always buy a book by judging its cover.&quot;
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author || 'Unknown'}</p>
            <p className="text-lg font-bold text-green-700 mt-2">Rs {book.price}</p>
            <p className="text-sm mt-1">📘 Level: {book.level}</p>
            <p className="text-sm">📍 Location: {book.location}</p>
            <p className="text-sm">📞 Contact: {book.contact}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
