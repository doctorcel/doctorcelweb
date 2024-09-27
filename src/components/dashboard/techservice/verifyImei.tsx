'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useZxing } from 'react-zxing';

const ImeiScanner: React.FC = () => {
  const [imei, setImei] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      setImei(result.getText());
      setIsScanning(false);
    },
  });

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setHasPermission(false);
        console.error("Error accessing camera:", err);
      }
    };

    checkCameraPermission();
  }, []);

  const handleStartScan = async () => {
    if (!hasPermission) {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        return;
      }
    }
    setIsScanning(true);
    setImei('');
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleVerifyImei = () => {
    if (imei) {
      window.open(`https://www.imeicolombia.com.co/imei/${imei}`, '_blank');
    }
  };

  if (hasPermission === null) {
    return <div>Solicitando permiso de cámara...</div>;
  }

  if (hasPermission === false) {
    return <div>No se pudo acceder a la cámara. Por favor, verifica los permisos del navegador.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Escáner de IMEI</h2>
      {isScanning ? (
        <div className="w-full max-w-md">
          <video ref={ref} className="w-full" />
        </div>
      ) : (
        <div className="w-full max-w-md h-48 bg-gray-200 flex items-center justify-center">
          <p>Cámara desactivada</p>
        </div>
      )}
      <div className="space-x-2">
        {!isScanning ? (
          <button
            onClick={handleStartScan}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Iniciar Escaneo
          </button>
        ) : (
          <button
            onClick={handleStopScan}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Detener Escaneo
          </button>
        )}
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