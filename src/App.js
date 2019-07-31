import React from "react";
import { Modal } from "./components";
import Schema from "./schema";
import State from "./state";
import Snapshots from "./snapshots";

const CHILD = 'CHILD'
const DEF = 'DEF'
const STATE = 'STATE'

const schema1 = {
  app : {
    type : CHILD,
    node : 'div',
    has : {
      heading : {
        type : CHILD,
        node : 'text'
      },
      container : {
        type : CHILD,
        node : 'div',
        has : {
          todoInput : {
            type : CHILD, node : 'div',
            value : {
              type : CHILD, node : 'text',
            }
          },
          todo : {
            type : DEF,
            has : {
              toggleButton : {
                type : CHILD, node : 'button'
              },
              item : {
                type : CHILD, node : 'text'
              }
            }
          },
          todos : {
            type : CHILD, node : 'div',

          }     
        }
      }
    }
  }
}

const state1 = {
  app : {
    heading : 'todoItems',
    container : {
      todoInput : {
        value : 'sample'
      },
      todos : [{
        toggleButton : true,
        
      }]
    }
  }
}

class App extends React.Component {
  state = {
    absoluteEls: null,
    snapshots: [],
    currentIndex: null,
    schema: null,
    draftState: {
      type:'div',
      props : {
        style : {
          height:'100px',width:'100px',backgroundColor:'green'
        }
      },
      children:[
        {
          type:'div',
          props : {
            style : {
              height:'10px',width:'10px',backgroundColor:'red'
            }
          }
        }
      ]
    },
    showSchema: false,
    showState: false,
    showSnapshots: false
  };

  convertStateToEl = state => {
    const {type : Type, children, props} = state
    if(!children) return <Type {...props}></Type>
    return <Type {...props}>{children.map(this.convertStateToEl)}</Type>
  }

  render() {
    const {
      state: {
        showSchema,
        showState,
        showSnapshots,
        schema,
        snapshots,
        currentIndex,
        draftState
      }
    } = this;

    let el = null
    try{
      el = this.convertStateToEl(draftState)
    }catch(e){
      el = 'error'
    }

    return (
      <div style={{ display: "flex", position: "relative" }}>
        <div
          style={{
            backgroundColor: "aliceblue",
            width: "700px",
            height: "700px"
          }}
        >
          {el}
          {/*<div
            onMouseOver={e => {
              var {
                top,
                width,
                left,
                height
              } = e.target.getBoundingClientRect();
              this.setState({
                absoluteEls: (
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      position: "absolute",
                      top: `${top}px`,
                      left: `${left}px`,
                      width: `${width}px`,
                      height: `${height}px`
                    }}
                  />
                )
              });
            }}
            style={{
              backgroundColor: "green",
              height: "100px",
              width: "100px"
            }}
          />*/}
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ showSchema: true });
            }}
          >
            Schema
          </button>
          <Modal isOpen={showSchema}>
            <Schema
              schema={schema}
              setSchema={s => {
                this.setState({ schema: s });
              }}
              exit={() => {
                this.setState({ showSchema: false });
              }}
            />
          </Modal>
          <button
            onClick={() => {
              this.setState({ showState: true });
            }}
          >
            State
          </button>
          <Modal isOpen={showState}>
            <State
              exit={() => {
                this.setState({ showState: false });
              }}
              existingState={
                currentIndex ? snapshots[currentIndex].state : null
              }
              draftState={draftState}
              setDraftState={s => this.setState({ draftState: s })}
              addNewState={() => {
                this.setState({
                  snapshots: snapshots.concat([{ state: draftState }])
                });
              }}
              replaceState={() => {
                let newSnapshots = [...snapshots];
                newSnapshots[currentIndex] = draftState;
                this.setState({ snapshots: newSnapshots });
              }}
            />
          </Modal>
          <button
            onClick={() => {
              this.setState({ showSnapshots: true });
            }}
          >
            Snapshots
          </button>
          <Modal isOpen={showSnapshots}>
            <Snapshots
              exit={() => {
                this.setState({ showSnapshots: false });
              }}
              snapshots={snapshots}
              exit={() => {
                this.setState({ showSnapshots: false });
              }}
              currentI={currentIndex}
              setCurrentI={i => {
                this.setState({ currentIndex: i });
              }}
            />
          </Modal>
        </div>
        {this.state.absoluteEls}
      </div>
    );
  }
}

export default App;
