import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type CompanyInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
};

const drawLogo = async (doc: any, page: any) => {
  const logoUrl = '/logo.png'; // Replace with your actual logo URL
  const logoImage = await fetch(logoUrl).then(res => res.arrayBuffer());
  const logo = await doc.embedPng(logoImage);
  const logoDims = logo.scale(0.05); // Adjust scale as needed
  page.drawImage(logo, {
    x: page.getWidth() / 2 - logoDims.width / 2,
    y: page.getHeight() - logoDims.height - 10,
    width: logoDims.width,
    height: logoDims.height,
  });
  return logoDims.height + 20;
};

export const generatePDF = async (invoiceData: any, companyInfo: CompanyInfo) => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([226, 1000]); // 80mm width (converted to points) and long height

  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const fontSize = 8;
  let yPosition = 980;
  const leftMargin = 10;

  // Draw logo
  yPosition -= await drawLogo(doc, page);

  const drawText = (text: string, options: any) => {
    const words = text.split(' ');
    let line = '';
    for (const word of words) {
      const testLine = line + word + ' ';
      const testWidth = helveticaFont.widthOfTextAtSize(testLine, options.size);
      if (testWidth > 206 && line !== '') {
        page.drawText(line, { ...options, y: yPosition });
        yPosition -= options.size + 2;
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    page.drawText(line, { ...options, y: yPosition });
    yPosition -= options.size + 2;
  };

  // Company Info
  drawText(companyInfo.name, { x: leftMargin, size: fontSize + 2, font: helveticaBoldFont });
  drawText(`Régimen simplificado`, { x: leftMargin, size: fontSize, font: helveticaFont });  
  drawText(`No somos responsables de IVA`, { x: leftMargin, size: fontSize, font: helveticaFont }); 
  drawText(`NIT: ${companyInfo.taxId}`, { x: leftMargin, size: fontSize, font: helveticaFont });
  drawText(`Email: ${companyInfo.email}`, { x: leftMargin, size: fontSize, font: helveticaFont });
  drawText(`Tel: ${companyInfo.phone} - 3504089988`, { x: leftMargin, size: fontSize, font: helveticaFont });

  yPosition -= 10;

  // Invoice Info
  drawText(`Factura No: ${invoiceData.number}`, { x: leftMargin, size: fontSize + 1, font: helveticaBoldFont });
  yPosition -= 5;

  // Client Info
  drawText("CLIENTE:", { x: leftMargin, size: fontSize, font: helveticaBoldFont });
  drawText(invoiceData.clientName, { x: leftMargin, size: fontSize, font: helveticaFont });
  drawText(`ID: ${invoiceData.clientTaxId}`, { x: leftMargin, size: fontSize, font: helveticaFont });
  drawText(`Dir: ${invoiceData.clientAddress}`, { x: leftMargin, size: fontSize, font: helveticaFont });
  drawText(`Tel: ${invoiceData.clientPhone}`, { x: leftMargin, size: fontSize, font: helveticaFont });
  yPosition -= 10;

  // Items
  drawText("DESCRIPCIÓN", { x: leftMargin, size: fontSize, font: helveticaBoldFont });
  yPosition -= 5;
  page.drawLine({ start: { x: leftMargin, y: yPosition }, end: { x: 216, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
  yPosition -= 10; // Increase spacing after the line

  invoiceData.items.forEach((item: any) => {
    drawText(`${item.name}`, { x: leftMargin, size: fontSize, font: helveticaFont });
    drawText(`${item.quantity} x $${item.price} = $${item.subtotal}`, { x: leftMargin, size: fontSize, font: helveticaFont });
    if (item.discount > 0) {
      drawText(`Descuento: $${item.discount}`, { x: leftMargin, size: fontSize, font: helveticaFont });
    }
  });
  yPosition -= 5;
  page.drawLine({ start: { x: leftMargin, y: yPosition }, end: { x: 216, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
  yPosition -= 10;

  // Total
  drawText(`TOTAL: $${invoiceData.total}`, { x: leftMargin, size: fontSize + 2, font: helveticaBoldFont });
  yPosition -= 10;

  // Notes
  if (invoiceData.notes) {
    drawText("NOTAS:", { x: leftMargin, size: fontSize, font: helveticaBoldFont });
    drawText(invoiceData.notes, { x: leftMargin, size: fontSize, font: helveticaFont });
  }

  // Add invoice terms at the bottom
  const terms = "Términos y condiciones: Esta factura debe ser pagada en un plazo de 30 días. Pasado este tiempo, se aplicarán intereses de mora.";
  yPosition -= Math.min(yPosition, 10); // Ensure there's always space at the bottom
  drawText("TÉRMINOS:", { x: leftMargin, size: fontSize, font: helveticaBoldFont });
  drawText(terms, { x: leftMargin, size: fontSize - 1, font: helveticaFont });

  const pdfBytes = await doc.save();
  return pdfBytes;
};

