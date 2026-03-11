import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar'; 
import Modal from './Modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. IMPORT YOUR LOCAL HERO IMAGE
// Replace 'your-image-name.jpg' with the actual filename in your src/images folder
import heroBg from './images/home-photo.jpg'; 

// --- LEAFLET ICON FIX ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- SUB-COMPONENT: ADD LOCATION MODAL ---
function AddLocationModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    image: '', 
    description: '', 
    type: 'Accommodations', // Default type
    lat: 40.6401, 
    lng: 22.9444 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop">
        <div className="modal-header">
          <h3>🐾 Add New Spot in SKG</h3>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Name</label>
          <input type="text" placeholder="e.g. Skyline Cafe" required onChange={e => setFormData({...formData, name: e.target.value})} />
          
          <label>Category</label>
          <select className="form-input" onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="Accommodations">Stay (Accommodations)</option>
            <option value="Going Out">Going Out (Cafes/Bars)</option>
          </select>

          <label>Image URL</label>
          <input type="text" placeholder="https://unsplash.com/..." required onChange={e => setFormData({...formData, image: e.target.value})} />
          
          <label>Description</label>
          <textarea placeholder="What makes it pet-friendly?" required onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save to Guide</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  // --- STATE ---
  const [view, setView] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [liveLocations, setLiveLocations] = useState([]);
  const [user, setUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // --- FETCH DATA ---
  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(res => res.json())
      .then(data => setLiveLocations(data))
      .catch(err => console.error("❌ Connection failed:", err));
  }, []);

  // --- HANDLERS ---
  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleAddLocation = (newLoc) => {
    const locWithId = { ...newLoc, id: Date.now() };
    setLiveLocations([...liveLocations, locWithId]);
    setIsAddFormOpen(false);
    // Note: To save permanently, you'd add a fetch POST here
  };

  const confirmDelete = () => {
    if (deleteId) {
      fetch(`http://localhost:5000/api/locations/delete/${deleteId}`)
        .finally(() => {
          setLiveLocations(liveLocations.filter(loc => loc.id !== deleteId));
          setDeleteId(null);
        });
    }
  };

  // --- SHARED VIEW FOR LISTS ---
  const ListView = ({ type }) => {
    const filtered = liveLocations.filter(l => l.type === type);
    
    // Debugging: Open your browser console (F12) to see this
    console.log(`Searching for: ${type}. Found: ${filtered.length} items.`);

    return (
      <div className="accommodations-layout">
        <div className="grid-view">
          {filtered.map(item => (
            <div key={item.id} className="card">
              {user && <button className="delete-badge" onClick={() => setDeleteId(item.id)}>🗑️</button>}
              <img src={item.image} alt={item.name} className="card-img" />
              <div className="card-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}

          {user && (
            <div className="card add-card" onClick={() => setIsAddFormOpen(true)}>
              <div className="add-content">
                <span className="plus-icon">+</span>
                <p>Add New {type}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- MAIN RENDER ---
  return (
    <div className="App">
      <Navbar 
        setView={setView} 
        currentView={view} 
        openModal={() => setIsModalOpen(true)} 
        user={user} 
        onLogout={handleLogout} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLoginSuccess={setUser} 
      />

      <main>
        {/* HOME VIEW */}
        {view === 'home' && (
          <header className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg})` }}>
            <div className="hero-text">
              <h2>WHO ARE WE?</h2>
              <p>THE ULTIMATE GUIDE FOR PET OWNERS IN THESSALONIKI</p>
              <h1>WELCOME TO PAWS IN SKG!</h1>
              <button className="login-trigger-btn" style={{marginTop: '20px'}} onClick={() => setView('map')}>Start Exploring</button>
            </div>
          </header>
        )}

        {/* DYNAMIC LIST VIEWS */}
        {view === 'accommodations' && <ListView type="Accommodations" />}
        {view === 'going out' && <ListView type="Going Out" />}

        {/* MAP VIEW */}
        {view === 'map' && (
          <section className="map-section">
            <MapContainer center={[40.6401, 22.9444]} zoom={13} style={{ height: "600px", width: "100%", borderRadius: '15px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {liveLocations.map(place => (
                <Marker key={place.id} position={[place.lat, place.lng]}>
                  <Popup><strong>{place.name}</strong><br/>{place.description}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </section>
        )}
      </main>

      {/* POP-UPS */}
      {isAddFormOpen && <AddLocationModal onClose={() => setIsAddFormOpen(false)} onSave={handleAddLocation} />}
      
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Remove this location?</h3>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="save-btn" style={{background: '#ff4d4d'}}>Delete</button>
              <button onClick={() => setDeleteId(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2026 Paws in SKG - Thessaloniki Pet-Friendly Guide</p>
      </footer>
    </div>
  );
}

export default App;