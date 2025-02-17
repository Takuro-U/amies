import React, { useState } from "react";

import { Inertia } from "@inertiajs/inertia";

const AuthRestaurantConsole: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Inertia.post(
            "/login",
            { email, password },
            {
                onError: (err: any) => {
                    setErrors(err.response.data.errors);
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            {errors.email && <div>{errors.email}</div>}

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {errors.password && <div>{errors.password}</div>}

            <button type="submit">Login</button>
        </form>
    );
};

export default AuthRestaurantConsole;
