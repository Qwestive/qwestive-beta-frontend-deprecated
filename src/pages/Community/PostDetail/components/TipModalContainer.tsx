import React, { useState, SetStateAction, Dispatch } from 'react';
import TipModal from './TipModal';
import { SendTipButton } from './SendTipButton';

interface ItipModalContainer {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  tipReceiverPublicKey: string;
  tipReceiverUserName: string;
}

/// Container which displays modal that allows sending a tip.
function TipModalContainer({
  isOpen,
  setIsOpen,
  tipReceiverPublicKey,
  tipReceiverUserName,
}: ItipModalContainer): JSX.Element {
  const [tipAmmountInput, setTipAmmountInput] = useState(0);
  const [tipSuccess, setTipSuccess] = useState(false);
  const [istipLoading, setIsTipLoading] = useState(false);

  function handleSetTipAmmountInput(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    setTipAmmountInput(event?.currentTarget.valueAsNumber);
  }

  return (
    <TipModal open={isOpen} setOpen={setIsOpen}>
      <div className="flex flex-col text-center">
        {!istipLoading && !tipSuccess && (
          <>
            <h2>
              🥳 This is great! <b>{tipReceiverUserName}</b> will be happy to
              receive your tip!
              <p className="text-xs text-color-secondary">
                Receiver Public Key: {tipReceiverPublicKey}
              </p>
            </h2>
            <div className="flex flex-row justify-center my-4 mx-auto">
              <input
                className="rounded-lg"
                type="number"
                value={tipAmmountInput}
                onChange={handleSetTipAmmountInput}
              />
              <SendTipButton
                toPublicKey={tipReceiverPublicKey}
                solAmmount={tipAmmountInput}
                transactionStartedCallback={() => setIsTipLoading(true)}
                transactionCompleteCallback={(result: boolean) => {
                  setIsTipLoading(false);
                  setTipSuccess(result);
                }}
              />
            </div>
          </>
        )}
        {istipLoading && (
          <div>
            <h1 className="text-green-500	text-3xl">
              Processing Transaction...
            </h1>
          </div>
        )}
        {tipSuccess && (
          <div>
            <h1 className="text-green-500	text-3xl">Transaction success!</h1>
          </div>
        )}
      </div>
    </TipModal>
  );
}

export default TipModalContainer;
