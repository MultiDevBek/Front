import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboards from '../src/pages/Dashboards';
import Applications from '../src/pages/Applications';
import Users from '../src/pages/Users';
import Login from '../src/auth/Login';
import AuthLayout from '../src/components/AuthLayout';
import AddUser from './pages/addUsers/AddUser';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLayout><Login /></AuthLayout>}/>
      
        <Route 
          path='/app/*' 
          element={
            <div className='App'>
              <header></header>
              <Sidebar />
              <div className='main'>
                <Routes>
                  <Route path='dash' element={<Dashboards />}/>
                  <Route path='applications' element={<Applications />}/>
                  <Route path='users' element={<Users />}/>
                  <Route path='add-user' element={<AddUser />}/>
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App