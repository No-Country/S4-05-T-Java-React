import './styles/App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from './components/Home';
import { Test } from './components/Test';
import { Header } from './components/Header';
import Perfil from './components/Perfil';
import Config from './components/Config';

function App() {
    return (
      <BrowserRouter>
        <div className="App">          
            <Routes>
              <Route path="/" element={ <Home />} />
              <Route path="/registration" element={""} />
              <Route path="/home" element={""} />
              <Route path="/chat:id" element={""} />
              <Route path="/perfil:id" element={ <Perfil /> } />
              <Route path="/config" element={ <Config /> } />
              <Route path="/selectContact" element={""} />
              <Route path="/contacts" element={""} />
              <Route path="/newGroup" element={""} />
              <Route path="/addContact" element={""} />
              <Route path="/test" element={<Test/>} />
            </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
