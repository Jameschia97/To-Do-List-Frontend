import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle} from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';

export const AddTasks = () => {

  let navigate = useNavigate();

  const initialTaskState = {
    name: "",
    description: "",
    completed: false,
  };
  const [task, setTask] = useState(initialTaskState);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      name: task.name,
      description: task.description,
      completed: task.completed
    };

    axios.post('http://localhost:8002/tasks/', data ,
    { headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }}, {withCredentials: true})
      .then(response => {
        setTask({
          Name: response.data.Name,
          Description: response.data.Description,
        });
        console.log(response.data);
        newTask();
        handleClose();
        navigate(0);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
  };



  return (

    <div>
      <Button sx={{my:2}} variant = "contained" onClick={handleOpen}>Add Task</Button>
      <Dialog
        open={open}
        onClose={handleClose}
 
      >
        <DialogTitle>
          Add Task
        </DialogTitle>
        <DialogContent>
        <div>
          <div className="form-group">
             <label htmlFor="name">Name: </label>
             <input
              type="text"
              className="form-control"
              id="name"
              required
              value={task.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={task.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>


          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
        </DialogContent>
      </Dialog>
    </div>



  );
};

