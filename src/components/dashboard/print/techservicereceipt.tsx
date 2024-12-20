import React, { useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon } from 'lucide-react';

interface ReceiptProps {
  techService: {
    id: number;
    deviceType: string;
    brand: string;
    serialNumber: string;
    color: string;
    observations?: string;
    createdAt: string;
    deliveryDate: string;
    client: {
      name: string;
      email?: string;
      phone?: string;
      address?: string;
      taxId?: string;
      documentType?: string;
      document?: string;
      personType?: string;
      regime?: string;
      country?: string;
      department?: string;
      city?: string;
    };
    warehouseId: number;
  };
  logoUrl: string;
  companyName: string;
  companyContact: string;
  onPrintSuccess: () => void;
}

const ElegantTechServiceReceipt: React.FC<ReceiptProps> = ({
  techService,
  logoUrl,
  companyName,
  companyContact,
  onPrintSuccess,
}) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Recibo Servicio Técnico - ${techService.id}`,
    onAfterPrint: onPrintSuccess,
  });

  const printWithPageSize = useCallback(
    (pageSize: string) => {
      const style = document.createElement("style");
      style.textContent = `
        @page {
          size: ${pageSize};
          margin: 0;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .receipt-content {
            width: 100%;
            padding: 5mm;
          }
        }
      `;
      document.head.appendChild(style);
      handlePrint();
      document.head.removeChild(style);
    },
    [handlePrint]
  );

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="flex justify-between mb-6">
        <Button
          onClick={() => printWithPageSize("80mm 297mm")}
          variant="outline"
          className="text-xs"
        >
          <PrinterIcon className="mr-1 h-3 w-3" />
          Imprimir 80mm
        </Button>
      </div>

      <Card ref={componentRef} className="bg-white dark:bg-gray-900 text-black shadow-none border-none">
        <CardContent className="p-0 receipt-content">
          <div className="text-center mb-2">
            <img src={logoUrl} alt={companyName} className="h-16 w-auto mx-auto mb-1" />
            <h1 className="text-sm font-bold">{companyName}</h1>
            <p className="text-xs">{companyContact}</p>
            <p className="text-xs"><strong>Nit:</strong> 1017175353-9</p>
            <p className="text-xs">Régimen Simplificado</p>
            <p className="text-xs"><strong>Itagui-Arrayanes:</strong> 3004001077</p>
            <p className="text-xs"><strong>Barichara:</strong> 3504089988</p>
          </div>

          <Separator className="my-2" />

          <div className="text-center mb-2">
            <h2 className="text-sm font-bold">Orden de Servicio Técnico</h2>
            <p className="text-xs font-medium">No. {techService.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-1 text-xs mb-2">
            <div>
              <p className="font-medium">Fecha de Ingreso:</p>
              <p>{new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }).split(',')[0]}</p>
            </div>
            <div>
              <p className="font-medium">Fecha Estimada Entrega:</p>
              <p>{new Date(techService.deliveryDate).toLocaleDateString("es-CO")}</p>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="space-y-1 text-xs mb-2">
            <h3 className="font-bold">Información del Cliente</h3>
            <p><span className="font-medium">Nombre:</span> {techService.client.name}</p>
            <p><span className="font-medium">Documento:</span> {techService.client.documentType} {techService.client.document}</p>
            <p><span className="font-medium">Teléfono:</span> {techService.client.phone}</p>
            <p><span className="font-medium">Dirección:</span> {techService.client.address}</p>
          </div>

          <Separator className="my-2" />

          <div className="space-y-1 text-xs mb-2">
            <h3 className="font-bold">Detalles del Servicio</h3>
            <p><span className="font-medium">Dispositivo:</span> {techService.deviceType}</p>
            <p><span className="font-medium">Marca:</span> {techService.brand}</p>
            <p><span className="font-medium">Modelo:</span> {techService.color}</p>
            <p><span className="font-medium">IMEI/Serie:</span> {techService.serialNumber}</p>
            <p><span className="font-medium">Bodega:</span> {techService.warehouseId === 3 ? "Barichara" : techService.warehouseId === 2 ? "Arrayanes" : `Desconocida (ID: ${techService.warehouseId})`}</p>
            <p><span className="font-medium">Observaciones:</span> {techService.observations}</p>
          </div>

          <Separator className="my-2" />

          <div className="mt-4 text-center">
            <p className="text-xs mb-1">____________________________</p>
            <p className="text-xs font-medium">Firma del Cliente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElegantTechServiceReceipt;

