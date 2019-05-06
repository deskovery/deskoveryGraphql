import React from 'react';

import { PulseLoader } from 'react-spinners';

const Spinner = () => (
  <div className='spinner'>
    <PulseLoader color={'red'} size={30} margin={'3px'} />
  </div>
);

export default Spinner;
