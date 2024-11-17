"use client";

import { WX_QRCODE } from "@/lib/constant";
import { QRCodeCanvas } from "qrcode.react";

export const QRCode = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-center">扫描下方二维码，添加我的微信</p>
      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
        <QRCodeCanvas
          value={WX_QRCODE}
          size={192}
          imageSettings={{
            src: "/icon.png",
            width: 32,
            height: 32,
            excavate: true,
          }}
        />
      </div>
      <p className="text-sm text-gray-500 text-center">
        如有任何问题，请随时与我联系
      </p>
    </div>
  );
};
