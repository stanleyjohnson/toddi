import React from 'react'
import {TextArea} from './components'

export const MainEditor = ({mainText, setMainText}) => {
    return <TextArea value={mainText} onChange={setMainText}/>
}