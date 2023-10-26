import React, { FC, useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Waiting:FC=()=>{
    const {store}=useContext(Context);
return(
        <div className='waiting' style={{display:store.isWaiting?'flex':'none'}}>
                <div className='waiting_loading'>
                <div className="waitingio-spinner-rolling-dnbn3ekikdm">
                        <div className="wdio-vz6x0mvbc7t">
                                <div></div>
                        </div>
                </div>
                </div>
                
        </div>
      

)
}

export default observer(Waiting);