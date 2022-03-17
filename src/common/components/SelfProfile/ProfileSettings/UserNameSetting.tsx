import React, { useState, SetStateAction, Dispatch } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { userPublicKeyAtom, userNameAtom } from '../../../../recoil/userInfo';
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
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const [userNameRecoil, setUserNameRecoil] = useRecoilState(userNameAtom);

  const [userName, setUserName] = useState(userNameRecoil);
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
    if (userNameBeingChecked !== userNameRecoil) {
      // userName changed
      if (
        userNameBeingChecked === undefined ||
        userNameBeingChecked?.length < USERNAMEMINLENGTH ||
        (userNameBeingChecked?.length > USERNAMEMAXLENGTH &&
          userNameBeingChecked !== userPublicKey)
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
    if (userNameBeingChecked !== userNameRecoil) {
      if (
        userNameBeingChecked !== undefined &&
        (await checkUserNameValid(userNameBeingChecked))
      ) {
        try {
          await SaveUserName(userNameBeingChecked);
          setUserNameRecoil(userNameBeingChecked);
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
    <div>
      <button
        type="button"
        className="btn-filled"
        onClick={() => setIsEditingUserName(false)}>
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <p>edit username between 4 and 20 characters</p>
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-field-input"
          />
        </div>
        <div>
          {loadingCheckUserName ? (
            <p>Loading</p>
          ) : (
            <button
              type="button"
              className="btn-filled"
              onClick={() => {
                checkUserNameValid(userName);
              }}>
              Check if userName is available
            </button>
          )}
        </div>
        <div>{availabilityMessage}</div>
        <div>
          <button
            type="button"
            className="btn-filled"
            onClick={() => setIsEditingUserName(false)}>
            Cancel
          </button>
        </div>
        <div>
          {loadingSubmit ? (
            <p>loading...</p>
          ) : (
            <button type="submit" className="btn-filled">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
