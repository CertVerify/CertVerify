import './App.css';
import CreateCertficate from './Components/CreateCertficate';
import Home_Admin from './Components/Home_Admin';
import Home_Admin_1 from './Components/Home_Admin_1';
import Sidebar from './Components/Sidebar';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Components/AdminLogin';
import Upload_from_excel from './Components/Upload_from_excel';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element = {<Register />}  />
          <Route path="/Admin" element = {<Home_Admin />}  />
          <Route path="/Admin_Connected" element = {<Home_Admin_1 />}  />
          <Route path="/Create_Certificate" element = {<CreateCertficate />}  />
          <Route path="/Upload_from_excel" element = {<Upload_from_excel />}  />

        </Routes>
    </div>
  );
}

export default App;
