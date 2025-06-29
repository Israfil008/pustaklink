export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-gray-100 px-6 py-12 text-center">
      <h1 className="text-4xl font-heading mb-4">📚 PustakLink</h1>
      <p className="text-lg font-body text-gray-300 italic">
        "You always buy a book by judging its cover."
      </p>

      <div className="mt-10">
        <button className="bg-primary text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-emerald-600 transition">
          Explore Books
        </button>
      </div>
    </div>
  );
}
