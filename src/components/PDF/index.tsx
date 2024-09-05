import React from 'react';
import { Button, Flex } from '@chakra-ui/react'
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AutoTableOptions } from 'jspdf-autotable';
import * as Constants from '@utils/constants';
import * as Footer2 from '@utils/footer2';
import { fetchImageAsBase64 } from '@utils/logo';
import * as Table from '@utils/table';
import "@assets/fonts/AsapCondensed-Regular-normal";
import "@assets/fonts/MyriadPro-Bold-normal";
import "@assets/fonts/MyriadPro-Regular-normal";
import "@assets/fonts/Urbana-Semibold-normal";
import MyriadProFont from '@assets/fonts/Urbana-Semibold-normal';

export const PDF = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const fontFace = new FontFace(
      'MyriadPro-Regular',
      `url(data:font/truetype;charset=utf-8;base64,${MyriadProFont}) format('truetype')`
    );

    fontFace.load().then((loadedFontFace) => {
      document.fonts.add(loadedFontFace);

      JsBarcode(canvasRef.current, Constants.BARCODE, {
        format: Constants.BARCODE_FORMAT,
        displayValue: true,
        font: 'MyriadPro-Regular',
        lineColor: "#000000",
        fontSize: 35,
        textMargin: 15,
      });
    }).catch((error) => {
      console.error('Failed to load the font:', error);
    });
  }, []);

  const generatePdf  = async () => {
    var doc = new jsPDF('p', 'mm', [279, 216]);
    doc.setFont("MyriadPro-Bold");
    var head = [['', '', '', '','']];
    var body = [
      ["1", '20x20x1', 'Essential', 'BT108.01200200','AMFBB41A1'],
      ["1", '20x25x1', 'Essential', 'BT108.01200250','AMFBB41A1'],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
      ["","","","",""],
    ];

    const options: AutoTableOptions = {
      head: head,
      body: body,
      startY: 91,
      showHead: 'firstPage',
      headStyles: {
        fillColor: [230, 230, 230],
        fontSize: 55
      },
      bodyStyles: {
        fontSize: 8,
        font: 'MyriadPro-Bold',
        textColor: [0, 0, 0]
      },
      margin: { top: 0, left: 6, right: 6, bottom: 0 },
      didParseCell: function (data) {
        if (data.column.index === 3) {
          data.cell.styles.font = 'MyriadPro-Regular';
        }
      }
    };
  
    doc.autoTable(options);
    

    doc.setFont("Urbana-Semibold");
    doc.setFontSize(14);
    doc.text("Let's change it up.", 109, 98, {align: 'center'});
    
    doc.setFont("MyriadPro-Bold");
    doc.setFontSize(25);
    doc.text("Your fresh filters are here!", 109, 107, {align: 'center'});
    
    doc.setFont("MyriadPro-Regular");
    doc.setFontSize(10);
    doc.text("Remember, air filters and fridge filters ship separately.", 109, 112, {align: 'center'});
    
    const finalY = (doc as any).lastAutoTable?.finalY || 10;
    doc.addImage(Footer2.FOOTER2_IMG, "JPEG", 6, finalY + 5,204,70);

    const logoBase64 = await fetchImageAsBase64("https://fe-dev-logo-store-bucket.s3.amazonaws.com/logos/fe12logo_bottom_1724951872369.jpeg");
    doc.addImage(logoBase64, "JPEG", 85,19,70,40);
    doc.addImage(Table.TABLE_IMG, "JPEG", 6,6,59,75);

    doc.setFont("Urbana-Semibold");
    doc.setFontSize(13);
    doc.text("OL-C-9999", 35, 12,{align: 'center'});

    doc.setFont("MyriadPro-Bold");
    doc.setFontSize(10);
    doc.text("Order Date", 10, 20);
    doc.text("Ship By Date", 10, 25);
    doc.text("Shipment #", 10, 30);
    doc.text("Order ID", 10, 35);
    doc.text("Ship Via", 10, 45);
    doc.text("Priority", 10, 50);
    

    doc.setFont("MyriadPro-Regular");
    doc.setFontSize(11);
    doc.text("30-Jun-2023", 38, 20);
    doc.text("2023-07-01", 38, 25);
    doc.text("1", 38, 30);
    doc.text("11000000", 38, 35);
    doc.text("FEDXSPS", 38, 45);
    doc.text("99", 38, 50);

    doc.text("Dennis Polizzi\n410 E 78th Street\n4B\nNew York, New York\n10128", 35, 59, {align: "center"});
    

    
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    const base64Image = canvas?.toDataURL('image/jpeg', 0.8);

    if (base64Image) {      
      doc.addImage(base64Image, 'JPEG', 194, 41, 47, 17, undefined, undefined, 90);
    }    
    
    //doc.addPage("letter");
    doc.save('printLabel.pdf');
  };

  return (
    <div>
      <Flex
      justify="center"
      align="center"
      py={10}     
      width="100%"
    >
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <Button 
        type="submit"
        fontFamily="heading"
        fontSize={16}
        colorScheme="green"
        _hover={{
          bg: 'green.600',
          color: 'white'
        }} 
        onClick={generatePdf}>Download PDF</Button>
      </Flex>       
    </div>
  );
};