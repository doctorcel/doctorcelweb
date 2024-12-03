import React, { useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon } from "lucide-react";

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
        margin: 10mm;
      }
    `;
      document.head.appendChild(style);
      handlePrint();
      document.head.removeChild(style);
    },
    [handlePrint]
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <Button
          onClick={() => printWithPageSize("80mm 297mm")}
          variant="outline"
        >
          <PrinterIcon className="mr-2 h-4 w-4" /> Imprimir 80mm
        </Button>
        <Button
          onClick={() => printWithPageSize("55mm 297mm")}
          variant="outline"
        >
          <PrinterIcon className="mr-2 h-4 w-4" /> Imprimir 55mm
        </Button>
        <Button
          onClick={() => printWithPageSize("5.5in 8.5in")}
          variant="outline"
        >
          <PrinterIcon className="mr-2 h-4 w-4" /> Imprimir Media Carta
        </Button>
      </div>

      <Card ref={componentRef} className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <img src={logoUrl} alt={companyName} className="h-10 w-auto" />
            <div>
              <CardTitle className="text-xl font-bold">{companyName}</CardTitle>
              <p className="text-sm text-muted-foreground">{companyContact}</p>
            </div>
          </div>
          <div className="text-right">
            <CardTitle className="text-xl">Orden de Servicio Técnico</CardTitle>
            <p className="text-sm font-medium">No. {techService.id}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium">Fecha de Ingreso</p>
              <p className="text-sm">
                {new Date()
                  .toLocaleString("es-CO", { timeZone: "America/Bogota" })
                  .toString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Fecha Estimada Entrega</p>
              <p className="text-sm">
                {new Date(techService.deliveryDate).toLocaleDateString(
                  "es-CO",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Información del Cliente</h3>
            <p className="text-sm">
              <span className="font-medium">Nombre:</span>{" "}
              {techService.client.name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Documento:</span>{" "}
              {techService.client.documentType} {techService.client.document}
            </p>
            <p className="text-sm">
              <span className="font-medium">Teléfono:</span>{" "}
              {techService.client.phone}
            </p>
            <p className="text-sm">
              <span className="font-medium">Dirección:</span>{" "}
              {techService.client.address}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Detalles del Servicio</h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm">
                <span className="font-medium">Dispositivo:</span>{" "}
                {techService.deviceType}
              </p>
              <p className="text-sm">
                <span className="font-medium">Marca:</span> {techService.brand}
              </p>
              <p className="text-sm">
                <span className="font-medium">Color:</span> {techService.color}
              </p>
              <p className="text-sm">
                <span className="font-medium">IMEI/Serie:</span>{" "}
                {techService.serialNumber}
              </p>
            </div>
            <p className="text-sm">
              <span className="font-medium">Bodega:</span>{" "}
              {techService.warehouseId === 1
                ? "Barichara"
                : techService.warehouseId === 2
                ? "Arrayanes"
                : `Desconocida (ID: ${techService.warehouseId})`}
            </p>
            <p className="text-sm">
              <span className="font-medium">Observaciones:</span>{" "}
              {techService.observations}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="mt-8 text-center">
            <p className="text-sm mb-4">____________________________</p>
            <p className="text-sm font-medium">Firma del Cliente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElegantTechServiceReceipt;
