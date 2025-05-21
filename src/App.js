import {BrowserRouter ,Routes, Route} from "react-router-dom";
import NoteCardList from "./components/note_card_list.js";
import AddNote from "./components/Add_note.js";
import EditNote from "./components/edit_note.js";
import Login from "./components/login_notes.js";
import Register from "./components/register_note.js";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/card_list" element={<NoteCardList />} />
          <Route path="/add_note" element={<AddNote />} />
          <Route path="/edit_note/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
