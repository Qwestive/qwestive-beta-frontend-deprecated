import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import { getUserInfosByUserName } from '../../../services/Firebase/GetData/UserUtils';
import LoadingProfile from './LoadingProfile';
import UserFound from './UserFound';
import UserNotFound from './UserNotFound';

type TuserName = {
  userName: string | undefined;
};
/*
TODO:
- try caching? 
- Test dev then remove Logs
*/
export default function OtherProfilePage({ userName }: TuserName): JSX.Element {
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  async function getUser() {
    setPageLoading(true);
    if (userName !== undefined) {
      try {
        setUserData(await getUserInfosByUserName(userName));
      } catch (error) {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
    setPageLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {(() => {
        if (pageLoading) {
          return <LoadingProfile />;
        }
        if (userData) {
          return <UserFound userData={userData} />;
        }
        return <UserNotFound userName={userName} />;
      })()}
    </>
  );
}
