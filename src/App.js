import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./actions/userActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(users);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeGenderFilter = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users?.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower) || username.includes(searchTermLower);
  });

  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const RenderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
        </tr>
      </thead>
    );
  };

  const RenderTableBody = () => {
    return (
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const Search = () => {
    return (
      <div>
        <h2 style={{ fontSize: "15px" }}>Users Library</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name or Username"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          />
          <button
            style={{
              padding: "10px 20px",
              background: "red",
              border: "none",
              borderRadius: "4px",
              marginLeft: "15px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleClearFilters}
          >
            {" "}
            Clear
          </button>
        </div>
      </div>
    );
  };

  const RenderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            style={{ listStyle: "none", margin: "0px 2px" }}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="App" style={{ padding: "5%" }}>
      <Search />
      <Table striped bordered hover>
        <RenderTableHeader />
        <RenderTableBody />
      </Table>
      <RenderPagination />
    </div>
  );
}

export default App;
