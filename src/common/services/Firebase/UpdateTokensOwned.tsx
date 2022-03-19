import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { FirebaseFunctions } from './FirebaseConfig';

export default async function UpdateTokensOwned(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HttpsCallableResult<any>
> {
  const updateTokensOwned = httpsCallable(
    FirebaseFunctions,
    'updateTokensOwned-updateTokensOwned'
  );
  return updateTokensOwned({});
}
