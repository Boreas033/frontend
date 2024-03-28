import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [newUserData, setNewUserData] = useState({
    UserID: "",
    Name: "",
    Telefon: "",
    Email: "",
    Passwort: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
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
            value={newUserData.Telefon}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={newUserData.Email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Passwort:
          <input
            type="password"
            name="Passwort"
            value={newUserData.Passwort}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Benutzer hinzufügen</button>
      </form>
      <ul>
        {users.map((user) => (
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
          </li>
        ))}
      </ul>

      <h1>Konten</h1>
      <ul>
        {accounts.map((account) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
