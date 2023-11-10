import React, { useState, useEffect } from 'react';
import AddGuardModal from './AddGuardModal';
import GuardTable from './GuardsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage, sendSuccessMessage } from './helpers/notifications';

import { Button, Typography } from 'antd';

const { Title } = Typography;

const GuardsContainer = () => {
  const [isAddGuardOpen, setIsAddGuardOpen] = useState(false);  
  const [guards, setGuards] = useState([]);

  useEffect(() => {
    if(isAddGuardOpen) return;

    if(!isAddGuardOpen) {
      beServices.getGuards().then((response) => {        
        setGuards(response.guards);
      })
      .catch(error => sendErrorMessage('Error- Failed to get guards from DB.', error.message));
    }
   
  }, [isAddGuardOpen]);

  const openAddGuardModal = () => {
    setIsAddGuardOpen(true);
  };

  const closeAddGuardModal = () => {
    setIsAddGuardOpen(false);
  };

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
      <Title level={2}>Guard List</Title>
      <GuardTable guards={guards} unActiveGuard={unActiveGuard} />
      <Button type="primary" onClick={openAddGuardModal}>
        Add Guards
      </Button>      
      {isAddGuardOpen && (<AddGuardModal onClose={closeAddGuardModal} />)}      
    </>
  );
};

export default GuardsContainer;
