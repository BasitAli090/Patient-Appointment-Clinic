// API Client for Database Operations
// Replaces localStorage with API calls

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.vercel.app/api' 
  : '/api';

// Load appointments from database
async function loadAppointments(doctor) {
  try {
    const response = await fetch(`${API_BASE}/appointments?doctor=${doctor}`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error loading appointments:', error);
    // Fallback to localStorage if API fails
    const localData = localStorage.getItem(`appointments_${doctor}`);
    return localData ? JSON.parse(localData) : [];
  }
}

// Save appointment to database
async function saveAppointment(doctor, appointment) {
  try {
    const response = await fetch(`${API_BASE}/appointments?doctor=${doctor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });
    if (!response.ok) throw new Error('Failed to save appointment');
    return await response.json();
  } catch (error) {
    console.error('Error saving appointment:', error);
    // Fallback to localStorage
    const appointments = JSON.parse(localStorage.getItem(`appointments_${doctor}`) || '[]');
    appointments.push(appointment);
    localStorage.setItem(`appointments_${doctor}`, JSON.stringify(appointments));
    return appointment;
  }
}

// Update appointment in database
async function updateAppointment(doctor, appointment) {
  try {
    const response = await fetch(`${API_BASE}/appointments?doctor=${doctor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });
    if (!response.ok) throw new Error('Failed to update appointment');
    return await response.json();
  } catch (error) {
    console.error('Error updating appointment:', error);
    // Fallback to localStorage
    const appointments = JSON.parse(localStorage.getItem(`appointments_${doctor}`) || '[]');
    const index = appointments.findIndex(apt => apt.id === appointment.id);
    if (index !== -1) {
      appointments[index] = appointment;
      localStorage.setItem(`appointments_${doctor}`, JSON.stringify(appointments));
    }
    return appointment;
  }
}

// Delete appointment from database
async function deleteAppointment(doctor, id) {
  try {
    const response = await fetch(`${API_BASE}/appointments?doctor=${doctor}&id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete appointment');
    return await response.json();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    // Fallback to localStorage
    const appointments = JSON.parse(localStorage.getItem(`appointments_${doctor}`) || '[]');
    const filtered = appointments.filter(apt => apt.id !== id);
    localStorage.setItem(`appointments_${doctor}`, JSON.stringify(filtered));
    return { success: true };
  }
}

// Reset all appointments
async function resetAllAppointments(password) {
  try {
    const response = await fetch(`${API_BASE}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to reset appointments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error resetting appointments:', error);
    throw error;
  }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadAppointments,
    saveAppointment,
    updateAppointment,
    deleteAppointment,
    resetAllAppointments
  };
}

