import React from "react";
import { TextArea } from "./components";

export default function Schema({ schema, setSchema, exit }) {
  const [v, setV] = React.useState(schema);
  return (
    <div style={{ height: "300px", width: "300px", background: "white" }}>
      <TextArea value={v} onChange={setV} />
      <button onClick={() => setSchema(v)}>Save</button>
      <button onClick={exit}>Exit</button>
    </div>
  );
}
