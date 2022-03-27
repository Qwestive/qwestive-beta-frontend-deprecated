import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

type TpollOption = {
  optionId: string;
  setOptionName: (arg0: string, arg1: string) => void;
  removeOption: (arg0: string) => void;
};

const MAXTITLELENGTH = 100;

/// Component which displays the title input box for post creation.
function PollOption({
  optionId,
  setOptionName,
  removeOption,
}: TpollOption): JSX.Element {
  return (
    <div className="flex flex-row my-4">
      <input
        type="text"
        name="option"
        className="border border-transparent border-gray-100
          focus:border-qwestive-purple block w-full text-md px-3 rounded-md"
        placeholder="Option Name"
        maxLength={MAXTITLELENGTH}
        onChange={(e) => setOptionName(optionId, e.target.value)}
      />
      <TrashIcon
        className="h-4 my-auto mx-2"
        onClick={() => removeOption(optionId)}
      />
    </div>
  );
}

export default PollOption;
