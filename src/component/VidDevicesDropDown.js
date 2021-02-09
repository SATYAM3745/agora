import React from 'react';

const vidDevicesDropDown = (props) => {
    return (
        <select >
            {props.devices.map((device)=><option key={device.deviceId} value={device.deviceId} label={device.label} />)}
        </select>
    )
}

export default vidDevicesDropDown
