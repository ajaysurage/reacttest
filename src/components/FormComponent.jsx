import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Phone: '',
    'GST Number': ''
  });

  const [items, setItems] = useState([{ service: '', quantity: '', unitPrice: '', totalPrice: '' }]);
  
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };
  
  const handleAddItem = () => {
    setItems([...items, { service: '', quantity: '', unitPrice: '', totalPrice: '' }]);
  };
  
  const handleRemoveItem = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = { ...formData, items };
    onSubmit(invoiceData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="Name" 
            name="Name" 
            value={formData.Name} 
            onChange={handleFormChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="Address">Address:</label>
          <input 
            type="text" 
            className="form-control" 
            id="Address" 
            name="Address" 
            value={formData.Address} 
            onChange={handleFormChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Phone:</label>
          <input 
            type="text" 
            className="form-control" 
            id="Phone" 
            name="Phone" 
            value={formData.Phone} 
            onChange={handleFormChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="GSTNumber">GST Number:</label>
          <input 
            type="text" 
            className="form-control" 
            id="GSTNumber" 
            name="GST Number" 
            value={formData['GST Number']} 
            onChange={handleFormChange} 
          />
        </div>
        
        {items.map((item, index) => (
          <div key={index}>
            <h2>invoie details</h2>
            <input
              type="text"
              className="form-control" 
              placeholder="Service"
              name="service"
              value={item.service}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="number"
              className="form-control" 
              placeholder="Quantity"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="number"
              className="form-control" 
              placeholder="Unit Price"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="number"
              className="form-control" 
              placeholder="Total Price"
              name="totalPrice"
              value={item.totalPrice}
              onChange={(e) => handleChange(index, e)}
            />
            {index !== 0 && (
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
