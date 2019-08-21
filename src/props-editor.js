import React from 'react'
import {tint} from './components'

export const PropsEditor = ({E, templateProps,setTemplateProps}) => {
    const v = []
    const rec = (el) => {
        if(el.props) v.push(el)
        if(Array.isArray(el.children)){
            el.children.forEach(rec)
        }
    }
    for(let tmpl in E){
        rec(E[tmpl])
    }
    
    return (
        <div style={{}}>{
            v.map(el => {
                const [r,g,b] = el.color
                const [rt,gt,bt] = tint(el.color)
                return(
                    <div style={{background:`rgb(${rt},${gt},${bt})`, margin:'5px'}}>
                    <div style={{background:'grey',color:'white'}}>{el.type + '.' + el.id}</div>
                    <div>{el.props}</div>
                </div>
                )
            })
        }      
        </div>
    )
}