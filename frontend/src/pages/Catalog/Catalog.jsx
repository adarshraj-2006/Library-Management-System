import { useState, useEffect } from "react";
import "./Catalog.css";
import BookCard from "../../components/Bookcard/Bookcard";
import { Search, Loader2, BookOpen } from "lucide-react";
import NotFound from "../NotFound/NotFound";
import BookDetails from "../../components/Bookdetails/Bookdetails";
import API from "../../services/api";
import toast from "react-hot-toast";

function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      console.log("Catalog API Response:", res.data);
      setBooks(res.data.data.books);
    } catch (err) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    // Real-time search if needed
    try {
      const res = await API.get(`/books?search=${e.target.value}`);
      setBooks(res.data.data.books);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="catalog">
      <div className="catalog-header animate-fade-in">
        <div className="header-content">
          <BookOpen className="header-icon" />
          <h2 className="catalog-title">"A room without books is like a body without a soul."</h2>
        
        </div>

        <div className="search-container">
          <div className="search-bar">
            <Search size={22} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="results-count">
            {loading ? "..." : books.length} books found
          </div>
        </div>
      </div>

      {loading ? (
        <div className="catalog-loading">
          <Loader2 className="animate-spin" size={40} />
          <p>Curating the collection...</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="book-card-wrapper"
                onClick={() => setSelectedBook(book)}
              >
                <BookCard
                  {...book}
                />
              </div>
            ))
          ) : (
            <div className="no-results">
              <NotFound />
              <button className="clear-search" onClick={() => { setSearchTerm(""); fetchBooks(); }}>
                View All Books
              </button>
            </div>
          )}
        </div>
      )}

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onBack={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default Catalog;
