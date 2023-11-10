import React from 'react';

import { Typography, Divider, Image } from 'antd';
import GuardsContainer from './GuardsContainer';
import ShiftsContainer from './ShiftsContainer';

const { Title } = Typography;

const MainContainer = () => {

  return (
    <>
      <Title level={1}>Guard App</Title>

      <Divider/>
      
      <GuardsContainer/>

      <Divider/>

      <ShiftsContainer/>
      
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
    </>
  );
};

export default MainContainer;
