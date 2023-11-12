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
      console.log('unactivate',shiftGroupId);
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
    {shiftsGroups.length ? shiftsGroups.map(({ _id, shiftStation, shiftStartTime, shifts }) => (  
    <>      
      
      <Title level={3}>{`${shiftStation} start in ${shiftStartTime}`}</Title>
      <Button type="danger" key={_id} onClick={()=> unActiveShift(_id)}>
        Deactivate Group
      </Button>
      <ShiftsTable shifts={shifts}/>
           
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
