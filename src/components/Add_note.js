import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const AddNote = () => {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    const addNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/users`, {
                username,
                status,
                email,
                note,
                deadline,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={addNote}>
                <div className="field p-4">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="e.g Alex Smith"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field p-4">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="e.g. alexsmith@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="control p-4">
                    <strong>Status  </strong>
                    <label className="radio">
                        <input
                            type="radio"
                            name="status"
                            value="Done"
                            checked={status === "Done"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Done
                    </label>
                    <label className="radio p-4">
                        <input
                            type="radio"
                            name="status"
                            value="OnGoing"
                            checked={status === "OnGoing"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        OnGoing
                    </label>
                </div>

                <div className="field p-4">
                    <textarea
                        className="textarea is-info"
                        placeholder="note here"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>

                <div className="field p-4">
                    <input
                        className="input"
                        type="date"
                        placeholder="Deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <div className="control">
                    <button className="button is-primary" type="submit" onClick={() => navigate("/card_list")}>                    
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddNote;
