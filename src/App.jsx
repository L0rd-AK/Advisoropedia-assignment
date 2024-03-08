import './App.css'
import Navbar from './components/navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
function App() {


  return (
    <>
      {/* main section */}
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
