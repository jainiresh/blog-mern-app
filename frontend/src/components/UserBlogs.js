import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser] = useState();

  const id = localStorage.getItem('userId');
  const sendRequest = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((e) => console.log(e));

    const data = await response.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log(user);
  return (
    <div>
      MY BLOGS
      {user && user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
