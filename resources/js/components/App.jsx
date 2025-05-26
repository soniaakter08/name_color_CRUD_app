import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Flashcard from "./Flashcard/Flashcard"; 
import FavoriteWords from "./FavoriteWord/FavoriteWord";

function App() {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editId, setEditId] = useState(null);
    const [view, setView] = useState("name-color"); 

    useEffect(() => {
        if (view === "name-color") {
            fetchNameColors();
        }
    }, [view]);

    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch {
            setError("Failed to fetch entries");
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !color) {
            setError("Name and color are required");
            return;
        }

        try {
            if (editId) {
                await axios.put(`/api/name-colors/${editId}`, { name, color });
                setEditId(null);
            } else {
                await axios.post("/api/name-colors", { name, color });
            }

            setName("");
            setColor("");
            fetchNameColors();
            setError(null);
        } catch {
            setError("Failed to save entry");
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setColor(item.color);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
        } catch {
            setError("Failed to delete entry");
        }
    };

    return (
        <div className="container">
            <div className="view-toggle">
                <button
                    className={view === "name-color" ? "active" : ""}
                    onClick={() => setView("name-color")}
                >
                    Name-Color Manager
                </button>
              
            <button
                className={view === "flashcards" ? "active" : ""}  
                onClick={() => setView("flashcards")}
>
                Finnish Flashcards
            </button>


            <button
                className={view === "favorites" ? "active" : ""}
                onClick={() => setView("favorites")}
>
                Favorite Words
            </button>
            </div>
            {view === "name-color" ? (
 
  <>
    <h1 className="heading">Name and Color Manager</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="input"
      />
      <button type="submit" className="add-button">
        {editId ? "Update" : "Add"}
      </button>
    </form>

    <ul className="list">
      {nameColors.map((item) => (
        <li key={item.id} className="list-item">
          <span>{item.name} - {item.color}</span>
          <div>
            <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </>
) : view === "flashcards" ? (
  <Flashcard />
) : view === "favorites" ? (
  <FavoriteWords />
) : null}

        </div>
    );
}

export default App;
