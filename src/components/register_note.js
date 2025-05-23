import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	const Register = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${BASE_URL}/register`, {
				name: username,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			});
			navigate("/login");
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.msg);
			}
		}
	};
	return (
		<section className="hero has-background-grey-light is-fullheight is-fullwidth">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4-desktop">
							
							<form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
								<div className="field mt-5">
									<label className="label">Name</label>
									<div className="control">
										<input
											className="input"
											type="text"
											placeholder="Enter your name"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
								</div>
								<div className="field mt-5">
									<label className="label">Email</label>
									<div className="control">
										<input
											className="input"
											type="email"
											placeholder="Enter your email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>
								<div className="field mt-5">
									<label className="label">Password</label>
									<div className="control">
										<input
											className="input"
											type="password"
											placeholder="***********"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>
								<div className="field mt-5">
									<label className="label">Confirm Password</label>
									<div className="control">
										<input
											className="input"
											type="password"
											placeholder="***********"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</div>
								</div>
								<div className="field mt-5">
									<div className="control">
										<button className="button is-success is-fullwidth" type="submit">
											Register
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
