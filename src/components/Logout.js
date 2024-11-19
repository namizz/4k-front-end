import React from "react";

const BackToTopButton = () => {
  return (
    <div className="w-16 h-12 items-center flex-col absolute top-0 right-0 group ">
      <button className="top-3 right-3 w-6 h-6 rounded-full bg-[#3ecf2bbb] border-none flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden relative group-hover:bg-[#c51717] group-hover:w-8 group-hover:h-8 group-hover:top-0">
        <svg className="w-3 transition-all duration-100 " viewBox="0 0 384 512">
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            fill="white"
          ></path>
        </svg>
      </button>
      <span className="relative opacity-0 top-[-1em] right-6 font-semibold bottom-[-20px] text-[#000000]  text-sm translate-y-[-30px] transition-all duration-300 group-hover:opacity-100  group-hover:text-[#151847]">
        Log out
      </span>
    </div>
  );
};

export default BackToTopButton;
