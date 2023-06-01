import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const DeleteTasks = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    name: "",
    description: "",
    completed: ""
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");
  const [returnToHome, setReturnToHome] = useState(false);

   const getTask  = async id => {
    await axios.get(`http://localhost:8002/task/${id}/`, {
                headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                  'accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              })
      .then(response => {
        setCurrentTask(response.data.Task);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTask(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };


  const updateTask = () => {
    axios.put(`http://localhost:8002/task/${id}/`, currentTask, {
                headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                  'accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              })
      .then(response => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
        setReturnToHome(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    axios.delete(`http://localhost:8002/task/${id}/`, {
        headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if( response.status == 404) {
          throw new Error('Id not found.')
        }
        else if (response.status == 204) {
        console.log(response.data, "204");
        navigate("/tasks");
      }})
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'center',
      }}
      maxWidth={false}
      disableGutters
      >
      {currentTask ? (
        <div className="edit-form">
          <h4>Edit Tasks</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <Box sx={{my:3}}>
          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>
          <span> </span>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          </Box>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Task...</p>
        </div>
      )}
      {returnToHome ? <Button variant="contained" href="/tasks">Home</Button> : null}
      </Container>
  );
};

