'use client'

import React, { useState, useRef, useEffect } from 'react';

type Punto = number;

interface PatronDesbloqueoProps {
  onPatronCompleto?: (patron: string) => void;
}

const PatronDesbloqueo: React.FC<PatronDesbloqueoProps> = ({ onPatronCompleto }) => {
  const [patron, setPatron] = useState<Punto[]>([]);
  const [dibujando, setDibujando] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctxRef.current = ctx;
        dibujarPuntos();
      }
    }
  }, []);

  const dibujarPuntos = (): void => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, 300, 300);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.arc(50 + j * 100, 50 + i * 100, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#ddd';
        ctx.fill();
      }
    }
  };

  const manejarClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const punto = obtenerPuntoCercano(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    if (punto === null) return;

    if (!dibujando) {
      setPatron([punto]);
      setDibujando(true);
    } else {
      if (!patron.includes(punto)) {
        setPatron(prevPatron => [...prevPatron, punto]);
      }
    }
  };

  const terminarDibujo = (): void => {
    if (patron.length > 1) {
      setDibujando(false);
      const patronNumerico = convertirPatronANumeros(patron);
      console.log('Patrón numérico:', patronNumerico);
      if (onPatronCompleto) {
        onPatronCompleto(patronNumerico);
      }
    }
  };

  const reiniciarPatron = (): void => {
    setPatron([]);
    setDibujando(false);
    dibujarPuntos();
  };

  const obtenerPuntoCercano = (x: number, y: number): Punto | null => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const centerX = 50 + j * 100;
        const centerY = 50 + i * 100;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance < 20) {
          return i * 3 + j;
        }
      }
    }
    return null;
  };

  const convertirPatronANumeros = (patron: Punto[]): string => {
    return patron.join('');
  };

  const manejarMovimientoMouse = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!dibujando) return;
    const punto = obtenerPuntoCercano(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    if (punto !== null && !patron.includes(punto)) {
      setPatron(prevPatron => [...prevPatron, punto]);
    }
  };

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, 300, 300);
    dibujarPuntos();

    if (patron.length > 0) {
      ctx.beginPath();
      ctx.moveTo(50 + (patron[0] % 3) * 100, 50 + Math.floor(patron[0] / 3) * 100);
      for (let i = 1; i < patron.length; i++) {
        ctx.lineTo(50 + (patron[i] % 3) * 100, 50 + Math.floor(patron[i] / 3) * 100);
      }
      ctx.strokeStyle = '#007bff';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Dibujar punto de inicio (verde)
      ctx.beginPath();
      ctx.arc(50 + (patron[0] % 3) * 100, 50 + Math.floor(patron[0] / 3) * 100, 15, 0, 2 * Math.PI);
      ctx.fillStyle = '#00ff00';
      ctx.fill();

      // Dibujar punto final (rojo) si hay más de un punto
      if (patron.length > 1) {
        const ultimoPunto = patron[patron.length - 1];
        ctx.beginPath();
        ctx.arc(50 + (ultimoPunto % 3) * 100, 50 + Math.floor(ultimoPunto / 3) * 100, 15, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
      }
    }
  }, [patron]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onClick={manejarClick}
        onMouseMove={manejarMovimientoMouse}
        onMouseLeave={terminarDibujo}
        className="border border-gray-300 rounded-lg cursor-pointer"
      />
      <div className="mt-4 space-x-4">
        <button 
          onClick={terminarDibujo} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={patron.length <= 1}
        >
          Finalizar Patrón
        </button>
        <button 
          onClick={reiniciarPatron} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reiniciar Patrón
        </button>
      </div>
      <p className="mt-4">Patrón actual: {patron.join(' - ')}</p>
    </div>
  );
};

export default PatronDesbloqueo;