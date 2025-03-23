import React from 'react';

const UserTable = ({ users }) => {
  // Sort users by name alphabetically
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each user as a table row */}
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
