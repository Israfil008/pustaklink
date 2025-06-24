export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-5xl font-bold text-center mb-6">PustakLink</h1>

      <p className="text-2xl italic text-center text-gray-600 max-w-xl">
        "You always buy a book by judging its cover."
      </p>

      <button className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
        Start Buying or Selling
      </button>
    </main>
  );
}
