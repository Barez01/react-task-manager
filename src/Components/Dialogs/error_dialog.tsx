"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ErrorDialog({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="border border-solid bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-[15px] border-[#FFFFFF33] relative transform overflow-hidden rounded-lg bg-[rgba(255, 255, 255, 0.2)] text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-white"
                  >
                    Error Occurred
                  </DialogTitle>
                  <div className="mt-5">
                    <p className="text-sm text-gray-400">{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-solid border-[#FFFFFF33] inline-flex flex-[0_0_200px] justify-center rounded-md px-3 py-2 text-sm font-normal text-[#FFFFFF90] hover:bg-[#FFFFFF33] sm:ml-3 sm:w-auto"
              >
                Ok
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
