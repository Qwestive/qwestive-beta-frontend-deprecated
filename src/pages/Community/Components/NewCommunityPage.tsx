import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { Link, useSearchParams } from 'react-router-dom';
import { TtokenCommunity } from 'types/types';
import { getCommunitySymbol } from 'types/TypesUtil';
import NewPostPage from '../NewPost/NewPostPage';

type TnewCommunityPage = {
  community: TtokenCommunity | undefined;
};

export default function NewCommunityPage({
  community,
}: TnewCommunityPage): JSX.Element {
  const [searchParams] = useSearchParams({});
  const [postId, setPostId] = useState(searchParams.get('post'));
  const [symbol] = useState(getCommunitySymbol(community));

  useEffect(() => {
    setPostId(searchParams.get('post'));
  }, [searchParams]);

  return (
    <div>
      {postId === 'new-post' && <NewPostPage />}
      {postId !== 'new-post' && (
        <div className="mt-10">
          <div className="flex justify-center">
            <div className="py-2 gap-2 text-center">
              <img
                src={community?.imageUrl}
                className="h-24 mx-auto"
                alt="tokenImage"
              />
              <p
                className="text-color-primary  text-center 
          text-xl font-extrabold truncate mt-2">
                {community?.name ?? 'Unknown'}
              </p>
              <p
                className="text-color-secondary  text-center 
          text-sm font-bold truncate mt-1">
                {symbol}
              </p>
            </div>
          </div>
          <div>
            <p
              className="text-center mt-10 font-bold text-2xl 
            max-w-lg mx-auto">
              This is a new community, be the first to post something!
            </p>
            <div className="flex justify-center mt-10 transform scale-125">
              <Link to={`/c/${community?.cid}?post=new-post`}>
                <button type="button" className="btn-filled rounded-3xl py-2.5">
                  <p className="flex items-center gap-1 ">
                    <PlusIcon className="h-5" /> Post
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
