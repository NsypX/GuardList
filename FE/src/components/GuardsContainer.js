import React, { useState, useEffect } from 'react';
import AddGuardModal from './AddGuardModal';
import AddShiftModal from './AddShiftModal';
import GuardTable from './GuardsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage } from './helpers/notifications';

import { Button, Typography, Divider, Image } from 'antd';

const { Title } = Typography;

const GuardsContainer = () => {
  const [isAddGuardOpen, setIsAddGuardOpen] = useState(false);
  const [isShiftsModal, setIsShiftsModal] = useState(false);
  const [guards, setGuards] = useState([]);

  useEffect(() => {
    if(isAddGuardOpen) return;
    beServices.getGuards().then((response) => {
      const { guards } = response;      
      setGuards(guards);
    })
    .catch(error => sendErrorMessage('Error- Failed to get guards from DB.', error.message));
   
  }, [isAddGuardOpen]);

  const openAddGuardModal = () => {
    setIsAddGuardOpen(true);
  };

  const closeAddGuardModal = () => {
    setIsAddGuardOpen(false);
  };

  const openAddShiftsModal = () => {
    setIsShiftsModal(true);
  };

  const closeAddShiftsModal = () => {
    setIsShiftsModal(false);
  };

  return (
    <>
      <Title level={1}>Guard App</Title>
      <Divider/>
      <Title level={2}>Guard List</Title>
      <GuardTable guards={guards} />
      <Divider/>
      <Title level={2}>Current Shifts</Title>
      <Divider/>
      <Title level={2}>Future Guard Schedule</Title>
      <Divider/>   
      <a href={'https://shopbeastphilanthropy.com/'} target="_blank" rel="noopener noreferrer">
      <Image
        
        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSrica07IIWQjW3svSkp4zN7mnCTwlm6kcKA&usqp=CAU'} 
        alt="Mrbeast is amazing" // specify the alt text for the image
      />
      </a>
      <Divider/>
      
      <Button type="primary" onClick={openAddGuardModal}>
        Add Guards
      </Button>
      <Button type="primary" onClick={openAddShiftsModal}>
        Add Shifts
      </Button>
      {isAddGuardOpen && (<AddGuardModal onClose={closeAddGuardModal} />)}
      {isShiftsModal && (<AddShiftModal onClose={closeAddShiftsModal} />)}
    </>
  );
};

export default GuardsContainer;
