import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { userInfoAtom } from 'services/recoil/userInfo';
import ClassNamesLogic from 'components/Util/ClassNamesLogic';
import PostMakerContainer, {
  MAXARTICLELENGTH,
} from 'components/Posts/PostsMaker/PostMakerContainer/PostMakerContainer';
import CKeditorMaker from 'components/Posts/PostsMaker/PostMakerContent/CKeditorMaker';
import PollPostMaker from 'components/Posts/PostsMaker/PostMakerContent/PollPostMaker';
import {
  IpostPreview,
  IpostContentType,
  IpostArticle,
  IpollOption,
  IpostPoll,
} from 'types/types';

type TnewPostTabs = {
  cId: string;
};

export default function NewPostTabs({ cId }: TnewPostTabs): JSX.Element {
  const tabs = [
    { name: 'post' },
    { name: 'poll' },
    { name: 'bounty' },
    { name: 'vote' },
  ];

  const userInfo = useRecoilValue(userInfoAtom);
  const [currentTab, setCurrentTab] = useState(0);

  const [postPreview, setPostPreview] = useState<IpostPreview>({
    id: '',
    postType: 'article',
    accessTokenId: cId,
    accessMinimumTokenBalance: 0,
    authorUserId: userInfo?.uid ?? '',
    authorUserName: userInfo?.uid ?? '',
    authorPublicKey: userInfo?.uid ?? '',
    authorProfileImageUrl: userInfo?.uid ?? '',
    title: '',
    creationDate: new Date().getTime(),
    category: '',
    upVoteUserIds: [],
    downVoteUserIds: [],
    numberOfComments: 0,
  });

  // Post content states
  const [richTextContent, setRichTextContent] = useState('');

  const [articleContent, setArticleContent] = useState<IpostArticle>({
    postType: 'article',
    content: richTextContent,
  });

  const [pollOptions, setPollOptions] = useState<Array<IpollOption>>(() => [
    { id: Date.now().toString(), name: '', voteUserIds: [] },
  ]);
  const [pollContent, setPollContent] = useState<IpostPoll>({
    postType: 'poll',
    content: '',
    options: pollOptions,
  });

  useEffect(() => {
    setPollContent((prevState) => ({
      ...prevState,
      options: pollOptions,
    }));
  }, [pollOptions]);

  useEffect(() => {
    setPollContent((prevState) => ({
      ...prevState,
      content: richTextContent,
    }));
    setArticleContent((prevState) => ({
      ...prevState,
      content: richTextContent,
    }));
  }, [richTextContent]);

  function getPostContent(): IpostContentType {
    switch (postPreview.postType) {
      case 'poll':
        return pollContent;
      default:
        return articleContent;
    }
  }

  function switchPostContentType(tabId: number) {
    setCurrentTab(tabId);

    if (tabs[tabId].name === 'post') {
      setPostPreview((prevState) => ({
        ...prevState,
        postType: 'article',
      }));
    }
    if (tabs[tabId].name === 'poll') {
      setPostPreview((prevState) => ({
        ...prevState,
        postType: 'poll',
      }));
    }
  }

  return (
    <div>
      <div
        className="text-xl mt-1 
      font-bold 
      text-color-primary">
        New post
      </div>
      <div className="bg-white">
        {/* Small tabs dropdown */}
        <div className="mt-4 sm:hidden">
          <Listbox
            value={currentTab}
            onChange={(idx) => {
              switchPostContentType(idx);
            }}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button
                  className="relative w-full 
                  border
                border-gray-200 
                bg-white
                text-color-primary
                 shadow-sm pl-3 pr-10 py-2 
                text-left 
                font-medium text-sm">
                  <span className="block truncate capitalize">
                    {tabs[currentTab].name}
                  </span>
                  <span
                    className="absolute 
                  inset-y-0 right-0 flex items-center 
                  pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="h-5 w-5 
                      "
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options
                    className="absolute z-40 
                    mt-1 w-full 
                    border-neutral-300 
                    bg-white
                    text-color-primary
                    dark:text-neutral-200
                     max-h-60 
                    rounded-md py-1 
                  focus:outline-none
                  font-medium text-sm
                  ">
                    {tabs.map((tab, idx) => (
                      <Listbox.Option
                        key={tab.name}
                        className={({ active }) =>
                          ClassNamesLogic(
                            active ? 'bg-gray-100 ' : '',
                            'select-none relative py-2 pl-8 pr-4'
                          )
                        }
                        value={idx}>
                        {({ selected }) => (
                          <>
                            <span className="block truncate capitalize">
                              {tab.name}
                            </span>
                            {selected ? (
                              <span
                                className="absolute inset-y-0 
                              text-qwestive-purple
                              left-0 flex items-center 
                              pl-1.5">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
        {/* Large tabs */}
        <div className="mt-4 hidden sm:block bg-white">
          <div className=" ">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  type="button"
                  className={ClassNamesLogic(
                    idx === currentTab
                      ? 'border-gray-900 text-color-primary'
                      : 'border-transparant ' +
                          ' text-color-secondary' +
                          ' hover:text-gray-700 hover:border-gray-400',
                    'w-full py-4 px-1 text-center border-b-2 ' +
                      'font-bold text-base'
                  )}
                  onClick={() => {
                    switchPostContentType(idx);
                  }}>
                  <p className="capitalize">{tab.name}</p>
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-0.5">
          <PostMakerContainer
            postPreview={postPreview}
            setPostPreview={setPostPreview}
            getPostContent={() => getPostContent()}>
            <div>
              {/* Article */}
              <div className={currentTab === 0 ? 'block' : 'hidden'}>
                <CKeditorMaker
                  maxLength={MAXARTICLELENGTH}
                  text={richTextContent}
                  setText={setRichTextContent}
                />
              </div>
              {/* Poll */}
              <div className={currentTab === 1 ? 'block' : 'hidden'}>
                <PollPostMaker
                  MAXARTICLELENGTH={MAXARTICLELENGTH}
                  richTextContent={richTextContent}
                  setRichTextContent={setRichTextContent}
                  pollOptions={pollOptions}
                  setPollOptions={setPollOptions}
                />
              </div>
              <div className={currentTab === 2 ? 'block' : 'hidden'}>
                <p>Tab 2</p>
              </div>
              <div className={currentTab === 3 ? 'block' : 'hidden'}>
                <p>Tab 3</p>
              </div>
            </div>
          </PostMakerContainer>
        </div>
      </div>
    </div>
  );
}
