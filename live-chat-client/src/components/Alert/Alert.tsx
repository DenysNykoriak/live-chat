import React, { useEffect, useState } from 'react'
import { Transition } from 'react-transition-group';

import './Alert.scss';

type Props = {
    alert_text: string,
    alert_time: number,
    showAlert: boolean,
    closeAlert: () => any
}

const Alert = (props: Props) => {

    const {closeAlert, alert_text, alert_time, showAlert} = props;

    useEffect(() => {
        let timeout = setTimeout(() => {
            closeAlert();
        }, alert_time);

        return () => {
            clearTimeout(timeout);
        }
    }, [showAlert]);
    
  return (
    <Transition in={showAlert} timeout={500}>
        {state => (
            <div className={`alert ${state}`}>
                <span className='alert__text'>{alert_text}</span>
            </div>
        )}
    </Transition>
  )
}

export default Alert