import { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get(`${baseUrl}properties`);
      setProperties(response.data);
      setFilteredProperties(response.data);
      console.log(response.data);
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    if (searchLocation) {
      // Save the location to local storage
      localStorage.setItem('searchLocation', searchLocation);

      // Filter properties based on the search location
      const filtered = properties.filter(property =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      // If no search location, display all properties
      setFilteredProperties(properties);
    }
  };

  return (
    <div className="property-list">
      <h2>Available Properties for Rent</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredProperties.length > 0 ? (
        filteredProperties.map((property) => (
          <div key={property._id} className="property-item">
            {property.pimage && (
              <img src={property.pimage} alt={property.title} className="property-image" />
            )}
            <h3>{property.title}</h3>
            <p>Location: {property.location}</p>
            <p>Price: ${property.price}</p>
            <p>Description: {property.description}</p>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default PropertyList;
