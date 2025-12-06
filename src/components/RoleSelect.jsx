import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RoleSelect() {
    const [users, setUsers] = useState([]);
    const { setRole } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/User")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const handleSelect = (id) => {
        if (!id) return;

        const selectedUser = users.find(u => u.id === parseInt(id));

        if (!selectedUser) return;

        // Save role to context
        setRole(selectedUser.role);

        // Go to dashboard
        navigate("/dashboard");
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Select User</h2>

            <select onChange={(e) => handleSelect(e.target.value)}>
                <option value="">Select user</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                    </option>
                ))}
            </select>
        </div>
    );
}

export default RoleSelect;
