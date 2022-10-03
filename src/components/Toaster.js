import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

function HotToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#555',
          color: '#fff',
        },
        
        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            // background: 'green',
            // color: '#fff',
            border: '3px solid green'
          }
        },

        error: {
          duration: 5000,
          style: {
            // background: '#ff2626',
            // color: '#fff',
            border: '3px solid red'
          }
        },

      }}
      // reverseOrder={false}
      gutter={8}
      // containerClassName=""
      // containerStyle={{}}
    />
  )
}

export default HotToaster;