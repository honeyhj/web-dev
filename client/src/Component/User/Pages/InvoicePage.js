import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import InvoiceLayout from './InvoiceLayout';
import { useReactToPrint } from 'react-to-print';

const InvoicePage = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <InvoiceLayout ref={componentRef} onClick={handlePrint}/>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default InvoicePage;