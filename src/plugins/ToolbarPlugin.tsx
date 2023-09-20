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
      <label className="file-input-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className="lucide lucide-image">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        Image

        <input className="file-input" type="file" accept="image/*" onChange={onChange}/>
      </label>
    </div>
  )
}
