import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="nav">
        <Link to="/admin" className="nav1">
          Admin
        </Link>
        <Link to="/user" className="nav2">
          User
        </Link>
      </div>
      <div className="imgg">
        <img
          src="https://fexle.co.in/public/uploads/service/tender-management.png"
          alt="imgggg"
          className="imgs"
        />
      </div>
    </div>
  );
}

export default Home