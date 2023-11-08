import { notification } from 'antd';

export const sendSuccessMessage = (message) =>{
    notification['success']({
        placement: 'bottomLeft',
        message: message,
        duration: 4.5,
        });
}

export const sendErrorMessage = (message, description) => {
    notification['error']({
        placement: 'bottomLeft',
        message,
        description,
        duration: 4.5,
      });
}

