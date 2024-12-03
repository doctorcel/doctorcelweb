// ** PATCH: Editar un TechService existente **
import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';  // Asumiendo que tienes una instancia de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;  // Obtienes el ID desde req.query
  const data = req.body;     // El cuerpo de la solicitud con los datos a actualizar

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Método no permitido' });  // Verifica que sea un PATCH
  }

  try {
    // Actualizar el TechService con los datos proporcionados
    const updatedTechService = await prisma.techService.update({
      where: { id: parseInt(id as string) },  // Parseamos el ID a entero
      data: {
        status: data.status,  // Puedes actualizar el status
        deviceType: data.deviceType,  // Actualiza el tipo de dispositivo
        serialNumber: data.serialNumber,
        clientId: data.clientId,
        technicianId: data.technicianId,
        warehouseId: data.warehouseId,
        deliveryDate: data.deliveryDate,
        brand: data.brand,
        color: data.color,
        observations: data.observations,
        password: data.password,
        active: data.active || 'ENABLED',  // Si no se pasa, se mantiene como 'ENABLED'
      },
    });

    return res.status(200).json(updatedTechService);  // Retorna el TechService actualizado
  } catch (error) {
    console.error('Error updating TechService:', error);
    return res.status(500).json({ message: 'Error updating TechService' });
  }
}
