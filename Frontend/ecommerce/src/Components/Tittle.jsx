import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="text-center my-6">
      <p className="text-2xl font-semibold text-gray-800">
        {text1}{" "}
        <span className="text-blue-600 font-bold underline underline-offset-4">
          {text2}
        </span>
      </p>
    </div>
  );
}

export default Title;
