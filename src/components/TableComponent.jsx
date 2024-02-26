import React, { useState } from 'react';
import JsPDF from 'jspdf';

const TableComponent = ({ entries }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const generatePDF = () => {
    console.log("Generating PDF...");
    const report = new JsPDF('portrait', 'pt', 'a4');
    
    // Add table headers
    const headers = [['Name', 'Address', 'Phone', 'GST Number', 'Service', 'Quantity', 'Unit Price', 'Total Price']];
    
    // Add table data
    const data = entries.map(entry => {
      return [
        entry.Name,
        entry.Address,
        entry.Phone,
        entry['GST Number'],
        (entry.items || []).map(item => item.service).join('\n'), // Check if items exist
        (entry.items || []).map(item => item.quantity).join('\n'), // Check if items exist
        (entry.items || []).map(item => item.unitPrice).join('\n'), // Check if items exist
        (entry.items || []).map(item => item.totalPrice).join('\n') // Check if items exist
      ];
    });
  
    // Set the table margin and font size
    report.setLineWidth(0.5);
    report.setFontSize(12);
    
    // Add table to PDF
    report.table(10, 10, data, headers, { autoSize: true });
  
    // Save PDF
    report.save('report.pdf');
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearch} 
        className="form-control mb-3" 
      />
      <h3>Form Data</h3>
      <table id="report" className='table table-bordered table-striped'>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>GST Number</th>
            <th>Invoice Details</th> {/* Add this column */}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.Name}</td>
              <td>{entry.Address}</td>
              <td>{entry.Phone}</td>
              <td>{entry['GST Number']}</td>
              <td> {/* Render invoice details here */}
                {(entry.items || []).map((item, idx) => ( // Check if items exist
                  <div key={idx}>
                    <div>Service: {item.service}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Unit Price: {item.unitPrice}</div>
                    <div>Total Price: {item.totalPrice}</div>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} type="button" className="btn btn-primary">Export PDF</button>
    </div>
  );
};

export default TableComponent;
