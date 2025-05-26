import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Flashcard.css";

const Flashcard = () => {
  const [words, setWords] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
const wordsPerPage = 9;

const currentWords = words.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage);


  useEffect(() => {
    fetchWords();
    fetchFavorites();
  }, []);

 
  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/proxy/finnfast");
      const fetched = response.data.words || response.data;
  
      const formatted = fetched.map((w) => ({
        finnish: w.finnish,
        english: w.english,
        example: w.example,
      }));
  
      setWords(formatted);
      setFlipped(Array(formatted.length).fill(false));
    } catch (err) {
      console.error("Error fetching words:", err);
      setError("Failed to load words.");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/words");
      const favWords = response.data.map((w) => w.finnish);
      setFavorites(favWords);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  
  const saveFavorite = async (wordObj) => {
    try {
      await axios.post("/api/words", {
        finnish: wordObj.finnish,
        english: wordObj.english,
        
        example: wordObj.example || "",
      });
      
  
      setFavorites((prev) => [...prev, wordObj.finnish]);
    } catch (err) {
      console.error("Failed to save word:", err);
    }
  };
  
  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };


return (
  <div className="flashcard-container">
    <h2>Finnish Flashcards</h2>

   
    {error && <p className="error">{error}</p>}

    
    {loading ? (
      <p className="loading">Loading ....</p>
    ) : (
      <>
        <div className="cards-grid">
          {currentWords.map((wordObj, idx) => {
            const realIndex = currentPage * wordsPerPage + idx;
            return (
              <div
                key={realIndex}
                className={`flashcard ${flipped[realIndex] ? "flipped" : ""}`}
                onClick={() => toggleFlip(realIndex)}
              >
                <div className="flashcard-inner">
                  <div className="flashcard-front">{wordObj.finnish}</div>
                  <div className="flashcard-back">
  <div className="finnish-word">
    <strong>English:</strong> {wordObj.english}
  </div>
  <div className="example-sentence">
    <em>{wordObj.example}</em>
  </div>
</div>
                </div>
                <button
                  className="fav-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveFavorite(wordObj);
                  }}
                  disabled={favorites.includes(wordObj.finnish)}
                >
                  {favorites.includes(wordObj.finnish) ? "Saved" : "Favorite"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="pagination-wrapper">
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  (prev + 1) * wordsPerPage < words.length ? prev + 1 : prev
                )
              }
              disabled={(currentPage + 1) * wordsPerPage >= words.length}
            >
              Next
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);


};

export default Flashcard;
