import React, { useState, useEffect } from 'react';
import AddShiftModal from './AddShiftModal';
import ShiftsTable from './ShiftsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage, sendSuccessMessage } from './helpers/notifications';

import { Button, Typography } from 'antd';

const { Title } = Typography;

const ShiftsContainer = () => {  
  const [isShiftsModal, setIsShiftsModal] = useState(false);  
  const [shiftsGroups, setShiftsGroups] = useState([]);

  useEffect(() => {
    if(isShiftsModal) return;  

    if(!isShiftsModal) {
      beServices.getShifts().then((response) => {        
        setShiftsGroups(response.shiftsGroups || []);
      })
      .catch(error => sendErrorMessage('Error- Failed to get shift groups from DB.', error.message));
    }
   
  }, [isShiftsModal]);

  const openAddShiftsModal = () => {
    setIsShiftsModal(true);
  };

  const closeAddShiftsModal = () => {
    setIsShiftsModal(false);
  };

  const unActiveShift = async (shiftGroupId) =>{
    try {      
      await beServices.deactivateShifts(shiftGroupId);
      const response = await beServices.getShifts();
      setShiftsGroups(response.shiftsGroups);
      sendSuccessMessage(`${shiftGroupId} has been deactivated successfully.`);
    } catch(error) {
      sendErrorMessage('Error- Failed to get guards from DB.', error.message)
    }
  }

  return (
    <>
    {shiftsGroups.length ? shiftsGroups.map(({ _id, key, shiftStation, shiftStartTime, shifts }) => (  
    <>            
      <Title key={`${key}-title`} level={3}>{`${shiftStation} start in ${shiftStartTime}`}</Title>
      <Button key={`${key}-button`} type="danger" onClick={()=> unActiveShift(_id)}>
        Deactivate Group
      </Button>
      <ShiftsTable key={`${key}-table`} shifts={shifts}/>           
    </>
    )) : (<></>)},

      <Button type="primary" onClick={openAddShiftsModal}>
        Add Shifts
      </Button>

      {isShiftsModal && (<AddShiftModal onClose={closeAddShiftsModal} />)}   
    </>
  );
};

export default ShiftsContainer;
