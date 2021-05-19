import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Paginator({ count, link, main, current }) {
  const router = useRouter();
  console.log("paginator count => ", count);
  const handlePrevious = () => {
    console.log("previous");
  };
  const handleNext = () => {
    console.log("next");
  };
  const handleRandom = (no) => {
    if (main) {
      if (no > 1) {
        router.push(`${link}/${no}`);
      }
    } else {
      if (no === 1) {
        router.push(`${link}`);
      } else {
        router.push(`${link}/page/${no}`);
      }
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <button onClick={handlePrevious}>Previous</button>
        {Array(count)
          .fill()
          .map((i, n) => (
            <button
              key={`btn-${n}`}
              onClick={() => handleRandom(n + 1)}
              className={`px-4 mx-2 border border-black ${
                n + 1 === current ? "bg-blue-400" : ""
              }`}
            >
              {n + 1}
            </button>
          ))}
        <button onClick={handleNext}> Next </button>
      </div>
    </div>
  );
}
