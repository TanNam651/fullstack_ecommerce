import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Check, ChevronsUpDown, Loader2} from "lucide-react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

export type DataValueType = {
  id: string;
  name: string;
}

interface ComboboxProps<TData> extends PopoverTriggerProps {
  items: TData[],
  loading: boolean
  onchange: (value: string) => void,
  value: string
  searchable: boolean
  // disable?:boolean
}

export function Combobox<TData extends DataValueType>({
                                                        className,
                                                        items = [],
                                                        onchange,
                                                        loading,
                                                        disabled,
                                                        value,
                                                        searchable = false,
                                                      }: ComboboxProps<TData>) {
  const [open, setOpen] = useState<boolean>(false);

  const formattedItem = items.map((item) => ({
    id: item.id,
    name: item.name
  }));

  const currentSelect = formattedItem.find((item) => item.id === value) || formattedItem[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant="outline" role="combobox" aria-expanded={open}
                className={cn("justify-between cursor-pointer disabled:cursor-none", className)}>
          {
            loading ?
              (<span>
              <Loader2 className="animate-spin w-4 h-4"/>
            </span>)
              : currentSelect?.name
          }
          <ChevronsUpDown className="opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          {searchable && (<CommandInput placeholder="Search for list category" className="h-9"/>)}
          <CommandList>
            <CommandEmpty>No category found</CommandEmpty>
            <CommandGroup>
              {formattedItem.map((category) => (
                <CommandItem key={category.id} value={category.name} onSelect={() => {
                  onchange(category.id)
                  setOpen(false);
                }}>
                  {category.name}
                  <Check className={cn("ml-auto", currentSelect?.id === category.id ? "opacity-100" : "opacity-0")}/>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}