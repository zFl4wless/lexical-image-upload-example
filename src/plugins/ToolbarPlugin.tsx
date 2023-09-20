import React from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {INSERT_IMAGE_COMMAND} from "./ImagePlugin.tsx";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: file.name,
        src: URL.createObjectURL(file),
      });
    }

    event.target.value = "";
  }

  return (
    <div className="editor-toolbar">
      <input type="file" accept="image/*" onChange={onChange}/>
    </div>
  )
}
