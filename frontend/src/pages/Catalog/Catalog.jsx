import { useState } from "react";
import "./Catalog.css";
import BookCard from "../../components/Bookcard/Bookcard";
import { Search } from "lucide-react";


function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, image: "/assets/books/book1.jpg", title: "The Count of Monte Cristo", author: "Robin Buss", available: true },
    { id: 2, image: "/assets/books/book2.jpg", title: "Vagabond (VIZBIG Edition), Vol. 1", author: "Takehiko Inoue", available: true },
    { id: 3, image: "/assets/books/book3.jpg", title: "Vagabond Definitive Edition, Vol. 1", author: "Takehiko Inoue", available: true },
    { id: 4, image: "/assets/books/book4.jpg", title: "Superman: Birthright", author: "Mark Waid", available: true },
    { id: 5, image: "/assets/books/book5.jpg", title: "Only Dull People Are Brilliant at Breakfast", author: "Oscar Wilde", available: true },
    { id: 6, image: "/assets/books/book6.jpg", title: "Batman: The Court of Owls Saga", author: "Greg Capullo", available: true },
    { id: 7, image: "/assets/books/book7.jpg", title: "Jujutsu Kaisen, Vol. 26", author: "Gege Akutami", available: true },
    { id: 8, image: "/assets/books/book8.jpg", title: "Goodbye, Eri", author: "Tatsuki Fujimoto", available: true },
    { id: 9, image: "/assets/books/book9.jpg", title: "Vagabond (VIZBIG Edition), Vol. 2", author: "Takehiko Inoue", available: true },
    { id: 10, image: "/assets/books/book10.jpg", title: "Army of None", author: "Paul Scharre", available: true },
    { id: 11, image: "/assets/books/book11.jpg", title: "Can't Hurt Me", author: "David Goggins", available: true },
    { id: 12, image: "/assets/books/book12.jpg", title: "Berserk Deluxe Volume 1", author: "Kentaro Miura", available: true },
    { id: 13, image: "/assets/books/book13.jpg", title: "Everyday Chaos", author: "David Weinberger", available: true },
    { id: 14, image: "/assets/books/book14.jpg", title: "Berserk Deluxe Volume 2", author: "Duane Johnson", available: true },
    { id: 15, image: "/assets/books/book15.jpg", title: "Manipal Manual of Surgery", author: "K. R. Shenoy", available: true },
    { id: 16, image: "/assets/books/book16.jpg", title: "The Satanic Verses", author: "Salman Rushdie", available: true },
    { id: 17, image: "/assets/books/book17.jpg", title: "White Nights", author: "Ronald Meyer", available: true },
    { id: 18, image: "/assets/books/book18.jpg", title: "Manipal Manual of Surgery", author: "K. R. Shenoy", available: true },
    { id: 19, image: "/assets/books/book19.jpg", title: "Kagurabachi, Vol. 1", author: "Takeru Hokazono", available: true },
    { id: 20, image: "/assets/books/book20.jpg", title: "Kagurabachi, Vol. 2", author: "Takeru Hokazono", available: true },
    { id: 21, image: "/assets/books/book21.jpg", title: "Batman: Dark Victory", author: "Tim Sale", available: true },
    { id: 22, image: "/assets/books/book22.jpg", title: "Look Back", author: "Tatsuki Fujimoto", available: true },
    { id: 23, image: "/assets/books/book23.jpg", title: "The Silent Patient", author: "Alex Michaelides", available: true },
    { id: 24, image: "/assets/books/book24.jpg", title: "Crime and Punishment", author: "David McDuff", available: true },
    { id: 25, image: "/assets/books/book25.jpg", title: "The Almanack Of Naval Ravikant", author: "Eric Jorgenson", available: true },
    { id: 26, image: "/assets/books/book26.jpg", title: "The Hard Thing About Hard Things", author: "Ben Horowitz", available: true },
    { id: 27, image: "/assets/books/book27.jpg", title: "Word Power Made Easy", author: "Norman Lewis", available: true },
    { id: 28, image: "/assets/books/book28.jpg", title: "Influence: The Psychology of Persuasion", author: "Robert B. Cialdini", available: true },
    { id: 29, image: "/assets/books/book29.jpg", title: "Psycho-Cybernetics", author: "Maxwell Maltz", available: true },
    { id: 30, image: "/assets/books/book30.jpg", title: "Godaan", author: "Munshi Premchand", available: true },
    { id: 31, image: "/assets/books/book31.jpg", title: "The Iliad & the Odyssey", author: "Homer", available: true }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog">
      <div className="catalog-header">
        <h2 className="catalog-title">Explore Our Collection</h2>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="catalog-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))
        ) : (
          <div className="no-results">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
