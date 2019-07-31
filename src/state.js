import React from "react";
import { TextArea } from "./components";

export default function State({
  existingState,
  draftState,
  setDraftState,
  addNewState,
  replaceState,
  exit
}) {
    const [v, setV] = React.useState(JSON.stringify(draftState))
  return (
    <div style={{ height: "300px", width: "300px", background: "white" }}>
      {JSON.stringify(existingState)}
      <TextArea value={v} onChange={setV}/>
      <button onClick={()=>setDraftState(JSON.parse(v))}>Save</button>
      <button onClick={addNewState}>Add new</button>
      <button onClick={replaceState}>Replace</button>
      <button onClick={exit}>Exit</button>
    </div>
  );
}
