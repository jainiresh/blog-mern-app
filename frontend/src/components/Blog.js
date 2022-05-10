import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ id, isUser, title, description, imageUrl, userName }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const response = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((e) => console.log(e));

    const data = await response.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/'))
      .then(() => navigate('/myBlogs'));
  };

  return (
    <div>
      <Card
        sx={{
          margin: 'auto',
          marginTop: 5,
          marginBottom: 5,
          width: '40%',
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}>
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <ModeEditOutlineIcon color='warning' />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color='error' />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label='recipe'>
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component='img' height='194' image={imageUrl} />

        <CardContent>
          <hr />
          <br />
          <Typography variant='body2' color='text.secondary'>
            <b>{userName}</b> {': '}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
