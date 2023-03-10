import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Conteiner } from './Conteiner.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

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
