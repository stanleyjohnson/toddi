import * as t from "babel-types";
const babel = window.Babel

babel.registerPlugin('lolizer', lolizer);

export function transformFromJsx(code){
  return babel.transform(
    code,
    {plugins: ['lolizer'], presets:['react']}
  )
}

const alphas = []
for(let i=65; i<=90; i++){
  alphas.push(String.fromCharCode(i))
}

const state = null
const currentIndex = null

export function lolizer() {

  state = {}
  currentIndex = [] 

  function createTemplateBlock(path){
    this.path = path
    this.jsBlocks = {}
  }

  function createJsBlock(path){
    this.path = path
    this.templateBlocks = {}
  }
  
  const TemplateVisitor = {
    Identifier(path) {
      // console.log(path.node.name)
    }
  }

  const JsVisitor = {
    Identifier(path) {
      if(path.node.name==='createElement' && path.parent.type==='MemberExpression' && path.parent.object.name==='React'){
        currentIndex.push(alphas)
        // createTemplateBlock
        // debugger
        console.log('!@#')
      }
      
    }
  }

  return {
    visitor: JsVisitor
  }
}

 
