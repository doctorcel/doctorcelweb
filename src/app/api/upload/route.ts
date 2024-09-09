import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No se ha subido un archivo' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Convertir el buffer en un Readable stream
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  try {
    // Subir la imagen a Cloudinary usando un Readable stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'uploads' }, // Opcional: carpeta donde guardar los archivos
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error);
    return NextResponse.json({ success: false, error: 'Error al subir archivo' }, { status: 500 });
  }
}
