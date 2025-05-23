import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(""); // Pesan error
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Kirim permintaan POST untuk login
            const response = await axios.post(`${BASE_URL}/login`, {
                email: email,
                password: password,
            });

            // Jika login berhasil, arahkan ke halaman card_list
            navigate("/card_list");
        } catch (error) {
            // Tangani error dan tampilkan pesan
            if (error.response) {
                setMsg(error.response.data.msg); // Menampilkan pesan error
            } else {
                setMsg("Terjadi kesalahan, coba lagi nanti."); // Pesan error umum
            }
        }
    };

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleLogin} className="box">
                                {/* Menampilkan pesan error jika ada */}
                                {msg && <p className="has-text-centered mt-5" style={{ color: 'red' }}>{msg}</p>}

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
                                    <button className="button is-success is-fullwidth" type="submit">
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
