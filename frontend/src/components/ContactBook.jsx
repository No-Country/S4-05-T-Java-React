import React from 'react'

export const ContactBook = ({ item }) => {
  return (
    <div className="Chat-contact">
        <div className="Chat-contact__logo">
            <img src="https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg" alt='icon'/>
        </div>
        <div className="Chat-contact__data">
            <h4>{ item.name }</h4>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?</h5>
        </div>
    </div>
  )
}