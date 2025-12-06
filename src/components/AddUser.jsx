import { useState } from "react";

function AddUser() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8000/User", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, role }),
        });

        const data = await res.json();
        alert(data.message);

        setName("");
        setRole("");
    };

    return (
        <div className="p-4">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Role (e.g. Admin, Employee)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default AddUser;
