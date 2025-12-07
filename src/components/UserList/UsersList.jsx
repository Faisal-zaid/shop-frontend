import { useEffect, useState } from "react";
import "./UserList.css";


function UsersList() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await fetch("http://localhost:8000/User");
        const data = await res.json();
        setUsers(data);
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:8000/User/${id}`, {
            method: "DELETE",
        });
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="p-4">
            <h2>Users</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.name} ({u.role})  
                        <button onClick={() => deleteUser(u.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;
