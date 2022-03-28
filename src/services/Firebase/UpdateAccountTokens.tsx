import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { FirebaseFunctions } from './FirebaseConfig';

export async function UpdateAccountFungibleTokens(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HttpsCallableResult<any>
> {
  const udpateAccountFungibleTokens = httpsCallable(
    FirebaseFunctions,
    'updateAccountTokens-updateAccountFungibleTokens'
  );
  return udpateAccountFungibleTokens({});
}

export async function UpdateAccountNonFungibleTokens(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HttpsCallableResult<any>
> {
  const updateAccountNonFungibleTokens = httpsCallable(
    FirebaseFunctions,
    'updateAccountTokens-updateAccountNonFungibleTokens'
  );
  return updateAccountNonFungibleTokens({});
}
