import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  return (
    <div>
      <h2>Konten</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Accounts;
