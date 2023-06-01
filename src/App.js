import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/Login";
import images from './images/cafe_frontpage.png';
import {Logout} from './components/Logout';
import {DeleteTasks} from './components/DeleteTasks';
import {TaskList} from "./components/TaskList";
import {Navigation} from './components/Navigation';


function App() {
    return (
      <BrowserRouter>
        <Navigation/>
        <Routes >
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tasks" element={<TaskList/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/task/:id" element={<DeleteTasks/>}/>
        </Routes>
      </BrowserRouter>
    );
}
export default App;