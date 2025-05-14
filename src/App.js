import {BrowserRouter ,Routes, Route} from "react-router-dom";
import NoteCardList from "./components/note_card_list.js";
import AddNote from "./components/Add_note.js";
import EditNote from "./components/edit_note.js";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteCardList />} />
          <Route path="/add_note" element={<AddNote />} />
          <Route path="/edit_note/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
