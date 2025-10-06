import React, {useRef} from "react";
import {Editor} from "@tiptap/react";

import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered, ImagePlus

} from "lucide-react";
import {Toggle} from "@/components/ui/toggle.tsx";
import {Input} from "@/components/ui/input.tsx";


interface MenuBarProps {
  editor: Editor | null
}

export const MenuBar: React.FC<MenuBarProps> = ({
                                                  editor
                                                }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const options = [
    {
      icon: <Heading1 className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleHeading({level: 1}).run(),
      pressed: editor?.isActive("heading", {level: 1})
    },
    {
      icon: <Heading2 className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleHeading({level: 2}).run(),
      pressed: editor?.isActive("heading", {level: 2})
    },
    {
      icon: <Heading3 className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleHeading({level: 3}).run(),
      pressed: editor?.isActive("heading", {level: 3})
    },
    {
      icon: <Bold className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      pressed: editor?.isActive("bold")
    },
    {
      icon: <Italic className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      pressed: editor?.isActive("italic")
    },
    {
      icon: <AlignLeft className="size-4"/>,
      onClick: () => editor?.chain().focus().setTextAlign("left").run(),
      pressed: editor?.isActive({textAlign: "left"})
    },
    {
      icon: <AlignCenter className="size-4"/>,
      onClick: () => editor?.chain().focus().setTextAlign("center").run(),
      pressed: editor?.isActive({textAlign: "center"})
    },
    {
      icon: <AlignRight className="size-4"/>,
      onClick: () => editor?.chain().focus().setTextAlign("right").run(),
      pressed: editor?.isActive({textAlign: "right"})
    },
    {
      icon: <AlignJustify className="size-4"/>,
      onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
      pressed: editor?.isActive({textAlign: "justify"})
    },
    {
      icon: <List className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      pressed: editor?.isActive("bulletList")
    },
    {
      icon: <ListOrdered className="size-4"/>,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      pressed: editor?.isActive("orderedList")
    },
    {
      icon: <><ImagePlus className="size-4"/><Input ref={fileInputRef} type="file" accept="image/*" hidden
                                                    onChange={(e) => changeInput(e)}/></>,
      onClick: () => openFolder(),
      pressed: false
    },
  ];

  const openFolder = () => {
    fileInputRef.current?.click();
  }
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const render = new FileReader();
    render.onload = () => {
      const base = render.result as string;
      editor.chain().focus().setImage({src: base, alt: "description"}).run();
    }
    render.readAsDataURL(file);

    // const mapped = URL.createObjectURL(file)
  }

  if (!editor) return null;

  return (
    <div className="border-none rounded-tl-md rounded-tr-md p-1 mb-1 bg-slate-100 space-x-2 z-50 sticky top-0">
      {options.map((option, index) => (
        <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick} className="cursor-pointer">
          {option.icon}
        </Toggle>
      ))}
    </div>
  )
}