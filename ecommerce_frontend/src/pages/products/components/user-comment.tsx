import React from "react";
import {Review} from "@/pages/products/components/user-review.tsx";
import UserAccount from "@/assets/no_avatar.webp";
import Guarantee from "@/assets/guarantee_2x.webp";
import {Rating} from "@/components/ui/rating.tsx";

interface UserComment {
  comment: Review;
}

export const UserComment: React.FC<UserComment> = ({
                                                     comment
                                                   }) => {
  return (
    <>
      <div className="relative flex items-center">
        <p className="text-left inline-block align-middle">
          <span className="inline-block min-w-28">
            <img src={UserAccount} alt="user" width={20} height={20} className="inline-block mr-1"/>
            <cite className="font-bold italic text-xs">{comment.name}</cite>
          </span>
        </p>
        <Rating
          label=""
          value={comment.rating}
          disable={true}
          spacing="gap-x-1"
          onChange={() => {
          }}
        />
        <span style={{backgroundImage: `url(${Guarantee})`}}
              className={`ml-6 text-emerald-400 text-xs pl-5 font-normal bg-no-repeat bg-contain`}>{comment.status}</span>
      </div>
      <div>
        <p className="mb-2.5 text-sm">{comment.review}</p>
        <time className="text-xs text-gray-700 italic">{comment.createdAt}</time>
      </div>
    </>
  )
}