'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useZxing } from 'react-zxing';

const ImeiScanner: React.FC = () => {
  const [imei, setImei] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const handleResult = useCallback((result: any) => {
    setImei(result.getText());
    setIsScanning(false);
  }, []);

  const { ref } = useZxing({
    onDecodeResult: handleResult,
    paused: !isScanning,
  });

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setHasPermission(false);
        console.error("Error accessing camera:", err);
      }
    };

    checkCameraPermission();
  }, []);
  const handleStartScan = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasPermission(true);
      setIsScanning(true);
      setImei('');
      console.log("Camera accessed successfully");
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          console.error("Camera permission denied by user or system");
        } else if (err.name === 'NotFoundError') {
          console.error("No camera found on the device");
        } else if (err.name === 'NotReadableError') {
          console.error("Camera is already in use by another application");
        } else {
          console.error("Other camera error:", err.name);
        }
      }
      setHasPermission(false);
    }
  }, []);

  const handleStopScan = useCallback(() => {
    setIsScanning(false);
  }, []);

  const handleVerifyImei = useCallback(() => {
    if (imei) {
      window.open(`https://www.imeicolombia.com.co/imei/${imei}`, '_blank');
    }
  }, [imei]);

  if (hasPermission === null) {
    return <div className="text-center p-4">Solicitando permiso de cámara...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-2xl font-bold">Escáner de IMEI</h2>
      <div className="w-full max-w-md aspect-video relative">
        {isScanning ? (
          <video ref={ref} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-center px-4">{hasPermission === false ? "No se pudo acceder a la cámara. Por favor, verifica los permisos del navegador." : "Cámara desactivada"}</p>
          </div>
        )}
      </div>
      <div className="space-x-2">
        <button
          onClick={isScanning ? handleStopScan : handleStartScan}
          className={`px-4 py-2 text-white rounded ${isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isScanning ? 'Detener Escaneo' : 'Iniciar Escaneo'}
        </button>
      </div>
      {imei && (
        <div className="text-center">
          <p className="font-bold">IMEI escaneado:</p>
          <p>{imei}</p>
          <button
            onClick={handleVerifyImei}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Verificar IMEI
          </button>
        </div>
      )}
    </div>
  );
};

export default ImeiScanner;