import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";


const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	const Login = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${BASE_URL}/login`, {
				email: email,
				password: password,
			});
			navigate("/card_list");
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
							<form onSubmit={Login} className="box">
                                <p className="has-text-centered mt-5">{msg}</p>
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
									
										<button className="button is-success is-fullwidth">
											Login
										</button>
									
								</div>
                                <div>
                                    <p className="has-text-centered mt-5">
                                        Don't have an account? <a href="/register">Register</a>
                                    </p>
                                </div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
