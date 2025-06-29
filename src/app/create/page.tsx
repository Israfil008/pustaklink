"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !price) return;

    await addDoc(collection(db, "books"), {
      title,
      author,
      price: Number(price),
      createdAt: new Date(),
    });

    setTitle("");
    setAuthor("");
    setPrice("");
    alert("Book added successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-heading mb-6 text-center">Sell a Book</h2>

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-100 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-100 rounded"
        />
        <input
          type="number"
          placeholder="Price (Rs)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-100 rounded"
        />

        <button
          type="submit"
          className="bg-primary text-black w-full py-2 rounded hover:bg-emerald-600 transition"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
}
