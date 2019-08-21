import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TemplateEditor} from './template-editor'
import {MainEditor} from './main-editor';
import { PropsEditor } from './props-editor';
import {transformFromJsx} from './transform-from-jsx'

/*
      r(0)
   b(1) g(2)
*/

const divideColorRange = ({current, delta}, n) => {
  const childRanges = []
  for(let i=-n+1; i<=n-1; i+=2){    
      let newCurrent = current+i*(delta/(2*n))
      if(newCurrent<0){
          newCurrent+=3
      } else if(newCurrent>3){
          newCurrent-=3
      }
      childRanges.push({ current: newCurrent, delta:delta/n})
  }
  
  return childRanges
}

const getColor = ({current}) => {
  let c = Math.floor(current)
  let d = current-c
  let d1 = Math.floor((1-d)*255)
  let d2 = Math.floor((d)*255)
  if(c===0){
      return [d1,0,d2]
  }
  if(c===1){
      return [0,d2,d1]
  }
  if(c===2){
      return [d2,d1,0]
  }
}

const colorizeTemplateTree = (x) => {
    const addColorsToTree = (el,spectrum) => {
        el.color = getColor(spectrum)
        if(Array.isArray(el.children)){
            const childRanges = divideColorRange(spectrum,el.children.length)
            el.children.forEach((e,i) => {
                addColorsToTree(e,childRanges[i])
            })
        }
    }
    for(let tmpl in x){
        addColorsToTree(x[tmpl],{current:0, delta:3})
    }
    return x
}

const App = () => {
    const [tmplTree,setTmplTree] = React.useState({})
    const [mainText, setMainText] = React.useState('')
  return (
    <>
    <input type="file"
       id="avatar" name="avatar"
       accept=".js" onChange={(e)=>{
           Array.from(e.target.files)[0].text().then(res => {     
                transformFromJsx(res).then(tr => {
                    console.log('transform result',tr)
                    let [transformRes, templateTree] = tr
                    let x = colorizeTemplateTree(templateTree)
                    setTmplTree(x)
                    setMainText(transformRes.code)
                }).catch(e => {
                    console.log('transformFromJsx error',e)
                })
           })
       }}/>
    <button onClick={()=>{}}>Download</button>
    <div style={{display:'flex'}}>
      <div style={{width:'33%', margin:'20px'}}>
        <div>Template Editor</div>
        <TemplateEditor E={tmplTree}/>
      </div>
      <div style={{width:'33%', margin:'20px'}}>
        <div>Main Editor</div>
          <MainEditor mainText={mainText} setMainText={setMainText}/>
        </div>
      <div style={{width:'33%', margin:'20px'}}>
        <div>Props Editor</div>
          <PropsEditor E={tmplTree} />
        </div>
    </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));