import React, { useState, useEffect } from 'react';
import ClassNamesLogic from '../../../Util/ClassNamesLogic';

type IprogressBar = {
  name: string;
  percentProgress: number;
};

/// Components which displays an animated progress bar.
function ProgressBar({ name, percentProgress }: IprogressBar): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentProgress);
  }, [percentProgress]);

  return (
    <div
      className={ClassNamesLogic(
        Math.round(percentProgress) === 0 && 'p-2',
        'w-full mt-2 bg-qwestivegray-100 rounded-md dark:bg-gray-700'
      )}>
      {percentProgress > 0 ? (
        <div
          className="bg-qwestiveblue-100 p-3 rounded-md truncate text-sm"
          style={{ width: `${progress}%`, transitionDuration: '2s' }}>
          <span className="animate-fadeIn text-white">{`${name}: ${Math.round(
            percentProgress
          )}%`}</span>
        </div>
      ) : (
        <span className="p-2 animate-fadeIn text-sm">{`${name}: ${Math.round(
          percentProgress
        )}%`}</span>
      )}
    </div>
  );
}

export default ProgressBar;
