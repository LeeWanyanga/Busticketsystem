import React, { useEffect, useState } from "react";
import axios from 'axios';

function Ticket() {
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("http://127.0.0.1:8000/destination");
      setDestination(result.data);
    } catch (err) {
      console.error("Error loading destinations:", err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/destination", {
        name: name,
        price: price,
        destination: destination
      });
      alert("Ticket Booking Successful");
      setId("");
      setName("");
      setPrice("");
      setDestination("");
      Load();
    } catch (err) {
      console.error("Error booking ticket:", err);
      alert("Ticket Booking Failed");
    }
  }

  async function editPassanger(passenger) {
    setName(passenger.name);
    setPrice(passenger.price);
    setDestination(passenger.destination);
    setId(passenger.id);
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/destination/${id}`, {
        id: id,
        name: name,
        destination: destination,
        price: price
      });
      alert("Ticket Updated");
      setId("");
      setName("");
      setPrice("");
      setDestination("");
      Load();
    } catch (err) {
      console.error("Error updating ticket:", err);
      alert("Ticket update Failed");
    }
  }

  async function deletePassanger(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/student/${id}`);
      alert("Ticket deleted Successfully");
      setId("");
      setName("");
      setPrice("");
      setDestination("");
      Load();
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  }

  return (
    <div className="container">
      <h1>Ticket Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Passenger Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(event) => setCourse(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              value={destination}
              onChange={(event) => setFee(event.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Purchase
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
        <table className="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">Ticket Id</th>
              <th scope="col">Passenger Name</th>
              <th scope="col">Price</th>
              <th scope="col">Destination</th>
             
            </tr>
          </thead>
          <tbody>
            {destination.map((passenger) => (
              <tr key={passenger.id}>
                <th scope="row">{passenger.id}</th>
                <td>{passenger.name}</td>
                <td>{passenger.price}</td>
                <td>{passenger.destination}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editPassanger(passenger)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deletePassanger(passenger.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ticket;
