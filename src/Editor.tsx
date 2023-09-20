import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import ImagesPlugin from "./plugins/ImagePlugin.tsx";
import {ImageNode} from "./nodes/ImageNode.tsx";
import {PastedImagePlugin} from "./plugins/PastedImagePlugin.tsx";

const theme = {}


function onError(error: Error) {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [ImageNode]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin/>
      <PlainTextPlugin
        contentEditable={<ContentEditable className='content-editable'/>}
        placeholder={<div className="editor-placeholder">Write your stuff...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ImagesPlugin/>
      <PastedImagePlugin/>
    </LexicalComposer>
  );
}
