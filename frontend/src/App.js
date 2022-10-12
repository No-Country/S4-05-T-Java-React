import './styles/App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { Home } from './components/Home';
import { Test } from './components/Test';
import Perfil from './components/Perfil';
import Contacts from './components/Contacts';
import Config from './components/Config';

function App() {
    return (
      <BrowserRouter>
        <div className="App">          
            <Routes>
              <Route path="/" element={ <Login />} />
              <Route path="/registration" element={ <Register/> } />
              <Route path="/home" element={ <Home/> } />
              <Route path="/chat:id" element={""} />
              <Route path="/perfil:id" element={ <Perfil /> } />
              <Route path="/config" element={ <Config /> } />
              <Route path="/selectContact" element={""} />
              <Route path="/contacts" element={<Contacts/>} />
              <Route path="/newGroup" element={""} />
              <Route path="/addContact" element={""} />
              <Route path="/test" element={<Test/>} />
            </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
