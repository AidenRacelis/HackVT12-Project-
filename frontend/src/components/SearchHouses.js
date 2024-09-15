import React, { useState, useEffect } from 'react';
import housegenerator from '../FrontendFunctions/housegenerator';
import '../css/search.css';

const Modal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Here are your options</h2>
        <button className="selection" onClick={() => alert("I made my choice!")}>
          I made my choice!
        </button>
        <br />
        <button className="close-btn" onClick={closeModal}>
          Close Modal
        </button>
      </div>
    </div>
  );
};

function formatString(str) {
  return str
    .replace(/_/g, ' ')
    .replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function repeat(rating) {
  if (rating === 'great') return '★★★★★';
  if (rating === 'good') return '★★★★';
  if (rating === 'mid') return '★★★';
  if (rating === 'poor') return '★★';
  if (rating === 'bad') return '★';
}

export default function SearchHouses() {
  const [houseList, setHouseList] = useState([]); // Store the generated house list
  const [filteredHouseList, setFilteredHouseList] = useState([]); // Filtered houses list
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [setting, setSetting] = useState('');

  // Generate the house list once when the component mounts
  useEffect(() => {
    const generatedHouses = housegenerator(500);
    setHouseList(generatedHouses);
    setFilteredHouseList(generatedHouses); // Initially show all houses
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Filter houses based on user input
  const applyFilters = () => {
    const filtered = houseList.filter((house) => {
      return (
        (price === '' || house.price <= parseInt(price)) &&
        (bedrooms === '' || house.bedrooms >= parseInt(bedrooms)) &&
        (bathrooms === '' || house.bathrooms >= parseInt(bathrooms)) &&
        (setting === '' || house.setting.toLowerCase() === setting.toLowerCase())
      );
    });
    setFilteredHouseList(filtered);
  };

  return (
    <div className="SearchWindow">
      <div className="SearchBanner">
        <span className="SearchBar">
        Your dream home is one click away...
        </span>
      </div>

      {/* Filter Section */}
      <div className="FilterSection">
        <h3>Filter Houses</h3>
        <div>
        <label>
          Max Price: 
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter max price"
          />
        </label>
        <label>
          Min Bedrooms: 
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            placeholder="Enter min bedrooms"
          />
        </label>
        <label>
          Min Bathrooms: 
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            placeholder="Enter min bathrooms"
          />
        </label>
        <label>
          Setting: 
          <select value={setting} onChange={(e) => setSetting(e.target.value)}>
            <option value="">Any</option>
            <option value="city_center">City Center</option>
            <option value="urban">Urban</option>
            <option value="suburban">Suburban</option>
            <option value="rural">Rural</option>
            <option value="forest">Forest</option>
          </select>
        </label>
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Display Filtered Houses */}
      <div className="DisplayHouses">
        {filteredHouseList.map((house, index) => (
          <div key={index} className="HouseDiv" value={`${house.home_type}`}>
            {/* <span className="chooseHouse" onClick={toggleModal}></span>000 */}
            <span className="chooseHouse"></span>
            <img
              className="HouseImg"
              src={
                (house.home_type === 'Townhouse' || house.home_type === 'Condo')
                  ? `../assets/${house.home_type}.png`
                  : (house.home_type === 'House' && house.price > 1000000)
                    ? `../assets/${house.home_type}-Modern.png`
                    : `../assets/${house.home_type}-Regular.png`
              }
              alt="House"
            />
            <span className="price" value={`${house.price}`}>
              ${house.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            </span>
            <span className="list_item">{house.size} Sq Ft</span>
            <span className="list_item">{house.bedrooms} bed, {house.bathrooms} bath</span>
            {(house.basement || house.attic) && (
              <span className="list_item">
                {house.basement ? 'Basement' : ''}
                {house.basement && house.attic ? ', ' : ''}
                {house.attic ? 'Attic' : ''}
              </span>
            )}
            {house.parking_garage ? (
              <span className="list_item">{house.parking_am} Car Garage</span>
            ) : (
              <span className="list_item">{house.parking_am} Car Parking</span>
            )}
            <span className="list_item">{formatString(house.setting)}</span>
            {house.schools && (
              <span className="list_item">
                School Rating: {repeat(house.schools)}
              </span>
            )}
            {house.gated && <span className="list_item">Gated Community</span>}
            {(house.AC || house.heat || house.pool) && (
              <span className="list_item">
                {house.pool ? 'Pool' : ''}
                {house.pool && house.AC ? ', ' : ''}
                {house.AC ? 'A/C' : ''}
                {(house.pool || house.AC) && house.heat ? ', ' : ''}
                {house.heat ? 'Heat' : ''}
              </span>
            )}
            {isModalOpen && <Modal closeModal={toggleModal} />}
          </div>
        ))}
      </div>
    </div>
  );
}
