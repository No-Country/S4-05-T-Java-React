import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalProvider({children}){

    const navigate = useNavigate()
    const url = process.env.REACT_APP_HOST_BACK
    
    const [user, setUser] = useState("")

    const [token, setToken] = useState("")

    const [selected, setSelected] = useState([])

    const [contacts, setContacts] = useState()
        
    const [contactsChat, setContactsChat] = useState([])

    const [chats, setChats] = useState([])

    const [chatId, setChatId] = useState()

    const [host, setHost] = useState(url);

    useEffect(() => {
        if (!(token === "")){
            getUserDataLogin()
            getContacts();
            getChats();
        }
    },[token])

    const select = (id) => {
        let aux = [...selected]

        console.log(id);

        const div = document.getElementById(id + '-Contact')
        const widget = document.getElementById(id + '-Widget')
        const check = document.getElementById(id + '-Check')

        console.log("selected: ", selected);
        console.log("aux: ", aux);
        console.log(id.split('-')[1]);

        for(let i = 0; i < aux.length; i++){
            console.log("1°:", i);
            if(aux[i].id == id.split('-')[1]){
                aux.splice(i,1)
                console.log(aux);
                div.style.backgroundColor = "white"
                widget.style.borderRadius = "2rem"
                widget.style.border = "none"
                widget.style.scale = "0"
                check.style.backgroundColor = "#8497FE00"
                check.innerHTML = ""
                setTimeout(() => {
                    setSelected(aux)
                }, 300);
                return
            }
        }

        for(let i = 0; i < contacts.length; i++){
            console.log("2°:", contacts[i].id, id.split('-')[1], i)
            if(contacts[i].id == id.split('-')[1]){
                let con = {id: contacts[i].id, name: contacts[i].name, picture: contacts[i].picture}
                aux.push(con)
                console.log(aux);
                div.style.backgroundColor = "#EBEEFF"
                check.style.backgroundColor = "#8497FE"
                check.innerHTML = "✓"
                setSelected(aux)
                return
            }
        }
    }

    const getUserDataLogin = async () => {
        const url = host + "/users/my"

        const resp = await fetch(url, {

            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }
        })

        const data = await resp.json()
        setUser(data)
        return data
    }

    

    const getUserData = async (id) => {
        const url = host +"/users/" + id
        let user

        const resp = await fetch(url, {

            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }        
        })

        const data = await resp.json()
        return data
    }

    const getContacts = async () => {
        const url = host + "/users/contacts"

        const resp = await fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }
        })

        const data = await resp.json()
        console.log(data);
        setContacts(data)

        return data
    }

    const createChat = async (selcted) => {
        let type
        const idUserLoged = localStorage.getItem("id")
        let us = [{userId: idUserLoged}]
        let body

        if(selected.length > 1){
            type = "group"
            for(let i = 0; i < selected.length; i++){
                us.push(
                    {
                        userId: selected[i].id
                    }
                )
            }

            body = {
                name: "string",
                users: us
            }
        } else {
            type = "simple"
            us.push({userId: selected[0].id})
            body = {
                users: us
            }
        }

        const url = host + "/chat/" + type

        await fetch(url, {
            method: "POST",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);
                setChatId(data.id)
                navigate('/chat/' + data.id.toString())
            }).catch((err) => {
                console.log(err);
                setErrMsg("Ya existe un chat")
            }) 
        });

    }

    const [errMsg, setErrMsg] = useState('');

    const loginHandle = async (pwd, user) => {
        let ok = false

        try {
        const response =  await fetch(host + "/auth/login", {
            method: "POST",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                /* 'Authorization': token */
            },
            body:JSON.stringify({
                password: pwd,
                usernameOrEmail: user
            })
        })
        .then((response) => {

            if (response.status == 404) {
                console.log('soy el error 404')
                setErrMsg('No hubo respuesta del servidor');
                return;
            } else if (response.status == 400) {
                console.log('soy el error 400')
                setErrMsg('El usuario o la contraseña son incorrectos');
                return;
            } else if (response.status == 401) {
                console.log('soy el error 401')
                setErrMsg('Sin autorización')
            } else if (response.status == 200){
                console.log('respuesta ok')
                ok = true
            } else {
                console.log('soy el error')
                setErrMsg('Ha ocurrido un error');
            }

            response.json()            
            
        .then(async (data) => {
                console.log(data);
                if(ok){
                    setToken(data.token)
                    navigate("/home");
                    localStorage.setItem("id",data.userId )
                }
            }).catch((err) => {
                console.log(err);
            })
        });

        } catch (err) {

            if (!err?.response) {
                return('No hubo respuesta del servidor')
            } else if (err.response?.status === 400) {
                return('El usuario o la contraseña son incorrectos');
            } else if (err.response?.status === 401) {
                return('Sin autorización')
            } else {
                return('Ha ocurrido un error');
            }
            /* errRef.current.focus(); */
        }
    }

    const deleteContact = (username) => {

        const url = host + "/users/contacts/remove/" + username

        fetch(url, {
            method: "DELETE",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log(data);
                    setContacts(data)
                })
                    .catch((err) => {
                        console.log(err);
                    })
        });

    }

    const getChatContacts = async (id) => {

        const url = host + "/chat/" + id

        const resp = await fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }
        })

        const data = await resp.json()
        console.log(data);
        let us = []

        for(let i = 0; i < data.users.length; i++){
            console.log(data.users[i].userId)
            let audata = getUserData(data.users[i].userId)
            if(audata.userId !== user.id){
                us.push(audata)
            }
        }
        setContactsChat(us)
    }

    const getChats = async () => {
        const url = host + "/chat?page=0"

        let dataChats

        let resp = await fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "Authorization": "Bearer " + token
            }
        })
       const data =  await resp.json()

       console.log(data);
       setChats(data);
       return  data;

    }

    const addContact = async (id, contact) => {

        try {

            const url = host + "/users/add/" + contact

            const resp = await fetch(url, {
                method: "POST",
                modo: "cors",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + token
                }
            });

            const data = await resp.json()

            return data;

        } catch (error) {
            setErrMsgUser('Algo ha salido mal')
        }

    }

    const [errMsgUser, setErrMsgUser] = useState('');

    const getUserByName = async (username) => {

        try{

            const url = host + "/users/username/" + username
    
            const resp = await fetch(url, {
    
                method: "GET",
                modo: "cors",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + token
                }       
            })
    
            const data = await resp.json();
            return data;

        } catch (error) {
            setErrMsgUser('Usuario no encontrado')
        }

    }

    const getToken = () => {

        if(!(token == ""))
            return token
        else
            setErrMsgUser('Usuario no logueado')
        
    }

    return(
        <GlobalContext.Provider value={{
            selected,
            contacts,
            errMsg,
            chats,
            user,
            contactsChat,
            errMsgUser,
            select,
            getContacts,
            createChat,
            loginHandle,
            deleteContact,
            setUser,
            getChatContacts,
            getChats,
            getUserData,
            getUserDataLogin,
            addContact,
            setErrMsgUser,
            getUserByName,
            getToken
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

