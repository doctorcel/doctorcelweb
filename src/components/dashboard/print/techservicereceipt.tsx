// components/TechServiceReceipt.tsx
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ReceiptProps {
  techService: {
    id: number;
    deviceType: string;
    brand: string;
    serialNumber: string;
    color: string;
    observations?: string;
    clientName: string;
    createdAt: string;
    deliveryDate: string;
  };
  logoUrl: string;
  companyName: string;
  companyContact: string;
  onPrintSuccess: () => void; // Nueva prop para manejar la redirección después de imprimir
}

const TechServiceReceipt: React.FC<ReceiptProps> = ({
  techService,
  logoUrl,
  companyName,
  companyContact,
  onPrintSuccess,
}) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0mm;
      }
      @media print {
        body {
          width: 80mm;
          margin: 0 auto;
        }
      }
    `,
    documentTitle: `Recibo Servicio Técnico - ${techService.id}`,
    onAfterPrint: onPrintSuccess, // Ejecutar la función después de imprimir
  });

  return (
    <div>
      <button onClick={handlePrint}>Imprimir Recibo</button>
      <div
        ref={componentRef}
        className="p-4 font-sans text-xs w-[80mm] mx-auto"
      >
        <div className="border-2 border-gray-300 p-3">
          <div className="flex items-center mb-4">
            <img
              src={logoUrl}
              alt={`${companyName} Logo`}
              className="h-12 w-auto mr-4"
            />

            <div>
              <h1 className="text-sm font-bold">{companyName}</h1>
              <p className="text-xs text-gray-600">{companyContact}</p>
            </div>
          </div>

          <div className="text-center mb-4">
            <h2 className="font-bold text-sm">Orden de Servicio Técnico</h2>
            <p className="text-xs">No. {techService.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <strong>Fecha de Ingreso:</strong>{" "}
              {new Date()
                .toLocaleString("es-CO", { timeZone: "America/Bogota" })
                .toString()}
            </div>
            <div>
              <strong>Fecha Estimada Entrega:</strong>{" "}
              {techService.deliveryDate}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <strong>Dispositivo:</strong> {techService.deviceType}
            </div>
            <div>
              <strong>Marca:</strong> {techService.brand}
            </div>
          </div>
          <div className="mb-4">
            <strong>Observaciones:</strong>
            <p>{techService.observations}</p>
          </div>

          <div className="text-center mt-6 text-xs">
            <p className="text-sm font-semibold">{techService.clientName}</p>
            <p>{techService.serialNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechServiceReceipt;
