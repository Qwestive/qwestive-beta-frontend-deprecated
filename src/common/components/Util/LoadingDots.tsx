import React from 'react';

type TloadingDot = {
  classNameExtend: string;
};

export default function LoadingDots({
  classNameExtend,
}: TloadingDot): JSX.Element {
  return (
    <div className="flex">
      <div
        className={`${classNameExtend} bg-current rounded-full 
        mr-1 animate-bounce0`}
      />
      <div
        className={`${classNameExtend} bg-current rounded-full 
        mr-1 animate-bounce200`}
      />
      <div
        className={`${classNameExtend} bg-current rounded-full 
        animate-bounce400`}
      />
    </div>
  );
}
