import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the task list using fetch method
    fetch('https://nextjs-boilerplate-five-plum-29.vercel.app/api/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json(); // Convert the response to JSON
      })
      .then((tasks) => {
        // Find users who have completed all their tasks
        const userIds = tasks.reduce((acc, task) => {
          if (task.completed) {
            acc.add(task.userId); // Add the user ID to the Set
          }
          return acc;
        }, new Set());

        // Fetch user details for the qualified users in parallel
        const userPromises = [...userIds].map((userId) =>
          fetch(
            `https://nextjs-boilerplate-five-plum-29.vercel.app/api/users/${userId}`
          ).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch user with ID ${userId}`);
            }
            return res.json(); // Convert user response to JSON
          })
        );

        // Wait for all the user fetch requests to resolve
        Promise.all(userPromises)
          .then((userData) => {
            setUsers(userData); // Update the state with the fetched user data
            setLoading(false); // Set loading state to false as the data is now loaded
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // If data is still loading, display a loading message
  if (loading)
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  // If there was an error fetching the data, display the error message
  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;

  // Return the main UI once the data is ready
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Users Who Completed All Their Tasks</h1>
      <UserTable users={users} />
    </div>
  );
};

export default App;
