import React from 'react';
import { ICustomCommunity } from 'types/types';
import { checkCommunityNameExist } from 'services/Firebase/GetData/CommunityUtil';
import { usernameCharValid } from './InputVerification';

const COMMUNITYNAMEMINLENGTH = 3;
export const COMMUNITYNAMEMAXLENGTH = 20;

export const MAXDISPLAYNAMELENGTH = 45;

/* Community name */
export const wrongLengthMessage = (): JSX.Element => (
  <p className="text-red-500">
    {`Community name needs to be between ${COMMUNITYNAMEMINLENGTH} 
        and ${COMMUNITYNAMEMAXLENGTH} characters or be your publickey`}
  </p>
);

export const takenMessage = (userNameBeingChecked: string): JSX.Element => (
  <p className="text-red-500">
    {`Community name ${userNameBeingChecked} is taken`}
  </p>
);
export const charactersNotAllowed = (
  <p className="text-red-500">Only letters, numbers, - and _ are allowed</p>
);
export const availableMessage = (userNameBeingChecked: string): JSX.Element => (
  <p className="text-neutral-500">
    {`Community name ${userNameBeingChecked} is available`}
  </p>
);
export const unexpectedErrorMessage = (
  <p className="text-red-500">Unexpected error. Please try again later</p>
);

export async function checkCommunityNameValid(
  communityNameBeingChecked: string | undefined,
  setLoadingCheckCommunityName: React.Dispatch<React.SetStateAction<boolean>>,
  setAvailabilityMessage: React.Dispatch<React.SetStateAction<JSX.Element>>
): Promise<boolean> {
  setLoadingCheckCommunityName(true);
  let isCommunityNameValid = true;

  if (
    communityNameBeingChecked === undefined ||
    communityNameBeingChecked?.length < COMMUNITYNAMEMINLENGTH ||
    communityNameBeingChecked?.length > COMMUNITYNAMEMAXLENGTH
  ) {
    setAvailabilityMessage(wrongLengthMessage());
    isCommunityNameValid = false;
  } else if (!usernameCharValid(communityNameBeingChecked)) {
    setAvailabilityMessage(charactersNotAllowed);
    isCommunityNameValid = false;
  } else {
    try {
      isCommunityNameValid = !(await checkCommunityNameExist(
        communityNameBeingChecked
      ));
      setAvailabilityMessage(
        isCommunityNameValid
          ? availableMessage(communityNameBeingChecked)
          : takenMessage(communityNameBeingChecked)
      );
    } catch (error: any) {
      setAvailabilityMessage(unexpectedErrorMessage);
      isCommunityNameValid = false;
    }
  }

  setLoadingCheckCommunityName(false);
  return isCommunityNameValid;
}

export function checkCommunityInput(community: ICustomCommunity): void {
  // info verification
  if (community.info.displayName.length > MAXDISPLAYNAMELENGTH) {
    throw new Error('DisplayName too long');
  }
}
