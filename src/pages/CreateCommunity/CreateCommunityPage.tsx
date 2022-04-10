import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICustomCommunity, EcommunityType } from 'types/types';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';
import { useRecoilValue } from 'recoil';
import CreateCustomCommunity from 'services/Firebase/WriteData/CommunityUtil';
import Spinner from 'components/Util/Spinner';
import {
  checkCommunityNameValid,
  checkCommunityInput,
} from 'functions/InputVerification/CommunityVerfication';

import CommunityDetails from './Components/CommunityDetails';
import ConnectedTokens from './Components/ConnectedTokens';
import SocialVerification from './Components/SocialVerification';
import CommunityManagers from './Components/CommunityManagers';

export default function CreateCommunityPage(): JSX.Element {
  const userInfo = useRecoilValue(userInfoAtom);

  const [community, setCommunity] = useState<ICustomCommunity>({
    cid: '',
    type: EcommunityType.custom,
    name: '',
    displayName: '',
    imageUrl: '',
    tokens: [],
    requirements: [],
    managers: [],
    categories: [],
  });

  /* Community Details */
  const [imageFile, setImageFile] = useState<File | Blob | undefined>();
  const [availabilityMessage, setAvailabilityMessage] = useState(<p> </p>);
  const [loadingCheckCommunityName, setLoadingCheckCommunityName] =
    useState(false);

  async function checkCommunityName(
    userNameBeingChecked: string
  ): Promise<boolean> {
    return checkCommunityNameValid(
      userNameBeingChecked,
      setLoadingCheckCommunityName,
      setAvailabilityMessage
    );
  }

  /* Tokens requirements */

  const [requirements, setRequirements] = useState<Set<string>>(
    new Set<string>()
  );

  /* Submit */
  const [submitLoading, setSubmitLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setSubmitLoading(true);
    event.preventDefault();
    const communityBeingChecked = community;
    communityBeingChecked.managers.unshift(userInfo?.publicKey ?? '');
    const managersSubmitted = Array.from(
      new Set(
        communityBeingChecked.managers.filter((mana) => mana.length === 44)
      )
    );
    communityBeingChecked.managers = managersSubmitted;
    communityBeingChecked.tokens = Array.from(requirements);
    communityBeingChecked.requirements = Array.from(requirements);

    try {
      if (!(await checkCommunityName(communityBeingChecked.name))) {
        throw new Error('Name not valid');
      }
      checkCommunityInput(communityBeingChecked);
      await CreateCustomCommunity(community, imageFile);
      toast.success('Community created');
    } catch (error: any) {
      toast.error(error?.message);
    }
    setSubmitLoading(false);
  }

  return (
    <div className="page-frame max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-10 mt-5">
        {/* Title */}
        <h1 className="text-color-0 font-extrabold text-2xl">
          Create a community
        </h1>
        {/* Details */}
        <div
          className="surface-color-0 border-color-1 
        p-3 sm:p-6 shadow-lg rounded-2xl">
          <CommunityDetails
            community={community}
            setCommunity={setCommunity}
            setImageFile={setImageFile}
            availabilityMessage={availabilityMessage}
            checkCommunityName={(communityNameBeingChecked) =>
              checkCommunityName(communityNameBeingChecked)
            }
            loadingCheckCommunityName={loadingCheckCommunityName}
          />
        </div>
        {/* Connected Tokens */}
        <div
          className="surface-color-0 border-color-1
        p-3 sm:p-6 shadow-lg rounded-2xl">
          <ConnectedTokens setRequirements={setRequirements} />
        </div>
        {/* Social Verification */}
        <div
          className="surface-color-0 border-color-1
        p-3 sm:p-6 shadow-lg rounded-2xl">
          <SocialVerification />
        </div>
        {/* Community Managers */}
        <div
          className="surface-color-0 border-color-1 
        p-3 sm:p-6 shadow-lg rounded-2xl">
          <CommunityManagers
            community={community}
            setCommunity={setCommunity}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="button-action rounded-3xl w-28 py-2 flex justify-center">
            {submitLoading ? (
              <div className="flex items-center gap-2">
                <Spinner classExtend="h-4 w-4" />
                Processing
              </div>
            ) : (
              <p>Create</p>
            )}
          </button>
          <Link to="/">
            <button
              type="button"
              className="button-cancel py-2 rounded-3xl w-28 flex 
              justify-center">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
