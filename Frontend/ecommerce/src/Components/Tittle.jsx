import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="my-5 text-center sm:my-7">
      <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {text1}{" "}
        <span className="text-forest underline decoration-coral decoration-2 underline-offset-[7px]">
          {text2}
        </span>
      </p>
    </div>
  );
}

export default Title;
