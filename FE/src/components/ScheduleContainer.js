import React, { useState, useEffect } from 'react';
import ScheduleTable from './GuardsTable';
import { beServices } from '../api-calls/BeService';
import { sendErrorMessage, sendSuccessMessage } from './helpers/notifications';

import { Button, Typography } from 'antd';

const { Title } = Typography;

const ScheduleContainer = () => {  
  const [scheduleTable, setScheduleTable] = useState([]);

  useEffect(() => {        
    beServices.getSchedule().then((response) => {        
        setScheduleTable(response.scheduleTable);
    })
    .catch(error => sendErrorMessage('Error- Failed to get schedule from DB.', error.message));
   
  }, []);

  const generateWeekSchedule = async () => {
    try {
        await beServices.generateWeekSchedule();
        sendSuccessMessage('Success- Schedule generated successfully.');
    } catch(error) {
        sendErrorMessage('Error- Failed to generate schedule.', error.message);
    }
  };

  return (
    <>      
      <Title level={2}>Schedule</Title>
      <ScheduleTable guards={scheduleTable} />
      <Button type="primary" onClick={generateWeekSchedule}>
         Generate Week Schedule
      </Button>            
    </>
  );
};

export default ScheduleContainer;
