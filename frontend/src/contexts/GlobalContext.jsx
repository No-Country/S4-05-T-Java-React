import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({children}){

    const [selected, setSelected] = useState([])

    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: "A",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 2,
            name: "B",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 3,
            name: "C",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 4,
            name: "D",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 5,
            name: "E",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 6,
            name: "F",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 7,
            name: "G",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 8,
            name: "H",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },
        {
            id: 9,
            name: "I",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            img: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg"
        },        
    ])
    
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

    return(
        <GlobalContext.Provider value={{
            selected,
            contacts,
            select
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

