"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  total,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const skip = searchParams.get("skip") ?? "0";
  const limit = searchParams.get("limit") ?? "10";

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?skip=${Number(skip) - Number(limit)}&limit=${limit}`);
        }}
      >
        prev page
      </Button>

      <div>
        Page {Number(skip) / Number(limit) + 1} of{" "}
        {Math.ceil(total / Number(limit))}
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?skip=${Number(skip) + Number(limit)}&limit=${limit}`);
        }}
      >
        next page
      </Button>
    </div>
  );
};

export default PaginationControls;
