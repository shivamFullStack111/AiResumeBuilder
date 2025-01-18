// import JoditEditor, { IJoditEditorProps, Jodit } from "jodit-react";

// import { useEffect, useRef, useState } from "react";

// interface EditorProps {
//   responsibilities: string;
//   getValueOfEditor: (value: string) => void;
// }

// const TextEditor: React.FC<EditorProps> = ({
//   responsibilities,
//   getValueOfEditor,
// }) => {
//   const editor = useRef<Jodit>(null);
//   const [defaultValue, setdefaultValue] = useState("");

//   useEffect(() => {
//     if (responsibilities) {
//       setdefaultValue(responsibilities);
//     }
//   }, [responsibilities]);

//   return (
//     <JoditEditor
//       ref={editor}
//       value={defaultValue}
//       config={
//         {
//           readonly: false, // Editable mode
//           toolbar: true, // Show toolbar
//           buttons: [
//             "bold",
//             "italic",
//             "underline",
//             "|",
//             "ul", // Unordered List
//             "ol", // Ordered List
//             "outdent", // Decrease Indent
//             "indent", // Increase Indent
//             "|",
//             "spellcheck", // Spellcheck Button
//             "audio", // Audio Typing (Custom functionality required)
//             "|",
//             "undo",
//             "redo",
//           ], // Only these options will show
//           height: 400, // Editor height
//           toolbarAdaptive: false, // Adaptive toolbar ko disable karein
//           toolbarSticky: false,
//         } as unknown as IJoditEditorProps
//       }
//       onChange={(value) => getValueOfEditor(value)}
//     />
//   );
// };

// export default TextEditor

import React from "react";
import { Editor } from "primereact/editor";

interface EditorProps {
  setresponsibilities: (value: string) => void;
  responsibilities: string;
}

const TextEditor: React.FC<EditorProps> = (props) => {
  return (
    <>
      <Editor
        value={props?.responsibilities}
        onTextChange={(e) => props.setresponsibilities(e.htmlValue || "")}
        style={{ height: "320px" }}
      />
    </>
  );
};

export default TextEditor;
