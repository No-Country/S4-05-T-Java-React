import './styles/App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import Chat from './components/Chat';

function App() {
    return (
      <BrowserRouter>
        <div className="App"> 
            <Header />

            <Routes>
              <Route path="/" element={""} />
              <Route path="/registration" element={""} />
              <Route path="/home" element={""} />
              <Route path="/chat:id" element={<Chat />}/>
              <Route path="/perfil:id" element={""} />
              <Route path="/config" element={""} />
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
