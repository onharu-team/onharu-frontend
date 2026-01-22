"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RiPokerHeartsFill } from "@remixicon/react";

interface CardProps {
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  tags?: string[];
  isLiked: boolean;
  onLikeToggle: () => void;
  href: string;
}

export const Card: React.FC<CardProps> = ({
  imageUrl,
  category,
  title,
  description,
  tags = [],
  isLiked = false,
  onLikeToggle,
  href,
}) => {
  return (
    <Link
      href={href}
      className="block transform transition-transform duration-200 ease-in-out hover:scale-102"
    >
      <div className="text-text border-border relative flex h-84.75 w-[337.5px] flex-col overflow-hidden rounded-[15px] border">
        <Image
          src={imageUrl}
          alt={title}
          width={337.5}
          height={183}
          className="h-45.75 w-full object-cover"
          priority
        />

        <div className="bg-main absolute top-2 right-4.5 rounded-[5px] px-5 py-2 font-bold text-white">
          {category}
        </div>

        <div className="flex flex-1 flex-col bg-white p-3.75">
          <div className="mb-2.5 flex h-5.5 items-center justify-between">
            <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>
            <button
              onClick={e => {
                e.preventDefault();
                onLikeToggle?.();
              }}
            >
              {isLiked ? (
                <RiPokerHeartsFill size={24} color="rgba(235,50,35,1)" />
              ) : (
                <RiPokerHeartsFill size={24} color="rgba(153,153,153,1)" />
              )}
            </button>
          </div>

          <p className="text-text line-clamp-2 text-base leading-4.75">{description}</p>

          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-main flex h-6.25 min-w-15.75 items-center justify-center rounded-[30px] px-3.75 text-[14px] font-bold text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
