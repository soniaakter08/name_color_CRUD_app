import { useEffect, useState } from "react";
import axios from "axios";
import "./FavoriteWord.css";

const FavoriteWord = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/api/words");
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorite words:", err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorite-wrapper">
      <h2>Favorite Words</h2>
      {favorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        <ul>
          {favorites.map((word) => (
            <li key={word.id}>
              <strong>{word.finnish}</strong> = {word.english}
              {word.example && <em>{word.example}</em>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteWord;
