import React from 'react';
import { Typography, Divider, Image, Tabs } from 'antd';
import GuardsContainer from './GuardsContainer';
import ShiftsContainer from './ShiftsContainer';

const { Title } = Typography;
const { TabPane } = Tabs;

const MainContainer = () => {
  return (
    <>
      <Title level={1}>Guard App</Title>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Guards" key="1">
          <GuardsContainer />
        </TabPane>

        <TabPane tab="Shifts" key="2">
          <ShiftsContainer />
        </TabPane>

        <TabPane tab="Future Guard Schedule" key="3">
          <Title level={2}>Future Guard Schedule</Title>      
        </TabPane>
      </Tabs>

      <Divider/>

      <Title level={2}>{'MrBeast Love <3'}</Title>

      <a href={'https://shopbeastphilanthropy.com/'} target="_blank" rel="noopener noreferrer">
         <Image
           src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSrica07IIWQjW3svSkp4zN7mnCTwlm6kcKA&usqp=CAU'}
           alt="Mrbeast is amazing" // specify the alt text for the image
         />
      </a>        
    </>
  );
};

export default MainContainer;
