import protectAdmin from "@/protect/protect-admin";
import protectLogin from "@/protect/protect-login";
import Link from "next/link";
import React from "react";

const LayoutUser = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between w-16 h-screen bg-white border-e">
        <div>
          <Link href={'/user'} className="inline-flex items-center justify-center w-16 h-16">
            <span className="grid w-10 h-10 text-xs text-gray-600 bg-gray-100 rounded-lg place-content-center">
              U
            </span>
          </Link>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <ul className="pt-4 space-y-1 border-t border-gray-100">
                <li>
                  <Link
                    href="/user/pendaftaran"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M21 18V6C21 3.79086 19.2091 2 17 2H7C4.79086 2 3 3.79086 3 6V18C3 20.2091 4.79086 22 7 22H17C19.2091 22 21 20.2091 21 18Z"
                        fill="#28303F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25 7C7.25 6.58579 7.58579 6.25 8 6.25H12C12.4142 6.25 12.75 6.58579 12.75 7C12.75 7.41421 12.4142 7.75 12 7.75H8C7.58579 7.75 7.25 7.41421 7.25 7Z"
                        fill="#28303F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z"
                        fill="#28303F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H16C16.4142 16.25 16.75 16.5858 16.75 17C16.75 17.4142 16.4142 17.75 16 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
                        fill="#28303F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18 1.25C18.4142 1.25 18.75 1.58579 18.75 2V4.25L21 4.25C21.4142 4.25 21.75 4.58579 21.75 5C21.75 5.41421 21.4142 5.75 21 5.75H18.75V8C18.75 8.41421 18.4142 8.75 18 8.75C17.5858 8.75 17.25 8.41421 17.25 8V5.75L15 5.75C14.5858 5.75 14.25 5.41421 14.25 5C14.25 4.58579 14.5858 4.25 15 4.25L17.25 4.25V2C17.25 1.58579 17.5858 1.25 18 1.25Z"
                        fill="#28303F"
                      />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Pendaftaran
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/akun"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        opacity="0.4"
                        cx="12"
                        cy="17"
                        rx="7"
                        ry="4"
                        fill="#28303F"
                      />
                      <circle cx="12" cy="7" r="4" fill="#28303F" />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Edit Akun
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 p-2 bg-white border-t border-gray-100">
          <Link
            href={"/"}
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};
export default protectLogin(LayoutUser);
