import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import SaveUserInfo from '../../../../services/Firebase/UserSettings/SaveUserInfo';
import {
  userDisplayNameAtom,
  userBioAtom,
  userPersonalLinkAtom,
} from '../../../../../recoil/userInfo';

const DISPLAYNAMEMAXLENGTH = 50;
const BIOMAXLENGTH = 160;

export default function UserInfoForm(): JSX.Element {
  const [displayNameRecoil, setDisplayNameRecoil] =
    useRecoilState(userDisplayNameAtom);
  const [bioRecoil, setBioRecoil] = useRecoilState(userBioAtom);
  const [personalLinkRecoil, setPersonalLinkRecoil] =
    useRecoilState(userPersonalLinkAtom);

  const [displayName, setDisplayName] = useState(
    displayNameRecoil !== undefined ? displayNameRecoil : ''
  );
  const [bio, setBio] = useState(bioRecoil !== undefined ? bioRecoil : '');
  const [personalLink, setPersonalLink] = useState(
    personalLinkRecoil !== undefined ? personalLinkRecoil : ''
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (displayName.length > DISPLAYNAMEMAXLENGTH)
        throw new Error(
          `Display Name must be smaller than ${DISPLAYNAMEMAXLENGTH} characters`
        );
      if (bio.length > BIOMAXLENGTH)
        throw new Error(`Bio must be smaller than ${BIOMAXLENGTH} characters`);
      if (
        displayName !== displayNameRecoil ||
        bio !== bioRecoil ||
        personalLink !== personalLinkRecoil
      ) {
        await SaveUserInfo(displayName, bio, personalLink);
        setDisplayNameRecoil(displayName);
        setBioRecoil(bio);
        setPersonalLinkRecoil(personalLink);
      }
      toast.success('Your profile was updated!');
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <p className="block text-sm font-medium text-color-primary">
              Display Name
            </p>
            <div className="mt-1 ">
              <input
                type="text"
                name="username"
                id="displayname"
                autoComplete="off"
                className="text-field-input"
                maxLength={DISPLAYNAMEMAXLENGTH}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <p className="block text-sm font-medium text-color-primary">
              About
            </p>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="text-field-input"
                autoComplete="off"
                maxLength={BIOMAXLENGTH}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <p className="mt-2 text-sm text-color-secondary">
              Write a few sentences about yourself.
            </p>
          </div>

          <div className="sm:col-span-6">
            <p className="block text-sm font-medium text-color-primary">Link</p>
            <div className="mt-1 ">
              <input
                type="text"
                name="link"
                id="link"
                autoComplete="off"
                className="text-field-input"
                value={personalLink}
                onChange={(e) => setPersonalLink(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 flex justify-end">
        <button type="submit" className="btn-filled">
          Save
        </button>
      </div>
    </form>
  );
}
