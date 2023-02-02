import React from 'react';

const Spinner = () => {
    return (
      <div className='my-14'>
          <div
            class="
        mb-14
    spinner-border
    animate-spin
    inline-block
    w-14
    h-14
    border-4
    rounded-full
    text-green-500
  "
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
       
      </div>
    );
};

export default Spinner;