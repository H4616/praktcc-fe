import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const NoteCardList = ({ id }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const response = await axios.get(`${BASE_URL}/users`);
		setUsers(response.data);
	};
	const navigate = useNavigate();

	// Fungsi untuk navigasi ke halaman edit
	const handleEdit = (id) => {
		navigate(`/edit_note/${id}`);
	};

	// Fungsi untuk menandai sebagai Done
	const markAsDone = async (id) => {
		try {
			await axios.patch(`${BASE_URL}/users/${id}`, { status: "Done" });
			window.location.reload(); // Refresh halaman setelah perubahan
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	// Fungsi untuk menghapus data
	const deleteNote = async (id) => {
		try {
			await axios.delete(`${BASE_URL}/users/${id}`);
			window.location.reload(); // Refresh halaman setelah menghapus
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	};

	return (
		<>
			{users
				.slice() // Buat salinan array agar tidak mengubah data asli saat diurutkan
				.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Urutkan berdasarkan deadline (terdekat dulu)
				.map((user, index) => (
					<div
						className="card box"
						key={user.id}
						style={{ marginBottom: "10px" }}
					>
						<header className="card-header">
							<p className="card-header-title">Deadline {user.deadline}</p>
							<span
								className="card-header-email"
								style={{ marginLeft: "auto", fontWeight: "bold" }}
							>
								{user.email}
							</span>
							<button className="card-header-icon" aria-label="more options">
								<span className="icon">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</header>
						<div className="card-content">
							<div className="content">
								{user.note}
								<br />
								<br />
								<p>Created by: {user.username}</p>
								<time> {user.createdAt.split("T")[0]}</time>
								<p>
									<strong>Status: {user.status}</strong>
								</p>
							</div>
						</div>
						<footer className="card-footer">
							<button
								className="card-footer-item button is-info"
								onClick={() => handleEdit(user.id)} // Menggunakan user.id
							>
								Edit
							</button>
							<button
								className="card-footer-item button is-success"
								onClick={() => markAsDone(user.id)} // Menggunakan user.id
							>
								Done
							</button>
							<button
								className="card-footer-item button is-danger"
								onClick={() => deleteNote(user.id)} // Menggunakan user.id
							>
								Delete
							</button>
						</footer>
					</div>
				))}

			<div>
				<button className="button is-primary" onClick={() => navigate('/add_note')}>Add Note</button>
			</div>
		</>
	);
};

export default NoteCardList;
