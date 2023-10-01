import SocialAuth from "./social-auth";

export default function SignUp() {
  return (
    <div className="flex flex-col h-full justify-start items-center py-20">
      <div className="flex flex-col gap-6">
        <div className="box-border w-fit">
          <div className="flex flex-col items-stretch justify-start gap-8 rounded bg-white w-96 my-0 mx-7 py-10 px-8">
            {/* logo */}
            <div className="flex flex-row items-stretch justify-start h-[24px] object-cover">
              <a className="box-border inline-flex items-center m-0 cursor-pointer no-underline font-normal text-sm text-slate-600">
                <img
                  crossOrigin="anonymous"
                  srcSet="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=200 1x,https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=400 2x"
                  src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=400"
                  className="inline-block h-full"
                  alt="Clerk"
                />
              </a>
            </div>

            {/* header */}
            <div className="flex flex-col items-stretch justify-start gap-1">
              <h1 className="box-border text-black m-0 font-semibold text-xl">
                Sign up
              </h1>
              <p className="box-border text-slate-400 m-0 text-base font-normal">
                to continue to Clerk
              </p>
            </div>

            {/* main */}
            <div className="flex flex-col items-stretch justify-start gap-8">
              {/* social button */}
              <SocialAuth />

              {/* divider */}
              <div className="flex flex-row flex-nowrap items-center justify-center">
                <div className="flex flex-row flex-nowrap items-stretch justify-start flex-1 h-[1px] bg-slate-300"></div>
                <p className="box-border text-slate-500 text-sm font-medium my-0 mx-4">
                  or
                </p>
                <div className="flex flex-row flex-nowrap items-stretch justify-start flex-1 h-[1px] bg-slate-300"></div>
              </div>

              {/* form */}
              <form className="flex flex-col flex-nowrap items-stretch justify-start gap-4">
                <div className="flex flex-row flex-nowrap items-stretch justify-between gap-4">
                  <div className="flex flex-col flex-nowrap items-stretch justify-start relative flex-1">
                    <div className="flex flex-row flex-nowrap items-center justify-between mb-1 ml-0">
                      <label className="text-black font-medium text-sm flex items-center">
                        First name
                      </label>
                    </div>
                    <input className="m-0 py-3 px-4 bg-white text-black outline outline-2 outline-transparent outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400" />
                  </div>

                  <div className="flex flex-col flex-nowrap items-stretch justify-start relative flex-1">
                    <div className="flex flex-row flex-nowrap items-center justify-between mb-1 ml-0">
                      <label className="text-black font-medium text-sm flex items-center">
                        First name
                      </label>
                    </div>
                    <input className="m-0 py-3 px-4 bg-white text-black outline outline-2 outline-transparent outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400" />
                  </div>
                </div>

                <div className="flex flex-row flex-nowrap items-stretch justify-between gap-4">
                  <div className="flex flex-col flex-nowrap items-stretch justify-start relative flex-1">
                    <div className="flex flex-row flex-nowrap items-center justify-between mb-1 ml-0">
                      <label className="text-black font-medium text-sm flex items-center">
                        First name
                      </label>
                    </div>
                    <input className="m-0 py-3 px-4 bg-white text-black outline outline-2 outline-transparent outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400" />
                  </div>
                </div>

                <div className="flex flex-row flex-nowrap items-stretch justify-between gap-4">
                  <div className="flex flex-col flex-nowrap items-stretch justify-start relative flex-1">
                    <div className="flex flex-row flex-nowrap items-center justify-between mb-1 ml-0">
                      <label className="text-black font-medium text-sm flex items-center">
                        First name
                      </label>
                    </div>
                    <div className="flex flex-col flex-nowrap items-stretch justify-center relative">
                      <input className="m-0 py-3 pr-10 pl-4 bg-white text-black outline-transparent outline outline-2 outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400" />
                      <button className="my-0 ml-0 mr-3 p-1 border-0 outline-0 select-none cursor-pointer rounded inline-flex justify-center items-center transition font-normal text-sm min-h[1.5rem] tracking-wider w-6 absolute right-0 text-slate-400 hover:text-slate-500 focus:transition focus:shadow focus:shadow-indigo-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="flex-shrink-0 w-4 h-4"
                        >
                          <path
                            fill="currentColor"
                            d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                          ></path>
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M.46 10a10 10 0 0 1 19.08 0A10 10 0 0 1 .46 10ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button className="m-0 py-3 px-5 border-0 outline-0 select-none cursor-pointer bg-indigo-700 text-white rounded inline-flex justify-center items-center transition font-semibold text-xs tracking-wider uppercase min-h-[2.25rem] w-full hover:bg-indigo-800">Continue</button>
              </form>
            </div>

            {/* footer */}
            <div className="flex flex-row flex-nowrap items-stretch justify-start gap-1">
              <span className="box-border text-slate-400 text-sm font-normal">No account?</span>
              <a className="box-border inline-flex items-center m-0 cursor-pointer no-underline font-normal text-sm text-indigo-600">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
