import { Typography, Box, InputLabel, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogDetails = () => {

  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data))
    .then(() => navigate('/myBlogs'))
  };

  const fetchDetails = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((e) => console.log(e));

    const data = await response.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        // imageURL: data.blog.image,
      });
    });
  }, [id]);

  const sendRequest = async() => {
    console.log(`id is the ${id}`)
    const response = await axios.put(`http://localhost:5000/api/blog/update/${id}`,
    {
      title : inputs.title,
      description : inputs.description
    }).catch((e) => console.log(e));

    const data = await response.data;
    return data;
  }
  console.log('blog ', blog);
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 51%, rgba(0,212,255,1) 100%)'
          borderRadius={10}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin={'auto'}
          marginTop={3}
          display='flex'
          flexDirection={'column'}
          width={'80%'}>
          <Typography
            fontWeight={'bold'}
            padding={3}
            color='grey'
            variant='h2'
            textAlign={'center'}>
            {' '}
            Post your Blog{' '}
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name='title'
            value={inputs.title}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name='description'
            value={inputs.description}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          {/* <InputLabel sx={labelStyles}>Image Url</InputLabel> */}
          {/* <TextField
            name='imageURL'
            value={inputs.imageURL}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          /> */}
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant='contained'
            color='warning'
            type='submit'>
            Post
          </Button>
        </Box>
      </form>
}
    </div>
  );
};

export default BlogDetails;
