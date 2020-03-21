import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: red;
`;
 const LoadingComponent:React.FC<{loading:boolean}> = ({
loading
 })=> {
    return (
             <div className="sweet-loading">
        <HashLoader
        css={override}
          size={400}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    )
}
export default LoadingComponent
