import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import AccountList from "./components/AccountList";

function App() {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:3000/users");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    async function fetchAccountData() {
      try {
        const response = await fetch("http://localhost:3000/accounts");
        const accountData = await response.json();
        setAccounts(accountData);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    }

    fetchUserData();
    fetchAccountData();
  }, []);

  return (
    <div className="App">
      <h1>Bankdatenverwaltungssystem</h1>
      <UserList users={users} />
      <AccountList accounts={accounts} />
    </div>
  );
}

export default App;
