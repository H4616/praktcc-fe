import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const EditNote = () => {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); // Ambil ID dari URL

    // Ambil data lama untuk di-edit
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/${id}`);
                setUsername(response.data.username);
                setStatus(response.data.status);
                setEmail(response.data.email);
                setNote(response.data.note);
                setDeadline(response.data.deadline);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };
        fetchNote();
    }, [id]);

    // Fungsi edit data
    const editNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/users/${id}`, {
                username,
                status,
                email,
                note,
                deadline,
            });
            navigate("/card_list");
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <>
            <form onSubmit={editNote} className="box p-5">
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
                    <strong>Status </strong>
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
                    <label className="radio ml-3">
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
                    <button className="button is-primary" type="submit">     
                        Update Note
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditNote;
