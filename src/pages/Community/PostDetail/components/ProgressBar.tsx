import React, { useState, useEffect } from 'react';

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
      className="w-full mt-2 bg-gray-200 text-white rounded-md
        dark:bg-gray-700">
      <div
        className="bg-qwestive-purple p-2 rounded-md truncate"
        style={{ width: `${progress}%`, transitionDuration: '3s' }}>
        <span className="animate-fadeIn">{`${name}: ${Math.round(
          percentProgress
        )}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
