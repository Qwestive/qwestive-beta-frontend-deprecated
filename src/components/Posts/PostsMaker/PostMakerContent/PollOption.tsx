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
        className="
        text-field-input block w-full text-md px-3 rounded-xl"
        placeholder="Option Name"
        maxLength={MAXTITLELENGTH}
        onChange={(e) => setOptionName(optionId, e.target.value)}
      />
      <button
        type="button"
        className="text-color-1 hover:text-red-700 dark:hover:text-red-700"
        onClick={() => removeOption(optionId)}>
        <TrashIcon className="h-6 my-auto mx-2" />
      </button>
    </div>
  );
}

export default PollOption;
