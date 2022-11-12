import { Oval } from 'react-loader-spinner';
import React from 'react';



//const loaderRoot = document.querySelector('#loader-root');

export default function Loader({ loading }) {
  return <Oval  ariaLabel="loading-indicator"
  strokeWidth={5}
  color="red"
  secondaryColor="yellow"        
  height={40}
  width={40} 
  loading={loading} />;
}

