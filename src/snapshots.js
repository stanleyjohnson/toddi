import React from "react";
import { TextArea } from "./components";

export default function Snapshots({ snapshots, currentI, setCurrentI, exit }) {
  const [selectedI, setSelectedI] = React.useState(currentI);
  return (
    <div style={{ height: "300px", width: "300px", background: "white" }}>
      <div>
        {snapshots.map((e, i) => (
          <div
            onClick={() => {
              setSelectedI(i);
            }}
            onDoubleClick={() => {
              setCurrentI(i);
              exit();
            }}
          />
        ))}
      </div>
      {JSON.stringify(snapshots[selectedI])}
      <button onClick={exit}>Exit</button>
    </div>
  );
}
