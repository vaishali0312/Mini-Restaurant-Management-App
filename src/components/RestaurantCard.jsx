import { useNavigate } from "react-router-dom";

export default function RestaurantCard({
  restaurant,
  onDelete,
  isAdmin,
}) {
  const navigate = useNavigate();
  const { id, name, address, type, parkingLot, image } = restaurant;

  const handleUpdate = () => {
    navigate("/admin/restaurants/update", { state: { restaurant } });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "8px",
        padding: "8px",
        maxWidth: "300px",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{name}</h3>
      <p>{address}</p>
      <p>Type: {type}</p>
      <p>Parking: {parkingLot ? "Yes" : "No"}</p>
      {isAdmin && (
        <div>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
