import React from 'react'
import { ButtonChat } from './ButtonChat'
import { ChatContact } from './ChatContact'
import {Header} from './Header'

export const Home = () => {

 const data = [
    {
        id: 1,
        timestamp: "10:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Oswaldo"
    },
    {
        id: 2,
        timestamp: "9:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Jose Martinez"
    },
    {
        id: 3,
        timestamp: "8:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Victor Hugo"
    },
    {
        id: 4,
        timestamp: "7:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Jualian"
    },
    {
        id: 5,
        timestamp: "6:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Marta"
    },
    {
        id: 6,
        timestamp: "5:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Maria"
    },
    {
        id: 7,
        timestamp: "10:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Oswaldo"
    },
    {
        id: 8,
        timestamp: "9:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Jose Martinez"
    },
    {
        id: 9,
        timestamp: "8:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Victor Hugo"
    },
    {
        id: 10,
        timestamp: "7:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Jualian"
    },
    {
        id: 11,
        timestamp: "6:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Marta"
    },
    {
        id: 12,
        timestamp: "5:05pm",
        msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
        icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
        user: "Maria"
    },
 ]

  return (
    <>
        <Header/>
        <div className='home'>
            { data.map( item => (
                <ChatContact item={item} key={item.id}/>
            ))}
            <ButtonChat src='msg.png'/>
        </div>
    </>
    
  )
}
