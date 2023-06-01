import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AddTasks } from "./AddTasks";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import { Box, Button, Checkbox } from "@mui/material";
import Typography from '@mui/material/Typography';
import images from '../images/office.png';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const TaskList = () => {
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleClose() {
    setOpen(false);
  }

  const handleFileSelect = async (event) => {
    await handleFileUpload(event.target.id, event.target.files[0]);
  };

  function handleOpen() {
    setOpen(true);
  }

  const handleFileUpload = async (id, files) => {
    const formData = new FormData();
    formData.append("file", files);
    const response = await axios.post(
      "http://localhost:8002/upload_file/" + id + "/",
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      },
      { withCredentials: true }
    );
    console.log(response);
    getAll();
  };

  const handleDownload = async (id) => {
    await axios
      .get(`http://localhost:8002/download_file/${id}/`, {
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Image file");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCompleted = async (val) => {
    const initialTaskState = {
      id: val.Task.id,
      name: val.Task.name,
      description: val.Task.description,
      completed: val.Task.completed == true ? false : true,
    };

    const response = await axios.put(
      "http://localhost:8002/task/" + val.Task.id + "/",
      initialTaskState,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    getAll();
  };

  function completedHandle(val) {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:8002/task/" + val + "/",
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          updateCompleted(data);
        } catch (e) {
          console.log(e);
          console.log("not auth");
        }
      })();
    }
  }

  const getAll = () => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8002/tasks/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          console.log(data);
          setMessage(data.tasks);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  const styles = {
    paperContainer: {
        backgroundImage: `url(${images})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
  };


  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      }}
      maxWidth={false}
      disableGutters
      > 
      <CssBaseline />
    <Paper style={styles.paperContainer}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "column nowrap",
        minHeight:"93vh",
      }}
    >
      <Typography variant="h2" color="white"  sx={{mt:1,mb:5, px: 5, fontFamily: 'Raleway', backgroundColor: "#979797", border: 1}}>Your Tasks</Typography>
      <AddTasks handleClose={handleClose} handleOpen={handleOpen} show={open} />
      <TableContainer component={Paper} sx={{ width: "auto" }}>
        <Table
          className="table"
          sx={{ width: "auto" }}
          size="large"
          aria-label="a dense table"
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Completed</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Upload</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {message &&
              message.map((thisTask, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>
                    <Checkbox
                      checked={thisTask.completed == true ? true : false}
                      onChange={() => completedHandle(thisTask.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{thisTask.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {thisTask.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {thisTask.description}
                  </StyledTableCell>
                  <StyledTableCell>
                    {thisTask.file == "/file" || thisTask.file == null ? (
                      <Button variant="outlined" color="success" component="label">
                        Upload File
                        <input
                          type="file"
                          hidden
                          id={thisTask.id}
                          onChange={handleFileSelect}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleDownload(thisTask.id);
                        }}
                        component="label"
                      >
                        Download File
                      </Button>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/task/" + thisTask.id + "/"}>
                      <Button variant="outlined" color="error">Update / Delete</Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Paper>
    </Container>
  );
};
