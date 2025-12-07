import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./RoleSelect.css";


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

        setRole(selectedUser.role);
        navigate("/dashboard");
    };

    return (
        <div className="main">
        <div className="container">
            <h2>Select User</h2>

            <select onChange={(e) => handleSelect(e.target.value)}>
                <option value="">Select user</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                    </option>
                ))}
            </select>

            {/* Add link to create new user */}
            <div style={{ marginTop: 20 }}>
                <Link to="/add-user">Create New User</Link>
            </div>
        </div>
        </div>
    );
}

export default RoleSelect;
