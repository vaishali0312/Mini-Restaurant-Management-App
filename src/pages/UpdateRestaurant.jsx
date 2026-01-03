import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorageHelpers";

export default function UpdateRestaurant() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurant } = location.state || {};
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "Rajasthani",
    parkingLot: false,
    image: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8756-...",
  });

  useEffect(() => {
    if (!restaurant) {
      navigate("/admin/dashboard");
      return;
    }
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      type: restaurant.type,
      parkingLot: restaurant.parkingLot,
      image: restaurant.image,
    });
  }, [restaurant, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update?"
    );
    if (!confirmUpdate) return;
    const all = getRestaurants();
    const updated = all.map((r) =>
      r.id === restaurant.id
        ? { ...r, ...formData, id: restaurant.id }
        : r
    );
    saveRestaurants(updated);
    alert("Restaurant updated successfully");
    navigate("/admin/dashboard");
  };

  // prevent empty form: check name & address
  const isDisabled = !formData.name.trim() || !formData.address.trim();

  return (
    <div>
      <h1>Update Restaurant</h1>
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
        <button type="submit" disabled={isDisabled}>
          Update
        </button>
      </form>
    </div>
  );
}
