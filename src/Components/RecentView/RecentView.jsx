import React, { useState, useEffect } from 'react';

const RecentView = () => {
  const [recentViews, setRecentViews] = useState([]);

  useEffect(() => {
    // Fetch recent views data from the backend
    fetch('https://ssrstyle-user.onrender.com/recent-views') // Assuming the backend server is running on port 5001
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent views');
        }
        return response.json();
      })
      .then(data => setRecentViews(data))
      .catch(error => console.error('Error fetching recent views:', error));
  }, []);

  return (
    <div>
      <h2>Recent Views</h2>
      <ul>
        {recentViews.map((view, index) => (
          <li key={index}>
            <a href={view.url}>{view.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentView;
