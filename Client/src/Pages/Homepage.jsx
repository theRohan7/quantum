import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS } from "../constants";



const Homepage = () => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/auth");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    const PAGE_SIZE = 10;
    const totalUsers = USERS.length;
    const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const handlePreviousPage = () => {
        setCurrentPage((prev) => prev - 1);
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    }









    return (
       <main>
        <nav>
            <div className="logo">
                <h3>Quantum Innovation</h3>
            </div>
            <div className="user-info">
                <span>UserName</span>
                <button onClick={handleLogout}>Logout</button>

            </div>
        </nav>
        <div className="main-content">
            <h2>Users</h2>
            <div className="users-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {USERS.slice(start, end).map(user => (
                        <tr key={user.id}>
                            <td data-label="#">{user.id}</td>
                            <td data-label="Name">
                            <img src={user.profilePicture} alt="" />
                            {user.name}
                            </td>
                            <td data-label="Date of Birth">{user.dateOfBirth}</td>
                            <td data-label="Status">{user.status}</td>
                            <td data-label="Action">

                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>

                       ))
                       }
                    </tbody>
                </table>
                <div className="pagination">
                    <button disabled={currentPage === 0} onClick={() => handlePreviousPage()}>Previous</button>


                 {[...Array(totalPages).keys()].map(n => (
                    <button className={currentPage === n ? "active" : ""} key={n} onClick={() => setCurrentPage(n)}>{n}</button>
                 ))}
                 <button disabled={currentPage === totalPages - 1} onClick={() => handleNextPage()}>Next</button>


                </div>
            </div>

        </div>
       </main>
    )

}

export default Homepage;
