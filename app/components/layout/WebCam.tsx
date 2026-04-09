import  { useRef } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
  const webcamRef = useRef(null);
  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={700}
        height={950}
      />
      <div>
    </div>
    </div>
  );
};

export default WebCam;