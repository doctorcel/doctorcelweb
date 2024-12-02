import TableRepair from "@/components/dashboard/techservice/tablerepair";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function TechServiceMainPage() {
  return (
    <>
      <div>
        <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-900 dark:text-gray-300 p-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Solicitud de Equipo</h1>
            <p className="text-lg text-gray-600">
              En esta sección, puedes consultar información acerca de los equipos que se encuentran en reparación
            </p>
          </div>
          <Button className="bg-blue-900 dark:bg-green-900 text-gray-100 dark:hover:bg-green-700 dark:text-white">
            <Link href={"/dashboard/techservice/createinvoicetech"}>
              Recibir Equipo
            </Link>
          </Button>
        </div>
        <TableRepair />
      </div>
    </>
  );
}
