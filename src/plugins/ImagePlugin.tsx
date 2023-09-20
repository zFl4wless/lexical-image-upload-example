import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$wrapNodeInElement} from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand, PASTE_COMMAND
} from "lexical";
import {useEffect} from "react";

import {$createImageNode, ImageNode, ImagePayload} from "../nodes/ImageNode";

export type InsertImagePayload = Readonly<ImagePayload>;

// eslint-disable-next-line react-refresh/only-export-components
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand(
  "INSERT_IMAGE_COMMAND"
);

export default function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();


  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    editor.registerCommand<InsertImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
          $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
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
  }, [editor]);

  return null;
}
