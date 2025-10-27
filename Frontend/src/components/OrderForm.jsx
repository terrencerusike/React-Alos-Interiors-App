import React, { useState } from "react";
import "./OrderForm.css";

const OrderForm = ({ cartItems, totalAmount, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    paymentMethod: "payfast",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayFastPayment = async (e) => {
    e.preventDefault();

    // Create order data for PayFast
    const orderData = {
      merchant_id: process.env.REACT_APP_PAYFAST_MERCHANT_ID,
      merchant_key: process.env.REACT_APP_PAYFAST_MERCHANT_KEY,
      return_url: `${window.location.origin}/payment-success`,
      cancel_url: `${window.location.origin}/payment-cancelled`,
      notify_url: `${process.env.REACT_APP_API_URL}/api/payment/notify`,
      name_first: formData.firstName,
      name_last: formData.lastName,
      email_address: formData.email,
      cell_number: formData.phone,
      m_payment_id: Date.now().toString(),
      amount: totalAmount,
      item_name: `Order from Alos Interiors`,
      custom_str1: JSON.stringify({
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        items: cartItems,
      }),
    };

    // Create form and submit to PayFast
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payfast.co.za/eng/process";

    // Add form fields
    Object.keys(orderData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = orderData[key];
      form.appendChild(input);
    });

    // Add form to document and submit
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="order-form-overlay" style={{ zIndex: 9999 }}>
      <div className="order-form-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="order-form-header">
          <h2>Complete Your Order</h2>
          <p>Total Amount: R{totalAmount}</p>
        </div>

        <form onSubmit={handlePayFastPayment} className="order-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="Eastern Cape">Eastern Cape</option>
                  <option value="Free State">Free State</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="Limpopo">Limpopo</option>
                  <option value="Mpumalanga">Mpumalanga</option>
                  <option value="Northern Cape">Northern Cape</option>
                  <option value="North West">North West</option>
                  <option value="Western Cape">Western Cape</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="payfast"
                  name="paymentMethod"
                  value="payfast"
                  checked={formData.paymentMethod === "payfast"}
                  onChange={handleChange}
                />
                <label htmlFor="payfast">PayFast</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Pay with PayFast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
