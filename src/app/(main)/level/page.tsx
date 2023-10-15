import React from 'react';
import Link from 'next/link';
import levels from '@/src/constants/level';
const page = () => {
  return (
    <div className="px-4 flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full sm:w-5/6 mt-4"></div>
      <div className="w-full sm:w-5/6">
        <div
          className="grid gap-4 "
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {levels.map((level: any, index: number) => (
            <div
              className="p-4 bg-zinc-700 rounded flex justify-between"
              key={index}
            >
              <div className="flex items-center gap-3">
                <div className="text-4xl">N{level.level}</div>
                <div className="flex flex-col gap-0 justify-items-center">
                  <p className="text-base leading-tight">{level.name}</p>
                  <span className="text-xs text-zinc-400 leading-tight">
                    {level.count} Kanji
                  </span>
                </div>
              </div>
              <Link
                href={`/level/${level.level}`}
                className="flex items-center bg-zinc-600 px-3 rounded hover:bg-zinc-500"
              >
                Begin
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
