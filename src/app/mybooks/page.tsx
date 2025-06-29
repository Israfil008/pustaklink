"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

export default function MyBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"));
      const fetchedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];

      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-100 p-6">
      <h2 className="text-3xl font-heading mb-6">My Uploaded Books</h2>
      {books.length === 0 ? (
        <p className="text-gray-400">No books uploaded yet.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="bg-gray-800 p-4 rounded shadow-sm transition hover:bg-gray-700"
            >
              <h3 className="font-heading text-xl">{book.title}</h3>
              <p className="text-gray-300">{book.author}</p>
              <p className="text-accent mt-2 font-semibold">Rs {book.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
