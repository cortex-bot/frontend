import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import './Editor.css'; // Import the CSS file for custom styling

function Editor({
  code,
  setCode
}: any) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleEscKey = (event: any) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={isFullScreen ? 'editor-fullscreen' : 'editor-container'}>
            <AceEditor
        style={{ height: '100%', width: '100%' }}
        placeholder='Start Coding'
        mode='python'
        theme='monokai'
        name='basic-code-editor'
        onChange={(currentCode) => setCode(currentCode)}
        fontSize={14}
        // showPrintMargin={true}
        // showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
            <button
        className={`fullscreen-button ${isFullScreen ? 'exit' : ''}`}
        onClick={toggleFullScreen}
      >
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
    </div>
  );
}

export default Editor;
