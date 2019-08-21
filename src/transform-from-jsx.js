import * as babel from '@babel/core'
import reactJsxPlugin from '@babel/plugin-transform-react-jsx'
import generate from '@babel/generator';
import * as t from "babel-types";

export function transformFromJsx(code){
  return babel.transformAsync(
    code,
    {plugins: [reactJsxPlugin]}
  ).then(res => {
    return babel.transformAsync(
      res.code,
      {plugins:[lolizer]}
    ).then(r => {
      return [r,tree]
    })
  })
}

// let alphas = []
// for(let i=65; i<=90; i++){
//   alphas.push(String.fromCharCode(i))
// }

let tree, index

export function lolizer() {
  tree = {}
  index = 0
  const TemplateVisitor = {
    Identifier(path) {
      // console.log(path.node.name)
    }
  }

  const JsVisitor = {
    CallExpression : {
      enter(path,state){
        if(path.node.callee.type==='MemberExpression' 
      && path.node.callee.object.name==='React' && path.node.callee.property.name==='createElement'){
        
        // debugger

        if(!path.treePointer){
          let x = {}
          let templateIndex = 'T' + index++
          tree[templateIndex] = x
          x.templateIndex = templateIndex
          path.treePointer = x
          x.isTopLevelTemplate = true
        }
        let tr = path.treePointer
        tr.type = path.node.arguments[0].name
        tr.props = generate(path.node.arguments[1]).code
        tr.children = null
        tr.childrenJsExp = []

        let childrenPaths = path.get('arguments').slice(2)
        if(childrenPaths.length){
          tr.children = []
          childrenPaths.forEach((childPath) => {
            let ct = {}
            if(childPath.node.type !== 'CallExpression'){
              tr.childrenJsExp.push(childPath)
            }
            tr.children.push(ct)
            childPath.treePointer = ct
            childPath.traverse(JsVisitor)
          })
        }

        }
      },
      exit(path,state){

        if(path.node.callee.type==='MemberExpression' 
      && path.node.callee.object.name==='React' && path.node.callee.property.name==='createElement'){
          let tr = path.treePointer
          if(!tr.childrenJsExp.length){
            if(tr.isTopLevelTemplate){
              path.replaceWith(
                t.stringLiteral(tr.templateIndex)
              );
            }
          }
        }
      }
    },
  }

  return {
    visitor: JsVisitor
  }
}

 
