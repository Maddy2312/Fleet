import React from "react";

const ContinueWithGoogle = () => {
  return (
<a
  href="/api/auth/google"
  className="flex items-center justify-center gap-3 w-full h-12 px-4 
             bg-[#1A73E8] text-white rounded-md 
             text-sm font-medium 
             shadow-sm hover:bg-[#1669c1] transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google logo"
    className="w-5 h-5 bg-white rounded-full p-0.5"
  />
  <span>Sign in with Google</span>
</a>
  );
};

export default ContinueWithGoogle;
