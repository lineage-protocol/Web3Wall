export const RefreshIcon = () => {
  return (
    <svg
      className="h-6 w-6 text-white"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" /> <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />{' '}
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
    </svg>
  )
}

export const PlayIcon = () => {
  return (
    <svg fill="#FFFFFF" height="24px" width="24px" version="1.1" viewBox="0 0 32 32">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M21.6,15.2l-9-7c-0.3-0.2-0.7-0.3-1.1-0.1C11.2,8.3,11,8.6,11,9v14c0,0.4,0.2,0.7,0.6,0.9C11.7,24,11.9,24,12,24 c0.2,0,0.4-0.1,0.6-0.2l9-7c0.2-0.2,0.4-0.5,0.4-0.8S21.9,15.4,21.6,15.2z"></path>{' '}
      </g>
    </svg>
  )
}

export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 mr-1"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

export const LoadingSpinner = () => {
  return (
    <svg
      aria-hidden="true"
      height="24px"
      width="24px"
      className="animate-spin fill-indigo-600 text-gray-400 dark:text-gray-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  )
}

export const StopIcon = () => {
  return (
    <svg fill="#FFFFFF" height="24px" width="24px" version="1.1" viewBox="0 0 32 32">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M23,8H9C8.4,8,8,8.4,8,9v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1V9C24,8.4,23.6,8,23,8z"></path>
      </g>
    </svg>
  )
}

export const UnmutedSpeakerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="000"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="000"
      className="h-8 w-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fff"
        stroke="#fff"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  )
}
export const MutedSpeakerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="000"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="000"
      className="h-8 w-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fff"
        stroke="#fff"
        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  )
}

export const JSONIcon = () => {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title>language_json</title> <rect width="24" height="24" fill="none"></rect>{' '}
        <path d="M5,3H7V5H5v5a2,2,0,0,1-2,2,2,2,0,0,1,2,2v5H7v2H5c-1.07-.27-2-.9-2-2V15a2,2,0,0,0-2-2H0V11H1A2,2,0,0,0,3,9V5A2,2,0,0,1,5,3M19,3a2,2,0,0,1,2,2V9a2,2,0,0,0,2,2h1v2H23a2,2,0,0,0-2,2v4a2,2,0,0,1-2,2H17V19h2V14a2,2,0,0,1,2-2,2,2,0,0,1-2-2V5H17V3h2M12,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1M8,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1m8,0a1,1,0,1,1-1,1A1,1,0,0,1,16,15Z"></path>{' '}
      </g>
    </svg>
  )
}

export const ShareIcon = () => {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#000">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9.42857 12.875L14.5714 16.8125M14.5714 7.625L9.42857 11.125M6 12.0357V11.9643C6 11.0175 6.76751 10.25 7.71429 10.25C8.66106 10.25 9.42857 11.0175 9.42857 11.9643V12.0357C9.42857 12.9825 8.66106 13.75 7.71429 13.75C6.76751 13.75 6 12.9825 6 12.0357ZM14.5714 6.78571V6.71429C14.5714 5.76751 15.3389 5 16.2857 5C17.2325 5 18 5.76751 18 6.71429V6.78571C18 7.73249 17.2325 8.5 16.2857 8.5C15.3389 8.5 14.5714 7.73249 14.5714 6.78571ZM14.5714 17.2857V17.2143C14.5714 16.2675 15.3389 15.5 16.2857 15.5C17.2325 15.5 18 16.2675 18 17.2143V17.2857C18 18.2325 17.2325 19 16.2857 19C15.3389 19 14.5714 18.2325 14.5714 17.2857Z"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}
export const DownloadIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mb-1 h-6 w-6">
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div
      className="flex items-center rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800 opacity-100 transition-opacity duration-700 ease-in dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="mr-3 inline h-5 w-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Error!</span> {message}
      </div>
    </div>
  )
}
export const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div
      className="mb-4 flex rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <svg
        className="mr-3 inline h-5 w-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Success!</span> {message}
      </div>
    </div>
  )
}

export const LogoutIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
      <path
        fillRule="evenodd"
        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const LoginIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
      <path
        fillRule="evenodd"
        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  )
}

export const CameraIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
      <path
        fillRule="evenodd"
        d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const MentionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  )
}

export const UploadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
      />
    </svg>
  )
}

export const CommentIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  )
}

