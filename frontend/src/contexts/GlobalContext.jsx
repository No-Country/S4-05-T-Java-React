import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalProvider({children}){

    const navigate = useNavigate()

    const [user, setUser] = useState("")

    const [selected, setSelected] = useState([])

    const [contacts, setContacts] = useState()
        // {
        //     id: 1,
        //     name: "A",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 2,
        //     name: "B",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 3,
        //     name: "C",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 4,
        //     name: "D",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 5,
        //     name: "E",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 6,
        //     name: "F",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 7,
        //     name: "G",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 8,
        //     name: "H",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },
        // {
        //     id: 9,
        //     name: "I",
        //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //     img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        // },        
    const [contactsChat, setContactsChat] = useState([])

    const [chats, setChats] = useState([])

    const [chatId, setChatId] = useState()
    
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
                let con = {id: contacts[i].id, name: contacts[i].name, img: contacts[i].img}
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

    const getUserData = (id) => {
        const url = "https://chat-palomo.herokuapp.com/users/" + id
        let user

        fetch(url, {

            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
            }        
        })
        .then((response) => { 
            response.json()
            .then((data) => {
                console.log(data);
                user = data
            })
            .catch((err) => {
                console.log(err);
            }) 
        });

        return user
    }
    
    // if (user.id === 0) { 
    //     getUserData(47);
    // }

    const getContacts = (id) => {
        const url = "https://chat-palomo.herokuapp.com/users/" + id + "/contacts"

        fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
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

/*     if(contacts === undefined){
        console.log("get");
        getContacts(19)
    }  */

    const createChat = async (selcted) => {
        let type
        let us = [{userId: user.id}]
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

        const url = "https://chat-palomo.herokuapp.com/chat/" + type        

        await fetch(url, {
            method: "POST",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
            },
            body: JSON.stringify(body)        
        })
        .then((response) => { 
            response.json().then((data) => {
                console.log(data);
                setChatId(data.id)
                navigate('/chat:' + data.id.toString())
            }).catch((err) => {
                console.log(err);
            }) 
        });

    }

    const [errMsg, setErrMsg] = useState('');

    const loginHandle = async (pwd, user) => { 
        try {
        const response =  await fetch("https://chat-palomo.herokuapp.com/auth/login", {
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
            } else if (response.status == 400) {
                console.log('soy el error 400')
                setErrMsg('El usuario o la contraseña son incorrectos');
            } else if (response.status == 401) {
                console.log('soy el error 401')
                setErrMsg('Sin autorización')
            } else {
                console.log('soy el error')
                setErrMsg('Ha ocurrido un error');
            }   

            response.json()            
            
        .then((data) => {
                console.log(data);
                setUser(getUserData(data.userId));
                getContacts(data.userId)
                getChats(data.userId)
                navigate("/home");
            }).catch((err) => {
                console.log(err);
            }) 
        });

        /* console.log(token); */

        /* const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken }); */
        /* setSuccess(true); */

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

        const url = "https://chat-palomo.herokuapp.com/users/" + user.id + "/remove/" + username

        fetch(url, {
            method: "DELETE",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
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

    const getChatContacts = (id) => {

        const url = "https://chat-palomo.herokuapp.com//chat/" + id.toString()

        fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
            }        
        })
        .then((response) => { 
            response.json()
                .then((data) => {
                    console.log(data);
                        let us = []
                        for(let i = 0; i < data.users.length; i++){
                            us.push(getUserData(data.users.userId))
                        }
                    setContactsChat(us)
                })
                    .catch((err) => {
                        console.log(err);
                    }) 
        });       
    }

    const getChats = async (id) => {
        const url = "https://chat-palomo.herokuapp.com/chat?page=0&userId=" + id.toString()

        await fetch(url, {
            method: "GET",
            modo: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*"
            }        
        })
        .then((response) => { 
            response.json()
                .then((data) => {
                    console.log(data);
                    setChats(data)
                })
                    .catch((err) => {
                        console.log(err);
                    }) 
        });
    }

    return(
        <GlobalContext.Provider value={{
            selected,
            contacts,
            errMsg,
            chats,
            user,
            contactsChat,
            select,
            getContacts,
            createChat,
            loginHandle,
            deleteContact,
            setUser,
            getChatContacts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

