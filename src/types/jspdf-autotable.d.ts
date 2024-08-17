import jsPDF from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => void; 
    lastAutoTable?: {
      finalY: number; 
    };
  }
}

declare module 'jspdf-autotable' {
  export interface AutoTableOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    showHead?: 'firstPage' | 'everyPage' | false;
    headStyles?: any;
    bodyStyles?: any;
    margin?: { top?: number; left?: number; right?: number; bottom?: number };
    didParseCell?: (data: AutoTableCellData) => void;
  }

  export interface AutoTableCellData {
    cell: {
      raw: any;
      styles: {
        font?: string;
        [key: string]: any;
      };
    };
    column: {
      index: number;
      [key: string]: any;
    };
    row: {
      index: number;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface AutoTableReturn {
    finalY: number; 
  }
}