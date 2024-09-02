import React from "react";
import {ProgressBar} from "react-loader-spinner";

export const Loader = () => {
  return (
    <div>
         <ProgressBar
        visible={true}
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
      />
      
    </div>
  );
};
