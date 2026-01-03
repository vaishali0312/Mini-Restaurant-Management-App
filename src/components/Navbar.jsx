import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({
  role,
  onFilterType,
  onFilterParking,
  onSearch,
}) {
  const { logout } = useContext(AuthContext);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleType = (e) => {
    onFilterType(e.target.value);
  };

  const handleParking = (e) => {
    onFilterParking(e.target.value);
  };

  return (
    <div style={{ borderBottom: "1px solid gray", padding: "8px" }}>
      <button onClick={logout}>Logout</button>
      <select onChange={handleType}>
        <option value="">All Types</option>
        <option value="Rajasthani">Rajasthani</option>
        <option value="Gujarati">Gujarati</option>
        <option value="Mughali">Mughali</option>
        <option value="Jain">Jain</option>
        <option value="Thai">Thai</option>
        <option value="North Indian">North Indian</option>
        <option value="South Indian">South Indian</option>
      </select>
      <select onChange={handleParking}>
        <option value="">All Parking</option>
        <option value="true">Has Parking</option>
        <option value="false">No Parking</option>
      </select>
      <input
        ref={searchRef}
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
}
