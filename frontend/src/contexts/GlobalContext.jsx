import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalProvider({children}){

    const navigate = useNavigate()

    const [user, setUser] = useState()

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

    const getUserData = async (id) => {
        const url = "https://chat-palomo.herokuapp.com/users/" + id

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
            response.json().then((data) => {
                console.log(data);
                setUser(data)
            }).catch((err) => {
                console.log(err);
            }) 
        });

    }

    if(user === undefined){
        getUserData(8)
    }

    const getContacts = (id) => {
        const url = "https://chat-palomo.herokuapp.com/users/" + id + "/contact"

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

    if(contacts === undefined){
        console.log("get");
        getContacts(8)
    }   

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

    return(
        <GlobalContext.Provider value={{
            selected,
            contacts,
            select,
            getContacts,
            createChat
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