export const CommentSolidIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const AtSymbolIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  )
}

export const AtSymbolSolidIcon = () => {
  return <span className="font-bold text-xs text-gray-500">NFT</span>
}

export const BackButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}

export const TelegramIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" className="w-6 h-6" fill="#ffffff">
      <path d="M 26.070313 3.996094 C 25.734375 4.011719 25.417969 4.109375 25.136719 4.21875 L 25.132813 4.21875 C 24.847656 4.332031 23.492188 4.902344 21.433594 5.765625 C 19.375 6.632813 16.703125 7.757813 14.050781 8.875 C 8.753906 11.105469 3.546875 13.300781 3.546875 13.300781 L 3.609375 13.277344 C 3.609375 13.277344 3.25 13.394531 2.875 13.652344 C 2.683594 13.777344 2.472656 13.949219 2.289063 14.21875 C 2.105469 14.488281 1.957031 14.902344 2.011719 15.328125 C 2.101563 16.050781 2.570313 16.484375 2.90625 16.722656 C 3.246094 16.964844 3.570313 17.078125 3.570313 17.078125 L 3.578125 17.078125 L 8.460938 18.722656 C 8.679688 19.425781 9.949219 23.597656 10.253906 24.558594 C 10.433594 25.132813 10.609375 25.492188 10.828125 25.765625 C 10.933594 25.90625 11.058594 26.023438 11.207031 26.117188 C 11.265625 26.152344 11.328125 26.179688 11.390625 26.203125 C 11.410156 26.214844 11.429688 26.21875 11.453125 26.222656 L 11.402344 26.210938 C 11.417969 26.214844 11.429688 26.226563 11.441406 26.230469 C 11.480469 26.242188 11.507813 26.246094 11.558594 26.253906 C 12.332031 26.488281 12.953125 26.007813 12.953125 26.007813 L 12.988281 25.980469 L 15.871094 23.355469 L 20.703125 27.0625 L 20.8125 27.109375 C 21.820313 27.550781 22.839844 27.304688 23.378906 26.871094 C 23.921875 26.433594 24.132813 25.875 24.132813 25.875 L 24.167969 25.785156 L 27.902344 6.65625 C 28.007813 6.183594 28.035156 5.742188 27.917969 5.3125 C 27.800781 4.882813 27.5 4.480469 27.136719 4.265625 C 26.769531 4.046875 26.40625 3.980469 26.070313 3.996094 Z M 25.96875 6.046875 C 25.964844 6.109375 25.976563 6.101563 25.949219 6.222656 L 25.949219 6.234375 L 22.25 25.164063 C 22.234375 25.191406 22.207031 25.25 22.132813 25.308594 C 22.054688 25.371094 21.992188 25.410156 21.667969 25.28125 L 15.757813 20.75 L 12.1875 24.003906 L 12.9375 19.214844 C 12.9375 19.214844 22.195313 10.585938 22.59375 10.214844 C 22.992188 9.84375 22.859375 9.765625 22.859375 9.765625 C 22.886719 9.3125 22.257813 9.632813 22.257813 9.632813 L 10.082031 17.175781 L 10.078125 17.15625 L 4.242188 15.191406 L 4.242188 15.1875 C 4.238281 15.1875 4.230469 15.183594 4.226563 15.183594 C 4.230469 15.183594 4.257813 15.171875 4.257813 15.171875 L 4.289063 15.15625 L 4.320313 15.144531 C 4.320313 15.144531 9.53125 12.949219 14.828125 10.71875 C 17.480469 9.601563 20.152344 8.476563 22.207031 7.609375 C 24.261719 6.746094 25.78125 6.113281 25.867188 6.078125 C 25.949219 6.046875 25.910156 6.046875 25.96875 6.046875 Z"></path>
    </svg>
  )
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export const CloseSmallIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export const WallAddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

export const WallShareIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
      />
    </svg>
  )
}

export const EthereumIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" fill="#000000" viewBox="0 0 16 16" className="h-6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3688 8.81011L7.68341 14L4 8.81011L7.68341 10.985L11.3688 8.81011ZM7.68341 2L11.3668 8.11174L7.68341 10.2887L4 8.11174L7.68341 2Z"
      ></path>
    </svg>
  )
}

