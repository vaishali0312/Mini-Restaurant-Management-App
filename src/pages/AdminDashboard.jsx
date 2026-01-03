import { useState, useEffect } from "react";
import { getRestaurants, saveRestaurants } from "../utils/localStorageHelpers";
import Navbar from "../components/Navbar";
import RestaurantForm from "../components/RestaurantForm";
import RestaurantCard from "../components/RestaurantCard";

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  const handleAdd = (newRes) => {
    const updated = [...restaurants, newRes];
    setRestaurants(updated);
    saveRestaurants(updated);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    const updated = restaurants.filter((r) => r.id !== id);
    setRestaurants(updated);
    saveRestaurants(updated);
    alert("Restaurant deleted successfully");
  };

  // filter + search logic
  const displayed = restaurants.filter((r) => {
    const matchType = filterType ? r.type === filterType : true;
    const matchPark =
      filterParking !== ""
        ? r.parkingLot === (filterParking === "true")
        : true;
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase());
    return matchType && matchPark && matchSearch;
  });

  return (
    <div>
      <Navbar
        role="admin"
        onFilterType={setFilterType}
        onFilterParking={setFilterParking}
        onSearch={setSearch}
      />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <RestaurantForm onAdd={handleAdd} />
        </div>
        <div style={{ flex: 2 }}>
          {displayed.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onDelete={handleDelete}
              isAdmin={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
