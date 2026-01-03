import { useState, useEffect } from "react";
import { getRestaurants } from "../utils/localStorageHelpers";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

export default function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

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
        role="customer"
        onFilterType={setFilterType}
        onFilterParking={setFilterParking}
        onSearch={setSearch}
      />
      <div>
        {displayed.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}
