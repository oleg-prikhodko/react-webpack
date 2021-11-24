import React, { useState } from "react";

export default function SecondPage() {
  const [text, setText] = useState("");
  const handleTextChange = (event: React.ChangeEvent) => {
    setText(event.target.value);
  };
  return (
    <div>
      <h2>Second page</h2>
      <section>
        <label>
          Test text:
          <input value={text} onChange={handleTextChange} />
        </label>
        <div>Text length: {text.length}</div>
      </section>
    </div>
  );
}
