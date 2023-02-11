// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';
// import React from 'react';

// const HtmlEditor = ()=>{
//     const { quill, quillRef } = useQuill();
//     // console.log(quill)
//     React.useEffect(() => {
//       if (quill) {
//         quill.on('text-change', (delta, oldDelta, source) => {
//           // console.log('Text change!');
//           // console.log(quill.getText()); // Get text only
//           // console.log(quill.getContents()); // Get delta contents
//           // console.log(quill.root.innerHTML); // Get innerHTML using quill
//           // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
//         });
//       }
//     }, [quill]);

//     return (
//         <div style={{ width: 1000, height: 200 }}>
//           {/* <input value="jdnfg"></input> */}
//           <div ref={quillRef}/>
          
//         </div>
//       );
    
// }

// export default HtmlEditor;


// ##################################ReactQuill############
// import React, { useState } from "react";

// import ReactQuill from "react-quill";
// function Editor() {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ size: [] }],
//       [{ font: [] }],
//       [{ align: ["right", "center", "justify"] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       [{ color: ["red", "#785412"] }],
//       [{ background: ["red", "#785412"] }]
//     ]
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "color",
//     "image",
//     "background",
//     "align",
//     "size",
//     "font"
//   ];

//   const [code, setCode] = useState("hellllo");
//   const handleProcedureContentChange = (content, delta, source, editor) => {
//     setCode(content);
//     //let has_attribues = delta.ops[1].attributes || "";
//     //console.log(has_attribues);
//     //const cursorPosition = e.quill.getSelection().index;
//     // this.quill.insertText(cursorPosition, "★");
//     //this.quill.setSelection(cursorPosition + 1);
//   };

//   return (
//     <>
//       {console.log(code)}
//       <ReactQuill
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         value={code}
//         onChange={handleProcedureContentChange}
//       />
//     </>
//   );
// }

// export default Editor;


import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import React, { Component } from 'react'



class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>My initial content.</p>')
        )
      ),
    }
  }

  render() {
    return <Editor editorState={this.state.editorState} />
  }
}

export default MyEditor


