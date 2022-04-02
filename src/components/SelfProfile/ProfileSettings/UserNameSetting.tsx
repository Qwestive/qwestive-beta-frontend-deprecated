import React, { useState, SetStateAction, Dispatch } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { userInfoAtom } from 'services/recoil/userInfo';

import { checkUserNameExist } from '../../../services/Firebase/GetData/UserUtils';
import SaveUserName from '../../../services/Firebase/UserSettings/SaveUserName';

type TsetUserNameEditing = {
  setIsEditingUserName: Dispatch<SetStateAction<boolean>>;
};

const USERNAMEMAXLENGTH = 20;
const USERNAMEMINLENGTH = 4;

/*
 userName either between 4 and 20 characters 
 or the public key

TODO:
- style
- handle errors better?
- decide on username specifications
- userName either between 4 and 20 characters or the public key
*/

export default function UserNameSetting({
  setIsEditingUserName,
}: TsetUserNameEditing): JSX.Element {
  const [userInfoRecoil, setUserInfoRecoil] = useRecoilState(userInfoAtom);

  const [userName, setUserName] = useState(userInfoRecoil?.userName ?? '');
  const [loadingCheckUserName, setLoadingCheckUserName] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const wrongLengthMessage = (
    <p>
      {`userName needs to be between ${USERNAMEMINLENGTH} 
      and ${USERNAMEMAXLENGTH} characters`}
    </p>
  );
  const takenMessage = (userNameBeingChecked: string) => (
    <p>{`userName ${userNameBeingChecked} is taken`}</p>
  );
  const availableMessage = (userNameBeingChecked: string) => (
    <p>{`userName ${userNameBeingChecked} is available`}</p>
  );
  const unexpectedErrorMessage = (
    <p>Unexpected error. Please try again later</p>
  );
  const [availabilityMessage, setAvailabilityMessage] = useState(
    userName !== undefined ? availableMessage(userName) : <p> </p>
  );

  async function checkUserNameValid(userNameBeingChecked: string | undefined) {
    setLoadingCheckUserName(true);
    let isUserNameValid = true;
    if (userNameBeingChecked !== userInfoRecoil?.userName) {
      // userName changed
      if (
        userNameBeingChecked === undefined ||
        userNameBeingChecked?.length < USERNAMEMINLENGTH ||
        (userNameBeingChecked?.length > USERNAMEMAXLENGTH &&
          userNameBeingChecked !== userInfoRecoil?.publicKey)
      ) {
        setAvailabilityMessage(wrongLengthMessage);
        isUserNameValid = false;
      } else {
        try {
          isUserNameValid = !(await checkUserNameExist(userNameBeingChecked));
          setAvailabilityMessage(
            isUserNameValid
              ? availableMessage(userNameBeingChecked)
              : takenMessage(userNameBeingChecked)
          );
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (error: any) {
          setAvailabilityMessage(unexpectedErrorMessage);
          isUserNameValid = false;
        }
      }
    }
    setLoadingCheckUserName(false);
    return isUserNameValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userNameBeingChecked = userName;
    setLoadingSubmit(true);
    let shouldEndEditing = true;
    if (userNameBeingChecked !== userInfoRecoil?.userName) {
      if (
        userNameBeingChecked !== undefined &&
        (await checkUserNameValid(userNameBeingChecked))
      ) {
        try {
          await SaveUserName(userNameBeingChecked);
          setUserInfoRecoil((prevState) =>
            prevState !== undefined
              ? {
                  ...prevState,
                  userName: userNameBeingChecked,
                }
              : undefined
          );
          toast.success('Your username has been updated!');
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (error: any) {
          toast.error(unexpectedErrorMessage);
          setAvailabilityMessage(unexpectedErrorMessage);
          shouldEndEditing = false;
        }
      } else {
        shouldEndEditing = false;
      }
    }
    setLoadingSubmit(false);
    setIsEditingUserName(!shouldEndEditing);
  }

  return (
    <div className="mt-10 px-1">
      <form onSubmit={handleSubmit}>
        <div className=" max-w-lg">
          <p className="block text-sm font-medium text-color-0 px-1">
            edit username between 4 and 20 characters or your publickey
          </p>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-field-input rounded-xl w-full max-w-sm"
            />
          </div>
        </div>

        <div>
          {loadingCheckUserName ? (
            <p>Loading</p>
          ) : (
            <button
              type="button"
              className="text-qwestive-purple 
              hover:text-qwestive-purple-hover 
              hover:underline
              font-semibold px-1"
              onClick={() => {
                checkUserNameValid(userName);
              }}>
              Check if userName is available
            </button>
          )}
        </div>
        <div className="px-1 text-color-0 break-words">
          {availabilityMessage}
        </div>
        <div className="flex gap-3 mt-8">
          {loadingSubmit ? (
            <p>loading...</p>
          ) : (
            <button type="submit" className="btn-filled rounded-3xl w-28">
              Save
            </button>
          )}
          <button
            type="button"
            className="btn-transparent bg-white rounded-3xl w-28 "
            onClick={() => setIsEditingUserName(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
