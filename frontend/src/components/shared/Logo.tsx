import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' style={{
        display:'flex',
        marginRight:'auto',
        alignItems:'center',
        gap:'16px'}}>

            <img src='chatbot.jpg' alt='AI-Chatbot' width={'60px'} height={'50px'} className='image-inverted' style={{borderRadius:'50%'}}/>
            <Typography sx={{display:{md:'block',sm:'none',xs:'none'},mr:'auto',fontWeight:800,textShadow:'2px 2px 20px #000'}} >
                <span style={{fontSize:'20px'}}>MERN </span> CHATBOT
            </Typography>
    </Link>
  )
}

export default Logo
