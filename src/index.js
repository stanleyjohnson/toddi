import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TemplateEditor} from './template-editor'
import {MainEditor} from './main-editor';
import { PropsEditor } from './props-editor';
import {transformFromJsx} from './transform-from-jsx'

const App = () => {
    const [templates,setTemplates] = React.useState({})
    const [templateProps, setTemplateProps] = React.useState({})
    const [mainText, setMainText] = React.useState('')
  return (
    <>
    <div style={{display:'flex'}}>
    <input type="file"
       id="avatar" name="avatar"
       accept=".js" onChange={(e)=>{
           Array.from(e.target.files)[0].text().then(res => {     
            const tr = transformFromJsx(res)
            setTemplates(tr.templates)
            setTemplateProps(tr.templateProps)
            setMainText(tr.mainText)
           })
       }}/>
      </div>
    <button onClick={()=>{}}>Download</button>
    <div style={{display:'flex'}}>
      <div style={{flexGrow:'1'}}>
        <div>header</div>
        <TemplateEditor templates={templates} setTemplates={setTemplates}/>
      </div>
      <div style={{flexGrow:'1'}}>
          <MainEditor mainText={mainText} setMainText={setMainText}/>
        </div>
      <div style={{flexGrow:'1'}}>
          <PropsEditor templateProps={templateProps} setTemplateProps={setTemplateProps} />
        </div>
    </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));