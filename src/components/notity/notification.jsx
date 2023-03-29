import React from "react";
import Toast from 'react-bootstrap/Toast'
import * as timers from "timers";

export default function Notify(props){
    return (<>
        <Toast>
            <Toast.Header>
                <img src={".."} className={"rounded me-2"} alt={""}/>
                <storng className={"me-auto"}>
                    Nonthachai's ArtWork
                </storng>
                <small>{timers}</small>
            </Toast.Header>
            <Toast.Body>
                {props.message}
            </Toast.Body>
        </Toast>
        </>)
}