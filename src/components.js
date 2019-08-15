import React from 'react';

export function Modal({ isOpen, children }){
    return !isOpen ? null :
    <div style={{position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
            {children}
        </div>
}

document.execCommand('insertText', false, ' '.repeat(4));

export const TextArea = ({value='', onChange, ...others}) => {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={(e) => {
        if(e.keyCode === 9){
          e.preventDefault();
        }
      }} {...others}/>
    )
  }