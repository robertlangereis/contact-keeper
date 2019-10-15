import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactContext from '../../context/contact/contactContext'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

const Home = () => {
    return (
        <div className="grid-2">
            <div><ContactForm/></div>
            <div><ContactFilter/></div>
            <div><Contacts/></div>
        </div>
    )
}

export default Home