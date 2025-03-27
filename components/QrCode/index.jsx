"use client";
import { QRCodeStyling, browserUtils } from "@liquid-js/qr-code-styling";
import { useEffect, useRef, useState } from "react";

const QRCodePage = ({ userID }) => {
  const ref = useRef(null);
  const [fileExt, setFileExt] = useState("svg");

  const [qrCode] = useState(() => {
    const baseUrl =process.env.NEXT_PUBLIC_BASE_URL
    // Fallback pour SSR
    // const baseUrl =
    //   typeof window !== "undefined"
    //     ? window.location.origin
    //     : "http://localhost:3000"; // Fallback pour SSR
    const options = {
      data: `${baseUrl}/view/sos/${userID.userID}`,
      image: "/images/logo/logo_1.svg",
      dotsOptions: {
        color: "#0F5CEC",
        size: 4,
        type: "small-square",
      },
      backgroundOptions: {
        color: "#e9ebee",
        margin: 1,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 1,
        imageSize: 0.5,
      },
      cornersSquareOptions: {
        color: "#0D54D8",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#F50C0C",
        type: "dot",
      },
    };

    return new QRCodeStyling(options);
  });

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  const onDownloadClick = () => {
    if (qrCode) {
      browserUtils.download(
        qrCode,
        { extension: "png" ,name:`my_qrcode_${userID.userID}`},
        { width: 150, height: 150 },
      );
    }
  };

  return (<div className="col-span-1 flex flex-col justify-between">
    <div className="bg-gray-100 flex justify-center items-center  ">
      <div ref={ref} className="p-1 rounded border m-2"></div>;
    </div>

   <div className="flex flex-row justify-between items-end w-full">
    <button className='btn btn-square w-full' onClick={onDownloadClick}>Télécharger QR</button>
   </div>
  </div>)
};

export default QRCodePage;
