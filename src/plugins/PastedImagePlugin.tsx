import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import {COMMAND_PRIORITY_EDITOR, PASTE_COMMAND} from "lexical";
import {INSERT_IMAGE_COMMAND} from "./ImagePlugin.tsx";

export function PastedImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand<ClipboardEvent>(
      PASTE_COMMAND,
      (event) => {
        if (!event.clipboardData) {
          return false;
        }

        const file = event.clipboardData.files[0];
        if (file && file.type.startsWith("image/")) {
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            altText: file.name,
            src: URL.createObjectURL(file),
          });

          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null;
}
