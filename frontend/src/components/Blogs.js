import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/`)
      .catch((e) => console.log(e));

    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      ALL BLOGS
      {blogs &&
        blogs.map((blog, index) => {
          // console.log('id ', blog._id)
         return <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
          />
})}
    </div>
  );
};

export default Blogs;
