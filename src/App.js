import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [newUserData, setNewUserData] = useState({
    UserID: "",
    Name: "",
    Kontaktinformationen:{
      Telefon: "",
      Email: "",
      Passwort: "",
    },
    
  });
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
    }
    

  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Konten:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        newUserData
      );
      console.log("Response:", response);
      console.log("Benutzer hinzugefügt:", response.data);
      // Nach dem Hinzufügen eines Benutzers die Benutzerliste aktualisieren
      fetchUsers();
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Benutzers:", error);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      console.log(`User with ID ${userId} deleted`);
      fetchUsers(); // Refresh the users list after deletion
    } catch (error) {
      console.error("Fehler beim Löschen des Benutzers:", error);
    }
  };

  // Function to delete an account by ID
  const deleteAccountById = async (accountId) => {
    try {
      await axios.delete(`http://localhost:3000/accounts/${accountId}`);
      console.log(`Account with ID ${accountId} deleted`);
      fetchAccounts(); // Refresh the accounts list after deletion
    } catch (error) {
      console.error("Fehler beim Löschen des Kontos:", error);
    }
  };

  return (
    <div>
      <h1>Benutzer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          UserID:
          <input
            type="text"
            name="UserID"
            value={newUserData.UserID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={newUserData.Name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Telefon:
          <input
            type="text"
            name="Telefon"
            value={newUserData.Kontaktinformationen.Telefon}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={newUserData.Kontaktinformationen.Email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Passwort:
          <input
            type="password"
            name="Passwort"
            value={newUserData.Kontaktinformationen.Passwort}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Benutzer hinzufügen</button>
      </form>
      <ul>
        {users.map((user) => (
          <div class="card">
          <li key={user.UserID}>
            <div>
              <strong>Name:</strong> {user.Name}
            </div>
            <div>
              <strong>Telefon:</strong> {user.Kontaktinformationen.Telefon}
            </div>
            <div>
              <strong>Email:</strong> {user.Kontaktinformationen.Email}
            </div>
            <div>
            <button type="button" class="btn btn-warning">Update</button>
            </div>
            <div>
            <button type="button" class="btn btn-danger" onClick={deleteUserById(user.UserID)}>Delete</button>
            </div>
          </li>
          </div>
        ))}
      </ul>

      <h1>Konten</h1>
      <ul>
        {accounts.map((account) => (
          <div class="card">
          <li key={account.KontoID}>
            <div>
              <strong>Typ:</strong> {account.Typ}
            </div>
            <div>
              <strong>Saldo:</strong> {account.Saldo} {account.Währung}
            </div>
            <div>
              <strong>User:</strong> {account.User}
            </div>
            <div>
            <button type="button" class="btn btn-warning">Update</button>
            </div>
            <div>
            <button type="button" class="btn btn-danger">Delete</button>
            </div>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
