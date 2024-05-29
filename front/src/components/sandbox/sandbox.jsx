import React from 'react';
import './sandbox.scss';

const Sandbox = () => {
  return (
    <iframe src="https://codesandbox.io/embed/fnzr7y?view=editor+%2B+preview&module=%2Fsrc%2Findex.html&hidenavigation=1&expanddevtools=1"
            title="worker"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default Sandbox;