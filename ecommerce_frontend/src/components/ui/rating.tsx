import React from "react";
import {Star} from "lucide-react";
import {cn} from "@/lib/utils.ts";

interface RatingProps {
  label: string;
  value: number;
  spacing: string;
  disable: boolean;
  showTitle?: boolean;
  onChange: (value: number) => void,
}

export const Rating: React.FC<RatingProps> = ({
                                                label,
                                                value,
                                                onChange,
                                                spacing,
                                                showTitle,
                                                disable
                                              }) => {
  return (
    <div className="relative flex gap-x-2 py-2">
      <h2 className={cn("text-gray-700", showTitle ? "hidden" : "")}>{label}</h2>
      <div className={cn("flex", spacing)}>
        {[...Array(5)].map((_, index) => (
          <Star
            aria-disabled={disable}
            key={index + 1} data-value={index + 1}
            className={cn("cursor-pointer", value > index && disable ? "fill-amber-200 text-amber-200" : value > index && !disable ? "fill-amber-300 text-amber-300" : value < index && disable ? "fill-white text-amber-200" : "fill-white text-amber-300")}
            onClick={disable ? undefined : () => onChange(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}