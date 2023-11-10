import React, { useState, useEffect } from 'react';
import AddShiftModal from './AddShiftModal';
import ShiftsTable from './ShiftsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage, sendSuccessMessage } from './helpers/notifications';

import { Button, Typography } from 'antd';

const { Title } = Typography;

const ShiftsContainer = () => {  
  const [isShiftsModal, setIsShiftsModal] = useState(false);  
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    if(isShiftsModal) return;  

    if(!isShiftsModal) {
      beServices.getShifts().then((response) => {        
        setShifts(response.shifts);
      })
      .catch(error => sendErrorMessage('Error- Failed to get shifts from DB.', error.message));
    }
   
  }, [isShiftsModal]);

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

  return (
    <>      
      <Title level={2}>Current Shifts</Title>
      <ShiftsTable shifts={shifts} unActiveShift={unActiveShift} />
      <Button type="primary" onClick={openAddShiftsModal}>
        Add Shifts
      </Button>

      {isShiftsModal && (<AddShiftModal onClose={closeAddShiftsModal} />)}         
    </>
  );
};

export default ShiftsContainer;
