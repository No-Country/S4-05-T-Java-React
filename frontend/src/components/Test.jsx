import React from 'react'
import { Header } from './Header'
import { HeaderBack } from './HeaderBack'

export const Test = () => {

    const data = {
        user: 'Jose',
        icon: 'https://i1.sndcdn.com/avatars-8zXkV8ACe3yad2qj-OgAarw-t240x240.jpg'
    }
  return (
    <>
      
         <Header data={data}/>
        {/*<HeaderBack title="Elegir contacto" subtitle="5 contactos"/>*/}
        
    </>
  )
}
