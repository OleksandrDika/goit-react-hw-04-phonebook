import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Conteiner } from './Conteiner.styled';
import startContacts from './contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localStorCont = localStorage.getItem('contacts');
    console.log(localStorCont);
    if (localStorCont !== null) {
      const parseCont = JSON.parse(localStorCont);
      setContacts(parseCont);
      return;
    }
    // console.log(startContacts);
    setContacts(startContacts);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const onSubmitForm = newContact => {
    const sameNames = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (sameNames) {
      alert(`${newContact.name}is already in contacts`);
      return;
    }

    setContacts(prevState => {
      return [...prevState, { id: nanoid(), ...newContact }];
    });
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Conteiner>
      <h2>Phonebook</h2>
      <ContactForm onFormSubmit={onSubmitForm} />

      <div>
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <Filter value={filter} onChange={changeFilter} />
        )}

        {contacts.length > 0 && (
          <ContactList
            visibleContact={getVisibleContacts()}
            deleteContact={deleteContact}
          />
        )}
      </div>
    </Conteiner>
  );
};
