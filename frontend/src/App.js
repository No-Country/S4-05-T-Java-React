import './styles/App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import Contacts from './components/Contacts';
import Config from './components/Config';
import Chat from './components/Chat';
import AddContact from './components/AddContact';
import ProfileContact from './components/ProfileContact.jsx';
import {Home} from './components/Home';
import SelectContacts from './components/SelectContacts';
import GlobalProvider from './contexts/GlobalContext';

function App() {
  return (
    
    <BrowserRouter>
      <GlobalProvider>
          <div className='app'>
            <Routes>
              <Route path="/" element={ <Login />} />
              <Route path="/registration" element={ <Register/> } />
              <Route path="/contacts" element={<Contacts/>} />
              <Route path="/home" element={ <Home />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/perfil" element={ <Perfil /> } />
              <Route path="/config" element={ <Config /> } />
              <Route path="/selectContacts" element={ <SelectContacts />} />
              <Route path="/newGroup" element={""} />
              <Route path="/addContact" element={<AddContact/>} />
              <Route path="/profileContact:id" element={<ProfileContact/>} />
            </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter>
    
  )
}

export default App

