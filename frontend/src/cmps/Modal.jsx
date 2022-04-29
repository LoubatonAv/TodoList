import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updatePerson } from '../cmps/store/people.action.js';

export const Modal = ({ people, setIsModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsModal(false);
  };

  const submitValue = (e) => {
    e.preventDefault();
    const details = {
      name: name,
      email: email,
    };
    const personToSave = {
      ...people,
      name: { first: details.name, title: people.name.title, last: people.name.last },
      email: details.email,
    };
    closeModal();
    // dispatch(updatePerson(personToSave));
    return details;
  };

  return (
    <div className='modal-form'>
      <form onSubmit={submitValue}>
        <input type='text' placeholder='First Name' onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
};