export const BadgeSolidIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const PolygonIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path d="M11.3944 10.7329L14.7152 8.81544C14.8912 8.71358 15 8.52468 15 8.32196V4.48698C15 4.28426 14.8912 4.09538 14.7152 3.99351L11.3944 2.07602C11.2184 1.97417 10.9999 1.97516 10.8248 2.07602L7.50404 3.99351C7.32805 4.09538 7.21925 4.28426 7.21925 4.48698V11.3401L4.89037 12.684L2.56149 11.3401V8.6513L4.89037 7.30737L6.42617 8.19438V6.39062L5.17515 5.66774C5.08911 5.61829 4.99027 5.59159 4.89037 5.59159C4.79046 5.59159 4.69162 5.61829 4.60558 5.66774L1.28481 7.58523C1.10878 7.68709 1 7.876 1 8.07871V11.9137C1 12.1164 1.10878 12.3053 1.28481 12.4071L4.60558 14.3247C4.78157 14.4255 4.99916 14.4255 5.17515 14.3247L8.49593 12.4071C8.67198 12.3053 8.78071 12.1164 8.78071 11.9137V5.05956L8.82225 5.03582L11.1086 3.71563L13.4375 5.05956V7.74842L11.1086 9.09235L9.57481 8.20724V10.0111L10.8238 10.732C10.9999 10.8328 11.2184 10.8328 11.3934 10.732L11.3944 10.7329Z"></path>
    </svg>
  )
}

export const BNBIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.38097 12.6321V14.2143L8.01698 15L6.65299 14.2143V12.6321L8.01698 13.4178L9.38097 12.6321ZM1.96086 7.2198L3.32485 8.00546V10.7116L5.68183 12.0756V13.6578L1.96086 11.5082V7.2198ZM14.084 7.20889V11.4973L10.363 13.6469V12.0647L12.7091 10.7116V8.00546L14.084 7.20889ZM10.374 5.07015L11.7379 5.85581V7.43804L9.38097 8.79111V11.4973L8.01698 12.2829L6.65299 11.4973V8.79111L4.30693 7.43804V5.85581L5.67092 5.07015L8.01698 6.42323L10.374 5.07015ZM11.727 8.56196V10.1551L10.363 10.9408V9.34762L11.727 8.56196ZM4.30693 8.57288L5.67092 9.35853V10.9408L4.30693 10.1551V8.57288ZM12.7091 3.70616L14.0731 4.50273V6.08496L12.7091 6.87062V5.28839L11.3451 4.49182L12.7091 3.70616ZM3.32485 3.70616L4.67793 4.50273L3.31394 5.28839V6.87062L1.94995 6.08496H1.96086V4.49182L3.32485 3.70616ZM8.01698 3.70616L9.38097 4.50273L8.01698 5.28839L6.65299 4.50273L8.01698 3.70616ZM8.01698 1L11.7379 3.14965L10.374 3.93531L8.01698 2.58223L5.67092 3.93531L4.30693 3.14965L8.01698 1Z"
      ></path>
    </svg>
  )
}

export const NewNFTIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const ArbitrumIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path d="M14.3342 3.45141L8.66552 0.178249C8.25367 -0.0594164 7.74633 -0.0594164 7.33448 0.178249L1.66527 3.45141C1.25364 3.68918 1 4.12843 1 4.6038V11.9184L1.01464 11.9272L2.64927 12.8706L3.17592 13.1747L4.93648 14.1914L7.33448 15.5757C7.74633 15.8133 8.25367 15.8133 8.66552 15.5757L14.3342 12.3025C14.7461 12.0649 15 11.6256 15 11.1501V4.6038C15 4.1283 14.7461 3.68898 14.3342 3.45141ZM14.0692 10.603L10.9674 5.33155L9.78569 7.342L12.6435 12.2024L12.1124 12.5095L9.40791 7.97994L8.23307 9.97723L10.3519 13.5257L8.25796 14.7347C8.09836 14.8269 7.90164 14.8269 7.74204 14.7347L5.41383 13.3905L10.6506 4.62283H8.28334L3.65328 12.3757L3.12126 12.0687L7.50092 4.62283H6.17087C5.52866 4.62295 4.93448 4.96294 4.60897 5.51653L1.9308 10.068V4.67115C1.93064 4.48678 2.02889 4.31633 2.18851 4.22406L7.74204 1.01777C7.90164 0.925511 8.09836 0.925511 8.25796 1.01777L13.811 4.22406C13.9707 4.31628 14.0692 4.48671 14.0692 4.67115V10.603Z"></path>
    </svg>
  )
}

