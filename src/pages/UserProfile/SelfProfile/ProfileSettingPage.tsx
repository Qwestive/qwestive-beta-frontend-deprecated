import React, { useState } from 'react';

import UserInfoSetting from '../../../common/components/SelfProfile/ProfileSettings/UserInfoSetting';
import UserNameSetting from '../../../common/components/SelfProfile/ProfileSettings/UserNameSetting';

export default function ProfileSettingPage(): JSX.Element {
  // Username seperated because user should
  // not change it often and not by accident
  const [isEditingUserName, setIsEditingUserName] = useState<boolean>(false);

  return (
    <div className="mx-auto max-w-5xl">
      {isEditingUserName ? (
        <UserNameSetting setIsEditingUserName={setIsEditingUserName} />
      ) : (
        <UserInfoSetting setIsEditingUserName={setIsEditingUserName} />
      )}
    </div>
  );
}
