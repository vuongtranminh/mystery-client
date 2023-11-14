import { FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "@/constants";

export default function SocialAuth() {
  return (
    <div className="grid items-stretch justify-stretch grid-cols-1 gap-2">
      <a href={GOOGLE_AUTH_URL} className="group m-0 py-3 px-5 border-solid border border-slate-200 outline-0 select-none cursor-pointer text-black rounded inline-flex items-center font-normal text-sm min-h-[2.25rem] tracking-wider w-full gap-4 relative justify-start overflow-hidden text-ellipsis">
        <span className="flex flex-row items-center justify-center flex-grow-0 flex-shrink-0 basis-4">
          <img
            crossOrigin="anonymous"
            srcSet="https://img.clerk.com/static/google.svg?width=80 1x,https://img.clerk.com/static/google.svg?width=160 2x"
            src="https://img.clerk.com/static/google.svg?width=160"
            className="w-5"
            alt="Sign in with Google"
          />
        </span>
        <div className="flex flex-row items-center justify-start gap-2 w-full overflow-hidden">
          <span className="box-border m-0 text-sm font-normal text-ellipsis whitespace-nowrap overflow-hidden">
            Continue with Google
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          className="flex-shrink-0 min-w-[1rem] min-h-[1rem] w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.3 10h13.4m-5-5 5 5-5 5"
          ></path>
        </svg>
      </a>
      <a href={FACEBOOK_AUTH_URL} className="group m-0 py-3 px-5 border-solid border border-slate-200 outline-0 select-none cursor-pointer text-black rounded inline-flex items-center font-normal text-sm min-h-[2.25rem] tracking-wider w-full gap-4 relative justify-start overflow-hidden text-ellipsis">
        <span className="flex flex-row items-center justify-center flex-grow-0 flex-shrink-0 basis-4">
          <img
            crossOrigin="anonymous"
            srcSet="https://img.clerk.com/static/github.svg?width=80 1x,https://img.clerk.com/static/github.svg?width=160 2x"
            src="https://img.clerk.com/static/github.svg?width=160"
            className="w-5"
            alt="Sign in with Facebook"
          />
        </span>
        <div className="flex flex-row items-center justify-start gap-2 w-full overflow-hidden">
          <span className="box-border m-0 text-sm font-normal text-ellipsis whitespace-nowrap overflow-hidden">
            Continue with Facebook
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          className="flex-shrink-0 min-w-[1rem] min-h-[1rem] w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.3 10h13.4m-5-5 5 5-5 5"
          ></path>
        </svg>
      </a>
      <a href={GITHUB_AUTH_URL} className="group m-0 py-3 px-5 border-solid border border-slate-200 outline-0 select-none cursor-pointer text-black rounded inline-flex items-center font-normal text-sm min-h-[2.25rem] tracking-wider w-full gap-4 relative justify-start overflow-hidden text-ellipsis">
        <span className="flex flex-row items-center justify-center flex-grow-0 flex-shrink-0 basis-4">
          <img
            crossOrigin="anonymous"
            srcSet="https://img.clerk.com/static/github.svg?width=80 1x,https://img.clerk.com/static/github.svg?width=160 2x"
            src="https://img.clerk.com/static/github.svg?width=160"
            className="w-5"
            alt="Sign in with GitHub"
          />
        </span>
        <div className="flex flex-row items-center justify-start gap-2 w-full overflow-hidden">
          <span className="box-border m-0 text-sm font-normal text-ellipsis whitespace-nowrap overflow-hidden">
            Continue with GitHub
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          className="flex-shrink-0 min-w-[1rem] min-h-[1rem] w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.3 10h13.4m-5-5 5 5-5 5"
          ></path>
        </svg>
      </a>
    </div>
  );
}
