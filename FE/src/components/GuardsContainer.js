import React, { useState, useEffect } from 'react';
import AddGuardModal from './AddGuardModal';
import AddShiftModal from './AddShiftModal';
import GuardTable from './GuardsTable';
import ShiftsTable from './ShiftsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage, sendSuccessMessage } from './helpers/notifications';

import { Button, Typography, Divider, Image } from 'antd';

const { Title } = Typography;

const GuardsContainer = () => {
  const [isAddGuardOpen, setIsAddGuardOpen] = useState(false);
  const [isShiftsModal, setIsShiftsModal] = useState(false);
  const [guards, setGuards] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    if(isAddGuardOpen && isShiftsModal) return;

    if(!isAddGuardOpen) {
      beServices.getGuards().then((response) => {        
        setGuards(response.guards);
      })
      .catch(error => sendErrorMessage('Error- Failed to get guards from DB.', error.message));
    }

    if(!isShiftsModal) {
      beServices.getShifts().then((response) => {        
        setShifts(response.shifts);
      })
      .catch(error => sendErrorMessage('Error- Failed to get shifts from DB.', error.message));
    }
   
  }, [isAddGuardOpen, isShiftsModal]);

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

  const unActiveShift = async (record) =>{
    try {
      const { shiftStation = '' } = record;
      await beServices.deactivateShifts(shiftStation);
      const response = await beServices.getShifts();
      setShifts(response.shifts);
      sendSuccessMessage(`${shiftStation} has been deactivated successfully.`);
    } catch(error) {
      sendErrorMessage('Error- Failed to get guards from DB.', error.message)
    }
  }

  const unActiveGuard = async (record) =>{
    try {
      const { key, name } = record;
      await beServices.deactivateGuards(key);
      const response = await beServices.getGuards();
      setGuards(response.guards);
      sendSuccessMessage(`${name} has been deactivated successfully.`);
    } catch(error) {
      sendErrorMessage('Error- Failed to get guards from DB.', error.message)
    }
  }

  return (
    <>
      <Title level={1}>Guard App</Title>
      <Divider/>
      <Title level={2}>Guard List</Title>
      <GuardTable guards={guards} unActiveGuard={unActiveGuard} />
      <Divider/>
      <Title level={2}>Current Shifts</Title>
      <ShiftsTable shifts={shifts} unActiveShift={unActiveShift} />
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
