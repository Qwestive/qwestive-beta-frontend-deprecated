import { ImessageToSign, IsignedMessage } from '../../../types';

/*
uid is the publickey as a string
message is the message to sign
publickey is the Uint8Array version of teh publickey
signMessage is a wallet function used to sign the message
*/
export default async function SignMessage(
  messageToSign: ImessageToSign
): Promise<IsignedMessage> {
  if (!messageToSign.publicKey) throw new Error('Wallet not connected!');
  if (!messageToSign.signMessage)
    throw new Error('Wallet does not support message signing!');

  const encodedMessage = new TextEncoder().encode(messageToSign.message);
  const signature = await messageToSign.signMessage(encodedMessage);

  return {
    uid: messageToSign.uid,
    encodedMessage,
    signature,
    publicKeyBytes: messageToSign.publicKey.toBytes(),
  };
}
