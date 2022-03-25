import React from 'react';
import { IpollOption } from 'types/types';
import CKeditorMaker from './CKeditorMaker';
import PollOption from './PollOption';

type TpollPostMaker = {
  MAXARTICLELENGTH: number;
  richTextContent: string;
  setRichTextContent: React.Dispatch<React.SetStateAction<string>>;
  pollOptions: IpollOption[];
  setPollOptions: React.Dispatch<React.SetStateAction<IpollOption[]>>;
};

export default function PollPostMaker({
  MAXARTICLELENGTH,
  richTextContent,
  setRichTextContent,
  pollOptions,
  setPollOptions,
}: TpollPostMaker): JSX.Element {
  const buildNewOption = (): IpollOption => ({
    id: Date.now().toString(),
    name: '',
    voteUserIds: [],
  });

  function handleRemoveOption(id: string) {
    setPollOptions((currentPollOptions) => {
      const filteredOptions = currentPollOptions?.filter(
        (item) => item.id !== id
      );
      return filteredOptions;
    });
  }

  function handleAddOption() {
    const newOption = buildNewOption();
    setPollOptions([...pollOptions, newOption]);
  }

  const updateOption = (id: string, name: string) => {
    setPollOptions((currentPollOptions) => {
      const idx = currentPollOptions?.findIndex(
        (item: IpollOption) => item.id === id
      );

      const filteredOptions = currentPollOptions?.filter(
        (item) => item.id !== id
      );

      filteredOptions?.splice(idx, 0, {
        id,
        name,
        voteUserIds: [],
      });
      return filteredOptions;
    });
  };
  return (
    <div>
      <CKeditorMaker
        maxLength={MAXARTICLELENGTH}
        text={richTextContent}
        setText={setRichTextContent}
      />
      {pollOptions.map((item: IpollOption) => (
        <PollOption
          key={item.id}
          optionId={item.id}
          setOptionName={(id: string, name: string) => updateOption(id, name)}
          removeOption={(id: string) => handleRemoveOption(id)}
        />
      ))}
      <button
        type="button"
        className="mx-4 mb-3 btn-link"
        onClick={() => handleAddOption()}>
        Add Option
      </button>
    </div>
  );
}
