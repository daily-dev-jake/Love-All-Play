const PROJECT_ENV = 'PRD';
const BASE_URL = PROJECT_ENV === 'PRD' 
  ? 'https://love-all-play-backend.onrender.com/api/v1' 
  : 'http://localhost:5000/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }
  return await response.json();
};

// Generic CRUD methods
const api = {
  getAll: (entity) =>
    fetch(`${BASE_URL}/${entity}`).then(handleResponse),
  getById: (entity, id) =>
    fetch(`${BASE_URL}/${entity}/${id}`).then(handleResponse),
  getByName: (entity, name) =>
    fetch(`${BASE_URL}/${entity}/name/${name}`).then(handleResponse),
  getByEmail: (entity, email) =>
    fetch(`${BASE_URL}/${entity}/email/${email}`).then(handleResponse),

  create: (entity, data) =>
    fetch(`${BASE_URL}/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (entity, id, data) =>
    fetch(`${BASE_URL}/${entity}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (entity, id) =>
    fetch(`${BASE_URL}/${entity}/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
};

export default api;
