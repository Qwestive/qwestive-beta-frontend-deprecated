import React from 'react';
import LoadingDots from '../../../common/components/Util/LoadingDots';

/*
TODO:
- style 
- rename when other component
*/
export default function LoadingProfile(): JSX.Element {
  return (
    <div
      className="flex justify-center mt-10 items-baseline gap-2
    text-color-primary">
      <p className=" text-2xl font-semibold">Loading user</p>
      <LoadingDots classNameExtend="h-1.5 w-1.5" />
    </div>
  );
}
