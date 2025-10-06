import {useEditor, EditorContent} from "@tiptap/react"

import {StarterKit} from "@tiptap/starter-kit";
import {MenuBar} from "@/components/ui/menu-bar.tsx";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import React, {useEffect} from "react";

// const extensions = [StarterKit];
// const content = '<p>Hello word!</p>'
interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
                                                content,
                                                onChange
                                              }) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "!list-disc ml-3"
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: "!list-decimal ml-3"
          }
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Image.configure({})
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border-none rounded-none bg-slate-50 py-2 px-3 focus:outline-none focus:ring-0"
      }
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    editor?.commands.setContent(content || '');
  }, [content]);

  return (
    <div className="relative border rounded-md bg-slate-50">
      <MenuBar editor={editor}/>
      <EditorContent editor={editor}/>
    </div>
  )
}