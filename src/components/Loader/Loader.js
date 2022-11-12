import { Oval } from 'react-loader-spinner';
import React from 'react';



//const loaderRoot = document.querySelector('#loader-root');

function Loader() {
  return (  
      <Oval
        ariaLabel="loading-indicator"
        strokeWidth={5}
        color="red"
        secondaryColor="yellow"        
        height={40}
        width={40}
      />  
  );
}

export default Loader;
