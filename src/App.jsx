import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboards from '../src/pages/Dashboards';
import Applications from '../src/pages/Applications';
import Users from '../src/pages/Users';

function App() {

  return (
    <Router>
      <div className='App'>
        <header>Добро пожаловать!</header>

        <Sidebar />
        <div className='main'>
          <Routes>
            <Route path='/' element={<Dashboards />}/>
            <Route path='/applications' element={<Applications />}/>
            <Route path='/users' element={<Users />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
