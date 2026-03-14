"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export default function EmptyState({
  title,
  subtitle,
  showButton = true,
  buttonText = "나눔가게 보러가기",
  buttonLink = "/charitystore",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-secondary sm:text-md mt-6 flex flex-col items-center gap-2 rounded-[10px] py-8 text-center text-sm font-medium sm:mt-12 sm:gap-5 ${className}`}
    >
      <div>
        <p>{title}</p>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {showButton && (
        <Link href={buttonLink}>
          <Button varient="default" width="md" height="md" fontSize="sm">
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
