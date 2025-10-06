import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {ImagePlus, Trash} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

interface UploadImageProps {
  value: FileWithPreview[];
  onChange: (value: FileWithPreview[]) => void;
  onRemove: (value: FileWithPreview) => void;
  disable: boolean;
}

export type FileWithPreview = {
  file?: File,
  url: string //url or blob url
}
export const UploadImage: React.FC<UploadImageProps & { name: string }> = ({
                                                                             name,
                                                                             value,
                                                                             onChange,
                                                                             onRemove,
                                                                             disable
                                                                           }) => {
  // https://api.cloudinary.com/v1_1/ddicfhjuz/image/upload

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));
    onChange(mapped);
  }

  const removeItem = (value: FileWithPreview) => {
    onRemove(value);
  }
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((img) => (
          <div
            key={img.url}
            className="relative w-[150px] h-auto rounded-md overflow-hidden border p-4"
          >
            <img src={img.url} alt={img.url} width={150} height={150}/>
            <Button
              disabled={disable}
              type="button"
              variant="destructive"
              size="icon"
              className="z-10 absolute top-2 right-2 cursor-pointer"
              onClick={() => removeItem(img)}
            >
              <Trash className="h-4 w-4"/>
            </Button>
          </div>
        ))}
      </div>
      <div>
        <div>
          <Label aria-disabled={disable} htmlFor={`add-img-${name}`}
                 className="cursor-pointer back">
            <span className="flex  flex-row p-2 rounded-md bg-primary text-primary-foreground">
              <ImagePlus className="w-4 h-4 mr-2"/>
              Add
            </span>
          </Label>
          <Input disabled={disable} hidden id={`add-img-${name}`} type="file" onChange={changeImage} multiple/>
        </div>
      </div>
    </div>

  )
}