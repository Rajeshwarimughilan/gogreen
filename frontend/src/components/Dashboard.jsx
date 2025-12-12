import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Dashboard() {
  const [plants, setPlants] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    const fetchPlants = async () => {
      try {
        const data = await api('/plants')
        setPlants(data)
      } catch (err) {
        setError(err.message)
        // If auth failed, force logout and redirect
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('invalid token')) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      }
    }
    fetchPlants()
  }, [navigate])

  const handleAddPlant = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newPlant = {
      title: formData.get('title'),
      species: formData.get('species'),
      wateringInterval: formData.get('watering'),
      sunlightRequirements: formData.get('sunlight')
    }

    api('/plants', {
      method: 'POST',
      body: JSON.stringify(newPlant)
    })
      .then((created) => {
        setPlants([...plants, created])
        setError('')
        e.target.reset()
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className="plants-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="plants-grid">
        {plants.length === 0 ? (
          <p className="no-plants">No plants yet. Add one below!</p>
        ) : (
          plants.map((plant, idx) => (
            <div key={plant._id || idx} className="plant-card">
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
