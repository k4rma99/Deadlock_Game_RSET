import React from 'react';

import { Credentials } from '../components/Credentials.jsx';


export const MainLoader = (props) =>{

    return(
        <div>
            <Credentials forceStateChange={props.forceStateChange} SetStateChange={props.SetStateChange}></Credentials>
            }
        </div>
    )
}