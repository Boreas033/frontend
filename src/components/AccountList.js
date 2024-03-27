import React from "react";

function AccountList({ accounts }) {
  return (
    <div>
      <h2>Konten</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.KontoID}>
            KontoID: {account.KontoID}, Typ: {account.Typ}, Saldo:{" "}
            {account.Saldo} {account.Währung}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;