export const CeloIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path d="M15 1H1V15H15V10.1128H12.6752C11.8747 11.8966 10.0726 13.1358 8.01097 13.1358C5.1671 13.1358 2.86423 10.811 2.86423 7.98903C2.86057 5.1671 5.1671 2.86423 8.01097 2.86423C10.1128 2.86423 11.9149 4.1436 12.7154 5.96762H15V1Z"></path>
    </svg>
  )
}

export const SolanaIcon = () => {
  return (
    <svg viewBox="0 0 128 128" className="h-6">
      <path d="M93.94 42.63H13.78l20.28-20.22h80.16L93.94 42.63zM93.94 105.59H13.78l20.28-20.21h80.16M34.06 74.11h80.16L93.94 53.89H13.78"></path>
    </svg>
  )
}

export const NearIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5652 2.64635L9.07421 6.34483C9.00084 6.45498 9.02005 6.60237 9.11919 6.69004C9.21834 6.7777 9.36698 6.77872 9.46731 6.69242L11.9194 4.56552C11.9488 4.53925 11.9909 4.53282 12.0268 4.54914C12.0627 4.56546 12.0855 4.60143 12.085 4.64083V11.2996C12.0849 11.3413 12.0588 11.3786 12.0196 11.3929C11.9803 11.4072 11.9363 11.3953 11.9095 11.3633L4.49766 2.49076C4.25636 2.20583 3.90193 2.04138 3.52855 2.04138H3.26952C2.56838 2.04138 2 2.60976 2 3.3109V12.6891C2 13.3902 2.56838 13.9586 3.26952 13.9586C3.71095 13.9586 4.12079 13.7297 4.352 13.3537L6.84303 9.65518C6.9164 9.54503 6.89719 9.39763 6.79805 9.30997C6.6989 9.2223 6.55026 9.22129 6.44993 9.30759L3.99779 11.4345C3.96843 11.4608 3.92631 11.4672 3.89045 11.4509C3.85459 11.4345 3.83176 11.3986 3.83228 11.3592V4.69876C3.83229 4.657 3.85843 4.61971 3.89768 4.60545C3.93693 4.5912 3.98091 4.60302 4.00772 4.63504L11.4188 13.5092C11.6601 13.7942 12.0145 13.9586 12.3879 13.9586H12.6469C12.9837 13.9588 13.3069 13.8252 13.5451 13.5871C13.7834 13.349 13.9172 13.0259 13.9172 12.6891V3.3109C13.9172 2.60976 13.3489 2.04138 12.6477 2.04138C12.2063 2.04138 11.7965 2.27031 11.5652 2.64635Z"
      ></path>
    </svg>
  )
}

export const MumbaiIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="h-6">
      <path d="M11.3944 10.7329L14.7152 8.81544C14.8912 8.71358 15 8.52468 15 8.32196V4.48698C15 4.28426 14.8912 4.09538 14.7152 3.99351L11.3944 2.07602C11.2184 1.97417 10.9999 1.97516 10.8248 2.07602L7.50404 3.99351C7.32805 4.09538 7.21925 4.28426 7.21925 4.48698V11.3401L4.89037 12.684L2.56149 11.3401V8.6513L4.89037 7.30737L6.42617 8.19438V6.39062L5.17515 5.66774C5.08911 5.61829 4.99027 5.59159 4.89037 5.59159C4.79046 5.59159 4.69162 5.61829 4.60558 5.66774L1.28481 7.58523C1.10878 7.68709 1 7.876 1 8.07871V11.9137C1 12.1164 1.10878 12.3053 1.28481 12.4071L4.60558 14.3247C4.78157 14.4255 4.99916 14.4255 5.17515 14.3247L8.49593 12.4071C8.67198 12.3053 8.78071 12.1164 8.78071 11.9137V5.05956L8.82225 5.03582L11.1086 3.71563L13.4375 5.05956V7.74842L11.1086 9.09235L9.57481 8.20724V10.0111L10.8238 10.732C10.9999 10.8328 11.2184 10.8328 11.3934 10.732L11.3944 10.7329Z"></path>
    </svg>
  )
}
export const JustInIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const SearchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const DocumentIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
  )
}

export const ChevronIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}
