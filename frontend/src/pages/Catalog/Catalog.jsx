import { useState } from "react";
import "./Catalog.css";
import BookCard from "../../components/Bookcard/Bookcard";
import { Search } from "lucide-react";
import NotFound from "../NotFound/NotFound";


function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, image: "/assets/books/book1.jpg", title: "The Count of Monte Cristo", author: "Robin Buss", available: true, price: 425, originalPrice: 599, discount: 29, rating: 5 },
    { id: 2, image: "/assets/books/book2.jpg", title: "Vagabond (VIZBIG Edition), Vol. 1", author: "Takehiko Inoue", available: true, price: 1692, originalPrice: 2564, discount: 34, rating: 5 },
    { id: 3, image: "/assets/books/book3.jpg", title: "Vagabond Definitive Edition, Vol. 1", author: "Takehiko Inoue", available: true, price: 2271, originalPrice: 3199, discount: 29, rating: 5 },
    { id: 4, image: "/assets/books/book4.jpg", title: "Superman: Birthright", author: "Mark Waid", available: true, price: 527, originalPrice: 850, discount: 38, rating: 4 },
    { id: 5, image: "/assets/books/book5.jpg", title: "Only Dull People Are Brilliant at Breakfast", author: "Oscar Wilde", available: true, price: 171, originalPrice: 199, discount: 14, rating: 5 },
    { id: 6, image: "/assets/books/book6.jpg", title: "Batman: The Court of Owls Saga", author: "Greg Capullo", available: true, price: 888, originalPrice: 1153, discount: 23, rating: 5 },
    { id: 7, image: "/assets/books/book7.jpg", title: "Jujutsu Kaisen, Vol. 26", author: "Gege Akutami", available: true, price: 725, originalPrice: 1098, discount: 34, rating: 5 },
    { id: 8, image: "/assets/books/book8.jpg", title: "Goodbye, Eri", author: "Tatsuki Fujimoto", available: true, price: 650, originalPrice: 800, discount: 18, rating: 4 },
    { id: 9, image: "/assets/books/book9.jpg", title: "Vagabond (VIZBIG Edition), Vol. 2", author: "Takehiko Inoue", available: true, price: 1692, originalPrice: 2564, discount: 34, rating: 5 },
    { id: 10, image: "/assets/books/book10.jpg", title: "Army of None", author: "Paul Scharre", available: true, price: 1200, originalPrice: 1500, discount: 20, rating: 4 },
    { id: 11, image: "/assets/books/book11.jpg", title: "Can't Hurt Me", author: "David Goggins", available: true, price: 950, originalPrice: 1100, discount: 13, rating: 5 },
    { id: 12, image: "/assets/books/book12.jpg", title: "Berserk Deluxe Volume 1", author: "Kentaro Miura", available: true, price: 3500, originalPrice: 4500, discount: 22, rating: 5 },
    { id: 13, image: "/assets/books/book13.jpg", title: "Everyday Chaos", author: "David Weinberger", available: true, price: 800, originalPrice: 1000, discount: 20, rating: 4 },
    { id: 14, image: "/assets/books/book14.jpg", title: "Berserk Deluxe Volume 2", author: "Duane Johnson", available: true, price: 3500, originalPrice: 4500, discount: 22, rating: 5 },
    { id: 15, image: "/assets/books/book15.jpg", title: "Manipal Manual of Surgery", author: "K. R. Shenoy", available: true, price: 1500, originalPrice: 1800, discount: 16, rating: 4 },
    { id: 16, image: "/assets/books/book16.jpg", title: "The Satanic Verses", author: "Salman Rushdie", available: true, price: 900, originalPrice: 1100, discount: 18, rating: 5 },
    { id: 17, image: "/assets/books/book17.jpg", title: "White Nights", author: "Ronald Meyer", available: true, price: 400, originalPrice: 500, discount: 20, rating: 4 },
    { id: 18, image: "/assets/books/book18.jpg", title: "Manipal Manual of Surgery", author: "K. R. Shenoy", available: true, price: 1500, originalPrice: 1800, discount: 16, rating: 4 },
    { id: 19, image: "/assets/books/book19.jpg", title: "Kagurabachi, Vol. 1", author: "Takeru Hokazono", available: true, price: 600, originalPrice: 800, discount: 25, rating: 5 },
    { id: 20, image: "/assets/books/book20.jpg", title: "Kagurabachi, Vol. 2", author: "Takeru Hokazono", available: true, price: 600, originalPrice: 800, discount: 25, rating: 5 },
    { id: 21, image: "/assets/books/book21.jpg", title: "Batman: Dark Victory", author: "Tim Sale", available: true, price: 1200, originalPrice: 1500, discount: 20, rating: 5 },
    { id: 22, image: "/assets/books/book22.jpg", title: "Look Back", author: "Tatsuki Fujimoto", available: true, price: 500, originalPrice: 700, discount: 28, rating: 5 },
    { id: 23, image: "/assets/books/book23.jpg", title: "The Silent Patient", author: "Alex Michaelides", available: true, price: 450, originalPrice: 600, discount: 25, rating: 4 },
    { id: 24, image: "/assets/books/book24.jpg", title: "Crime and Punishment", author: "David McDuff", available: true, price: 400, originalPrice: 550, discount: 27, rating: 5 },
    { id: 25, image: "/assets/books/book25.jpg", title: "The Almanack Of Naval Ravikant", author: "Eric Jorgenson", available: true, price: 400, originalPrice: 500, discount: 20, rating: 5 },
    { id: 26, image: "/assets/books/book26.jpg", title: "The Hard Thing About Hard Things", author: "Ben Horowitz", available: true, price: 900, originalPrice: 1200, discount: 25, rating: 4 },
    { id: 27, image: "/assets/books/book27.jpg", title: "Word Power Made Easy", author: "Norman Lewis", available: true, price: 150, originalPrice: 200, discount: 25, rating: 5 },
    { id: 28, image: "/assets/books/book28.jpg", title: "Influence: The Psychology of Persuasion", author: "Robert B. Cialdini", available: true, price: 700, originalPrice: 900, discount: 22, rating: 4 },
    { id: 29, image: "/assets/books/book29.jpg", title: "Psycho-Cybernetics", author: "Maxwell Maltz", available: true, price: 500, originalPrice: 700, discount: 28, rating: 5 },
    { id: 30, image: "/assets/books/book30.jpg", title: "Godaan", author: "Munshi Premchand", available: true, price: 200, originalPrice: 250, discount: 20, rating: 5 },
    { id: 31, image: "/assets/books/book31.jpg", title: "The Iliad & the Odyssey", author: "Homer", available: true, price: 1200, originalPrice: 1600, discount: 25, rating: 5 }
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
          <NotFound />
        )}
      </div>
    </div>
  );
}

export default Catalog;
