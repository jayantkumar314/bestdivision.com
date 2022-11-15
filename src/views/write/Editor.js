import React from "react";

// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/xml/xml";
// import "codemirror/mode/css/css";
// import "codemirror/mode/javascript/javascript";
// import { Controlled as ControlledEditor } from "react-codemirror2";

function Editor(props) {
  const language = ["html", "css", "javascript"];
  const options = {
    lineWrapping: true,
    lint: true,
    mode: props.language,
    lineNumbers: true,
    theme: "material",
  };
  function handleChange(editor, data, value) {
    props.onChange(value);
  }
  return (
    <div className="editor-container">
      {/* <div className="editor-title">
        {typeof window !== "undefined" &&
          typeof window.navigator !== "undefined" && (
            <ControlledEditor
              value={props.value}
              options={options}
              onBeforeChange={handleChange}
            />
          )}
      </div> */}
    </div>
  );
}

export default Editor;
