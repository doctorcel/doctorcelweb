import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Asegúrate de que esta ruta sea relativa a la raíz de tu proyecto
  const uploadDir = join(process.cwd(), 'public', 'uploads');

  try {
    // Intenta crear el directorio si no existe
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create upload directory:', error);
    return NextResponse.json({ success: false, error: 'Failed to create upload directory' }, { status: 500 });
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = join(uploadDir, fileName);

  try {
    await writeFile(filePath, buffer);
    console.log(`File saved to ${filePath}`);
  } catch (error) {
    console.error('Failed to save file:', error);
    return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 });
  }

  const fileUrl = `/uploads/${fileName}`;
  return NextResponse.json({ success: true, url: fileUrl });
}

export const config = {
  api: {
    bodyParser: false,
  },
};