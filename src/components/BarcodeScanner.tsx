"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";

interface BarcodeScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReaderRef.current!.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
          setError("カメラが見つかりません");
          return;
        }

        const selectedDevice = videoInputDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear')
        ) || videoInputDevices[0];

        const videoElement = videoRef.current;
        if (!videoElement) return;

        // ビデオのメタデータ読み込みを待機し、サイズを確定させる
        videoElement.onloadedmetadata = async () => {
          try {
            await codeReaderRef.current!.decodeFromVideoDevice(
              selectedDevice.deviceId,
              videoElement,
              (result: Result | null, err?: Error) => {
                if (result) {
                  onScan(result.getText());
                  stopScanner();
                }
              }
            );
          } catch (decodeErr) {
            console.error("Decoding error:", decodeErr);
          }
        };
      } catch (err) {
        console.error(err);
        setError("カメラの起動に失敗しました");
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onScan]);

  const stopScanner = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-2xl">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
              <div className="w-full h-1/2 border-2 border-blue-400 animate-pulse bg-blue-400/10"></div>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-8 text-center space-y-4">
        <p className="text-white font-bold tracking-widest">部品のバーコードを枠内に収めてください</p>
        <button 
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold border border-white/30 transition">
          キャンセル
        </button>
      </div>
    </div>
  );
}
