import QRCode from "qrcode";

function pdfEscape(text: string): string {
  return text.replaceAll('\\', "\\\\").replaceAll('(', String.raw`\(`).replaceAll(')', String.raw`\)`);
}

function textWidth(text: string, fontSize: number, bold: boolean): number {
  return text.length * fontSize * (bold ? 0.56 : 0.5);
}

export async function generateGuestPassPdf(params: {
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestName: string;
  guestTitle: string;
  guestCategory: string;
  companionNames: string[];
  qrPayload: string;
}): Promise<Buffer> {
  const { eventName, eventDate, eventTime, venue, guestName, guestTitle, guestCategory, companionNames, qrPayload } = params;
  const guestFullName = guestTitle ? `${guestTitle} ${guestName}` : guestName;

  const matrix = QRCode.create(qrPayload, { margin: 2 } as any).modules;
  const qrSize = matrix.size;
  const margin = 2;
  const totalQrSize = qrSize + margin * 2;

  const pageW = 400;
  const qrCellSize = 3;
  const qrDrawSize = totalQrSize * qrCellSize;
  const qrX = (pageW - qrDrawSize) / 2;
  const framePad = 10;

  const gold = "0.71 0.53 0.04";
  const dark = "0.1 0.1 0.1";

  let content = "";
  function addOp(op: string) {
    content += op + "\n";
  }

  const headerHeight = 90;
  let offset = headerHeight;

  const cardCategoryOffset = offset + 30; 
  const cardNameOffset = offset + 58;    
  const dividerOffset = offset + 80;

  offset = dividerOffset + 30; 

  const details: [string, string][] = [
    ["Event", eventName],
    ["Date", eventDate],
    ["Time", eventTime],
    ["Venue", venue],
  ];

  const detailRowHeight = 22;
  const detailStartOffset = offset;
  offset += details.length * detailRowHeight;

  let companionsHeaderOffset = 0;
  const companionRowHeight = 14;
  if (companionNames.length > 0) {
    offset += 12; 
    companionsHeaderOffset = offset;
    offset += companionNames.length * companionRowHeight + 6;
  }

  offset += 30;
  const qrFrameTopOffset = offset;
  const qrBlockHeight = qrDrawSize + framePad * 2;
  offset += qrBlockHeight;

  offset += 26;
  const footerLine1Offset = offset;
  offset += 16;
  const footerLine2Offset = offset;
  offset += 24; 

  const pageH = Math.max(600, offset);

  const y = (o: number) => pageH - o;


  addOp("q");

  addOp(`0 0 ${pageW} ${pageH} re`);
  addOp("1 1 1 rg");
  addOp("f");

  addOp(`0 ${pageH - headerHeight} ${pageW} ${headerHeight} re`);
  addOp(`${gold} rg`);
  addOp("f");

  const titleText = "SPECIAL GUEST PASS";
  addOp("BT");
  addOp("/F1 16 Tf");
  addOp("1 1 1 rg");
  addOp(`${pageW / 2 - textWidth(titleText, 16, false) / 2} ${pageH - 35} Td`);
  addOp(`(${pdfEscape(titleText)}) Tj`);
  addOp("ET");

  addOp("BT");
  addOp("/F2 16 Tf");
  addOp("1 1 1 rg");
  addOp(`${pageW / 2 - textWidth(eventName, 16, true) / 2} ${pageH - 60} Td`);
  addOp(`(${pdfEscape(eventName)}) Tj`);
  addOp("ET");

  addOp("BT");
  addOp("/F2 11 Tf");
  addOp(`${gold} rg`);
  const categoryText = guestCategory.toUpperCase();
  addOp(`${pageW / 2 - textWidth(categoryText, 11, true) / 2} ${y(cardCategoryOffset)} Td`);
  addOp(`(${pdfEscape(categoryText)}) Tj`);
  addOp("ET");


  addOp("BT");
  addOp("/F2 24 Tf");
  addOp(`${dark} rg`);
  addOp(`${pageW / 2 - (guestFullName.length * 6)} ${y(cardNameOffset)} Td`);
  addOp(`(${pdfEscape(guestFullName)}) Tj`);
  addOp("ET");

  addOp(`60 ${y(dividerOffset)} 280 1.5 re`);
  addOp(`${gold} rg`);
  addOp("f");

  details.forEach(([label, value], i) => {
    const rowY = y(detailStartOffset + i * detailRowHeight);
    addOp("BT");
    addOp("/F1 10 Tf");
    addOp("0.5 0.5 0.5 rg");
    addOp(`70 ${rowY} Td`);
    addOp(`(${label}) Tj`);
    addOp("ET");

    addOp("BT");
    addOp("/F2 11 Tf");
    addOp(`${dark} rg`);
    addOp(`130 ${rowY} Td`);
    addOp(`(${pdfEscape(value)}) Tj`);
    addOp("ET");
  });

  if (companionNames.length > 0) {
    addOp("BT");
    addOp("/F2 10 Tf");
    addOp("0.5 0.5 0.5 rg");
    addOp(`70 ${y(companionsHeaderOffset)} Td`);
    addOp(`(Companions) Tj`);
    addOp("ET");

    companionNames.forEach((name, i) => {
      addOp("BT");
      addOp("/F1 10 Tf");
      addOp(`${dark} rg`);
      addOp(`70 ${y(companionsHeaderOffset + 14 + i * companionRowHeight)} Td`);
      addOp(String.raw`(\267 ${pdfEscape(name)}) Tj`);
      addOp("ET");
    });
  }

  const qrFrameY = y(qrFrameTopOffset) - qrBlockHeight; 
  addOp(`${qrX - framePad} ${qrFrameY} ${qrBlockHeight} ${qrBlockHeight} re`);
  addOp(`${gold} rg`);
  addOp("f");

  addOp(`${qrX - framePad + 2} ${qrFrameY + 2} ${qrBlockHeight - 4} ${qrBlockHeight - 4} re`);
  addOp("1 1 1 rg");
  addOp("f");

  const qrY = qrFrameY + framePad;

  for (let r = 0; r < totalQrSize; r++) {
    for (let c = 0; c < totalQrSize; c++) {
      const mr = r - margin;
      const mc = c - margin;
      const isBlack = mr >= 0 && mr < qrSize && mc >= 0 && mc < qrSize
        ? matrix.get(mr, mc)
        : false;
      if (isBlack) {
        const x = qrX + c * qrCellSize;
        const cy = qrY + (totalQrSize - 1 - r) * qrCellSize;
        addOp(`${x} ${cy} ${qrCellSize} ${qrCellSize} re`);
        addOp("0 0 0 rg");
        addOp("f");
      }
    }
  }

  const footerText1 = "Show this QR code at the entrance for check-in";
  addOp("BT");
  addOp("/F1 8 Tf");
  addOp("0.5 0.5 0.5 rg");
  addOp(`${pageW / 2 - textWidth(footerText1, 8, false) / 2} ${y(footerLine1Offset)} Td`);
  addOp(`(${footerText1}) Tj`);
  addOp("ET");

  const footerText2 = String.raw`Rhema Feast \151 An event by Ruach Assembly`;
  addOp("BT");
  addOp("/F1 8 Tf");
  addOp("0.6 0.6 0.6 rg");
  addOp(`${pageW / 2 - textWidth("Rhema Feast (c) An event by Ruach Assembly", 8, false) / 2} ${y(footerLine2Offset)} Td`);
  addOp(`(${footerText2}) Tj`);
  addOp("ET");

  addOp("Q");


  const stream = Buffer.from(content, "latin1");
  const streamObjNum = 6;

  const objects = [
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`,
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`,
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents ${streamObjNum} 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>\nendobj`,
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`,
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`,
    `${streamObjNum} 0 obj\n<< /Length ${stream.length} >>\nstream\n${content}\nendstream\nendobj`,
  ];

  const header = "%PDF-1.4\n";
  const body = objects.join("\n") + "\n";

  let runningOffset = header.length;
  const offsets = objects.map((obj) => {
    const o = runningOffset;
    runningOffset += obj.length + 1;
    return o;
  });

  const xrefStart = header.length + body.length;
  const xrefEntries = `0 7\n0000000000 65535 f \n${offsets.map((o) => String(o).padStart(10, "0") + " 00000 n ").join("\n")}\n`;
  const xref = `xref\n${xrefEntries}`;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\n`;
  const eof = `startxref\n${xrefStart}\n%%EOF`;

  const pdf = Buffer.from(header + body + xref + trailer + eof, "latin1");
  return pdf;
}