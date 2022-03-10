import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import { IimageEditingModal } from '../../../../../types';

interface ItipModal {
  open: boolean;
  setOpen: boolean;
  children: Array<string>;
}

export default function TipModal({
  open,
  setOpen,
  children,
}: IimageEditingModal): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-0 inset-0 overflow-y-auto"
        onClose={setOpen}>
        <div
          className="flex justify-center pt-4 px-4 pb-20 text-center 
        sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 
            transition-opacity"
            />
          </Transition.Child>

          {/* This element is to center the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              className="w-full inline-block align-bottom bg-white rounded-lg 
              px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform 
              transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:p-6">
              <div className=" sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setOpen(false)}>
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-0 ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium 
                    text-color-primary">
                    Edit your image
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
