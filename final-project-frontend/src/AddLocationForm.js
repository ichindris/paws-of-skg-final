const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userFormData) // Name, type, lat, lng, description
    });
    
    if(response.ok) {
        alert("Thank you! Thessaloniki owners can now see your spot on the map.");
    }
};