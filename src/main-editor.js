import React from 'react'
import {TextArea} from './components'

export const MainEditor = ({mainText, setMainText}) => {
    return (
        <div style={{margin:'20px', width:'100%'}}>
            {mainText}
        </div>
    )
}