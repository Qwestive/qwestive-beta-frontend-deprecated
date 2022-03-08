import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import WriteArticlePost from '../../../common/services/Firebase/WriteData/WriteArticlePost';
import { userPublicKeyAtom } from '../../../recoil/userInfo';
import { IpostPreview, IpostArticle } from '../../../common/types';
import ClassNamesLogic from '../../../common/components/Util/ClassNamesLogic';
import CKeditorMaker from '../../../common/components/Posts/CKeditor/CKeditorMaker';

const MAXTITLELENGTH = 100;
const MINTITLELENGTH = 1;

const MAXARTICLELENGTH = 500000;
const MINARTICLELENGTH = 5;

const MAXCATEGORYLENGTH = 20;

type TarticlePost = {
  cId: string;
};

export default function ArticlePost({ cId }: TarticlePost): JSX.Element {
  const navigate = useNavigate();
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  const [title, setTitle] = useState('');
  const [articleText, setArticleText] = useState('');
  const [category, setCategory] = useState('');
  const [tokenRequirement, setTokenRequirement] = useState(0);

  const [postPublic, setPostPublic] = useState(true);

  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    // check data is valid
    setPublishing(true);
    try {
      if (title.length > MAXTITLELENGTH) {
        throw new Error('Title too long');
      }
      if (title.length < MINTITLELENGTH) {
        throw new Error(
          `The title should be at least ${MINTITLELENGTH} characters long`
        );
      }
      if (articleText.length > MAXARTICLELENGTH) {
        throw new Error('Article too long');
      }
      if (articleText.length < MINARTICLELENGTH) {
        throw new Error(
          `The post should be at least ${MINARTICLELENGTH} characters long`
        );
      }
      if (category.length > MAXCATEGORYLENGTH) {
        throw new Error('Topic too long');
      }
      let isPublic = true;
      if (!postPublic && tokenRequirement > 0) {
        isPublic = false;
      }

      if (userPublicKey !== undefined) {
        const postPreview: IpostPreview = {
          cId,
          authorId: userPublicKey,
          title,
          type: 'Article',
          category,
          creationTimestamp: new Date().getTime(),
          isPublic,
          tokenRequirement,
          commentCount: 0,
        };
        const postArticle: IpostArticle = {
          content: articleText,
        };
        const articleId = await WriteArticlePost(postPreview, postArticle);

        toast.success('post published');
        navigate(`/post/${articleId}`);
      } else {
        navigate('/');
      }
      /* eslint-disable-next-line */
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  return (
    <div className="mb-5">
      {/* Title */}
      <div className="p-px">
        <input
          type="text"
          name="title"
          id="title"
          className="border border-transparent 
          focus:border-qwestive-purple
           block w-full 
           text-2xl font-semibold px-3"
          placeholder="Title"
          value={title}
          maxLength={MAXTITLELENGTH}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* Content */}
      <div>
        <CKeditorMaker
          maxLength={MAXARTICLELENGTH}
          text={articleText}
          setText={setArticleText}
        />
      </div>
      {/* Topic */}
      <div className="p-px border-t">
        <div className="flex justify-start gap-3 items-center px-3">
          <p className="text-color-primary text-base font-medium"># Topic</p>
          <input
            type="text"
            name="topic"
            id="topic"
            className="border border-transparent 
           block 
           focus:ring-0
           focus:border-transparent 
           text-color-primary
           text-base  px-3
           text-left
           "
            placeholder="example: infos"
            value={category}
            maxLength={MAXCATEGORYLENGTH}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      {/* Exclusive Toggle */}
      <div className="p-px border-t py-2">
        <div className="flex justify-between">
          <div
            className="px-3 text-color-primary 
          text-base font-medium flex items-center gap-2">
            <EyeIcon className="h-4" />
            Who can see this post ?
          </div>
          <div
            className="flex justify-end gap-4 px-3
        text-color-primary text-sm  ">
            {/* Public Button */}
            <button type="button" onClick={() => setPostPublic(true)}>
              <div className="flex gap-1 items-center">
                <div className="transform scale-75">
                  <div
                    className="rounded-full border-2 border-gray-900
                 p-0.5">
                    <div
                      className={ClassNamesLogic(
                        !postPublic ? 'bg-transparant' : 'bg-qwestive-purple',
                        ' rounded-full p-1.5 m-auto'
                      )}
                    />
                  </div>
                </div>
                <p className="font-medium">Public</p>
              </div>
            </button>
            {/* Exclusive Button */}
            <button type="button" onClick={() => setPostPublic(false)}>
              <div className="flex gap-1 items-center">
                <div className="transform scale-75">
                  <div
                    className="rounded-full border-2 border-gray-900
                 p-0.5">
                    <div
                      className={ClassNamesLogic(
                        postPublic ? 'bg-transparant' : 'bg-qwestive-purple',
                        ' rounded-full p-1.5 m-auto'
                      )}
                    />
                  </div>
                </div>
                <p className="font-medium">Exclusive</p>
              </div>
            </button>
          </div>
        </div>
        {!postPublic && (
          <div className="mt-3 px-3">
            <div className="flex items-center gap-3">
              <p
                className="text-color-primary 
          text-base font-medium">
                Only to people who hold at least
              </p>
              <input
                type="number"
                name="tokenrequirement"
                id="tokenrequirement"
                className="border border-gray-300 rounded-md
                block 
                focus:ring-0
                text-color-primary
                text-sm  px-3
                text-left
                w-28
                h-8
                "
                value={tokenRequirement}
                min={0}
                step={0.0001}
                onChange={(e) => setTokenRequirement(e.target.valueAsNumber)}
              />
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="bg-gray-100 ">
        <div className="flex justify-start gap-3 pr-2 pt-4">
          <button
            type="button"
            className="btn-filled rounded-3xl px-6 py-2"
            onClick={() => handlePublish()}
            disabled={publishing}>
            {publishing ? <p>Loading ...</p> : <p>Publish</p>}
          </button>
          <button
            type="button"
            className="btn-transparent px-6 rounded-3xl py-2"
            onClick={() => navigate(-1)}
            disabled={publishing}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
