import React, { useState, useEffect } from 'react';

type IprogressBar = {
  percentProgress: number;
};

/// Components which displays the rich text contents of a post.
function ProgressBar({ percentProgress }: IprogressBar): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentProgress);
  }, [percentProgress]);

  return (
    <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
