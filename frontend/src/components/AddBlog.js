import { Box, InputLabel , Typography, TextField , Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './utils';

const AddBlog = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageURL: '',
  });

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

    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate('/blogs'));
  };

  const sendRequest = async () => {
    const response = await axios.post(`http://localhost:5000/api/blog/add`, {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem('userId'),
    })
    .catch((e)=> console.log(e));

    const data = response.data;

    return data;
  };
  return (
    <div>
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
          // className={classes.font}
            fontWeight={'bold'}
            padding={3}
            color='grey'
            variant='h2'
            textAlign={'center'}>
            {' '}
            Post your Blog{' '}
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel >
          <TextField 
            name='title'
            value={inputs.title}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          <InputLabel  sx={labelStyles}>Description</InputLabel>
          <TextField 
            name='description'
            value={inputs.description}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          <InputLabel  sx={labelStyles}>Image Url</InputLabel>
          <TextField 
            name='imageURL'
            value={inputs.imageURL}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant='contained'
            color='warning'
            type='submit'>
            Post
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
