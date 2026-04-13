import  { useRef } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
  const webcamRef = useRef(null);
  return (
    <span>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={700}
        height={950}
      />
    </span>
  );
};

export default WebCam;