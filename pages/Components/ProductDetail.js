import Link from "next/link";
import React from "react";

export const ProductDetail = () => {
  return (
    <div>
      <Link href="/product-detail">
        <div className="w-[700px] h-[300px] bg-slate-300 "></div>
      </Link>
    </div>
  );
};
