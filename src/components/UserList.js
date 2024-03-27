import React from "react";

function UserList({ users }) {
  return (
    <div>
      <h2>Benutzer</h2>
      <ul>
        {users.map((user) => (
          <li key={user.UserID}>
            UserID: {user.UserID}, Name: {user.Name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
