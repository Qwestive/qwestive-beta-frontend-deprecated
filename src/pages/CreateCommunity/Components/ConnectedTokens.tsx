import React, { useState } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';

type TtokenList = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function ConnectedTokens(): JSX.Element {
  const people = [
    {
      id: 1,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'jess Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More users...
  ];
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedPersonList, setSelectedPersonList] = useState<TtokenList[]>(
    []
  );

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-color-1 text-lg font-bold">Connected Tokens</h2>
        <h3 className="text-sm font-medium text-color-secondary">
          People who hold any token below will be able to access
        </h3>
      </div>
      {selectedPersonList.map((se, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx}>
          <Combobox
            as="div"
            value={selectedPersonList[idx]}
            onChange={(val) => {
              setSelectedPersonList((prev) => {
                console.log(selectedPersonList);
                const temp = prev;
                temp[idx].name = val.name;
                temp[idx].imageUrl = val.imageUrl;
                return temp;
              });
            }}>
            <div className="relative mt-1 max-w-lg">
              <Combobox.Input
                className="
            text-field-input
            w-full rounded-xl border 
             py-2 pl-3 pr-10 shadow-sm text-base sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(person: any) => person.name}
              />
              <Combobox.Button
                className="absolute inset-y-0 
          right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredPeople.length > 0 && (
                <Combobox.Options
                  className="absolute z-10 
            mt-1 max-h-56 w-full overflow-auto rounded-xl 
            surface-color-0 border-color-0
            py-1 shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none text-base sm:text-sm">
                  {filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      value={person}
                      className={({ active }) =>
                        ClassNamesLogic(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-color-1'
                        )
                      }>
                      {({ active, selected }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={person.imageUrl}
                              alt=""
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                            <span
                              className={ClassNamesLogic(
                                'ml-3 truncate',
                                selected && 'font-semibold'
                              )}>
                              {person.name}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={ClassNamesLogic(
                                'absolute inset-y-0 right-0' +
                                  ' flex items-center pr-4',
                                active ? 'text-white' : 'text-indigo-600'
                              )}>
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      ))}

      <div>
        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
          <div className="relative mt-1 max-w-lg">
            <Combobox.Input
              className="
              text-field-input
              w-full rounded-xl border 
               py-2 pl-3 pr-10 shadow-sm text-base sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person.name}
            />
            <Combobox.Button
              className="absolute inset-y-0 
            right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredPeople.length > 0 && (
              <Combobox.Options
                className="absolute z-10 
              mt-1 max-h-56 w-full overflow-auto rounded-xl 
              surface-color-0 border-color-0
              py-1 shadow-lg ring-1 ring-black ring-opacity-5 
              focus:outline-none text-base sm:text-sm">
                {filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      ClassNamesLogic(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-color-1'
                      )
                    }>
                    {({ active, selected }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={person.imageUrl}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={ClassNamesLogic(
                              'ml-3 truncate',
                              selected && 'font-semibold'
                            )}>
                            {person.name}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={ClassNamesLogic(
                              'absolute inset-y-0 right-0' +
                                ' flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
      <div>
        <button
          type="button"
          className="button-neutral px-3 h-9"
          onClick={() =>
            setSelectedPersonList((prev) => [
              ...prev,
              {
                id: prev.length,
                name: '',
                imageUrl: '',
              },
            ])
          }>
          + add a token or NFT
        </button>
      </div>
    </div>
  );
}
