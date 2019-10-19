import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';

class MyComponent extends React.Component {
  editorRef = React.createRef();

  handleClick = () => {
    this.editorRef.current.getInstance().exec('Bold');
  };

  render() {
    return (
      <>
        <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          initialValue="hello"
          ref={this.editorRef}
        />
        <button onClick={this.handleClick}>make bold</button>
      </>
    );
  }
}

export default MyComponent;