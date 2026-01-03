import { useState } from "react";

export default function RestaurantForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "Rajasthani",
    parkingLot: false,
    image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8756-...", // pre-filled link
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check empties
    if (!formData.name.trim() || !formData.address.trim()) {
      alert("Name and address are required");
      return;
    }
    const newRes = {
      id: Date.now(), // auto-generated
      name: formData.name,
      address: formData.address,
      type: formData.type,
      parkingLot: formData.parkingLot,
      image: formData.image,
    };
    onAdd(newRes);
    alert("Restaurant added successfully");
    // clear form
    setFormData({
      name: "",
      address: "",
      type: "Rajasthani",
      parkingLot: false,
      image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8756-...", 
    });
  };

  return (
    <div>
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            {[
              "Rajasthani",
              "Gujarati",
              "Mughali",
              "Jain",
              "Thai",
              "North Indian",
              "South Indian",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Parking lot:</label>
          <input
            name="parkingLot"
            type="checkbox"
            checked={formData.parkingLot}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
