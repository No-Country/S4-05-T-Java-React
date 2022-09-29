import './styles/App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import Perfil from './components/Perfil';
import Config from './components/Config';

function App() {
    return (
      <BrowserRouter>
        <div className="App">          
            <Routes>
              <Route path="/" element={ <Header />} />
              <Route path="/registration" element={""} />
              <Route path="/home" element={""} />
              <Route path="/chat:id" element={""} />
              <Route path="/perfil:id" element={ <Perfil /> } />
              <Route path="/config" element={ <Config /> } />
              <Route path="/selectContact" element={""} />
              <Route path="/contacts" element={""} />
              <Route path="/newGroup" element={""} />
              <Route path="/addContact" element={""} />
              <Route path="/" element={""} />
            </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
