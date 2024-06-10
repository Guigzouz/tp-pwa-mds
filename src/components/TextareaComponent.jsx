import { useState } from "react";

export default function TextareaComponent({ onContentChange }) {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setContent(newValue);
    if (onContentChange) {
      onContentChange(newValue);
    }
  };

  return (
    <>
      <textarea
        name="main"
        className="main-textarea"
        value={content}
        onChange={handleChange}
      ></textarea>
    </>
  );
}
