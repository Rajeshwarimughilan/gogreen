import { useState } from 'react'

export default function Dashboard() {
  const [plants, setPlants] = useState([])

  const handleAddPlant = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newPlant = {
      title: formData.get('title'),
      species: formData.get('species'),
      wateringInterval: formData.get('watering'),
      sunlightRequirements: formData.get('sunlight')
    }
    setPlants([...plants, newPlant])
    e.target.reset()
  }

  return (
    <div className="plants-container">
      <div className="plants-grid">
        {plants.length === 0 ? (
          <p className="no-plants">No plants yet. Add one below!</p>
        ) : (
          plants.map((plant, idx) => (
            <div key={idx} className="plant-card">
              <h3>{plant.title}</h3>
              <p><strong>Species:</strong> {plant.species}</p>
              <p><strong>Watering:</strong> {plant.wateringInterval}</p>
              <p><strong>Sunlight:</strong> {plant.sunlightRequirements}</p>
            </div>
          ))
        )}
      </div>

      <div className="add-plant">
        <h2>Add a Plant</h2>
        <form onSubmit={handleAddPlant}>
          <input name="title" type="text" placeholder="Plant Name" required />
          <input name="species" type="text" placeholder="Species" required />
          <input name="watering" type="text" placeholder="Watering Interval" required />
          <input name="sunlight" type="text" placeholder="Sunlight Requirements" required />
          <button type="submit">Add Plant</button>
        </form>
      </div>
    </div>
  )
}
