import React from 'react'
import {tint} from './components'

const Box = ({type,id, children, color:[r,g,b]}) => {
    const [rt, gt, bt] = tint([r,g,b])
    return <div style={{padding:'20px 5px 0px 20px', position:'relative', border:`1px solid rgb(${r},${g},${b})`,
        margin : '0 0 5px 0',background:`rgba(${rt},${gt},${bt})`
    }}>
        <div style={{position:'absolute', top:'-5px', background:'grey', color:'white' }}>{`${type}.${id}`}</div>
        {children}
    </div>
}

export const TemplateEditor = ({E,templates,setTemplates}) => {
    
    const rec = (el) => {
        return el.type ?
        <Box type={el.type} id={el.id} children={
            el.children ?
            (()=>{
                return el.children.map(rec)
            })() :
            null
        } color={el.color}/> : null
    }
    const v = []
    for(let tmpl in E){
        v.push(rec(E[tmpl]))
    }

    return (
        <div>
            <div style={{margin:`30px 0 20px 0px`}}>T</div>
            <div style={{background:'white'}}>{v}</div>
        </div>
    )
}