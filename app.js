// Frozen appointment numbers
const FROZEN_NUMBERS = {
    umar: [1, 2, 3, 10, 15, 20], // Emergency patients
    samreen: [1, 2, 3, 4, 5, 9, 10, 13, 16, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38] // Dr Umar Farooq Ultrasound patients
};

// Initialize app
let currentDoctor = 'umar';
let editingAppointmentId = null;
const RESET_PASSWORD = 'admin123'; // Change this password as needed
let filteredAppointments = {}; // Store filtered appointments for search

// API Client (with localStorage fallback)
const API_BASE = window.location.origin + '/api';

// Load data from database (with localStorage fallback)
async function loadAppointments(doctor) {
    try {
        const response = await fetch(`${API_BASE}/appointments?doctor=${doctor}`);
        if (response.ok) {
            const data = await response.json();
            return data || [];
        }
    } catch (error) {
        console.log('Using localStorage fallback:', error);
    }
    // Fallback to localStorage
    const data = localStorage.getItem(`appointments_${doctor}`);
    return data ? JSON.parse(data) : [];
}

// Save data to database (with localStorage fallback)
async function saveAppointments(doctor, appointments) {
    // Save to localStorage first for immediate UI update
    localStorage.setItem(`appointments_${doctor}`, JSON.stringify(appointments));
    
    // Try to sync with database
    try {
        // For now, we'll save individual appointments when created/updated
        // This function is kept for compatibility
    } catch (error) {
        console.log('Database sync failed, using localStorage only:', error);
    }
}

// Check if appointment number is frozen
function isFrozen(doctor, number) {
    return FROZEN_NUMBERS[doctor].includes(number);
}

// Generate next available appointment number (daily reset)
async function generateNextAppointmentNumber(doctor) {
    const appointments = await loadAppointments(doctor);
    const today = getTodayDate();
    
    // Only consider appointments from today for numbering
    const todayAppointments = appointments.filter(apt => apt.date === today || !apt.date);
    const usedNumbers = todayAppointments.map(apt => apt.number);
    const frozenNumbers = FROZEN_NUMBERS[doctor];
    
    let nextNumber = 1;
    
    // Find the next number that's not used today and not frozen
    while (usedNumbers.includes(nextNumber) || frozenNumbers.includes(nextNumber)) {
        nextNumber++;
    }
    
    return nextNumber;
}

// Render appointments for a doctor
async function renderAppointments(doctor, searchTerm = '') {
    const appointments = await loadAppointments(doctor);
    const container = document.getElementById(`${doctor}-appointments`);
    
    // Filter appointments if search term exists
    let displayAppointments = appointments;
    if (searchTerm) {
        displayAppointments = appointments.filter(apt => {
            const patientName = apt.patient_name || apt.patientName || '';
            return patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   apt.number.toString().includes(searchTerm);
        });
    }
    
    // Update appointment count
    const countElement = document.getElementById(`${doctor}-count`);
    if (countElement) {
        countElement.textContent = `${displayAppointments.length} appointment${displayAppointments.length !== 1 ? 's' : ''}`;
    }
    
    // Update next available number
    updateNextNumber(doctor);
    
    if (displayAppointments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>${searchTerm ? 'No appointments found' : 'No appointments yet'}</p>
                <p style="font-size: 14px; margin-top: 10px;">${searchTerm ? 'Try a different search term' : 'Click "Add Appointment" to create one'}</p>
            </div>
        `;
        updateStatistics();
        return;
    }
    
    // Sort appointments by number
    displayAppointments.sort((a, b) => a.number - b.number);
    
    container.innerHTML = displayAppointments.map(apt => {
        const frozen = isFrozen(doctor, apt.number);
        const frozenClass = frozen ? 'frozen' : '';
        const disabledAttr = frozen ? 'disabled' : '';
        
        return `
            <div class="appointment-card ${frozenClass}" data-id="${apt.id}">
                <div class="appointment-header">
                    <span class="appointment-number">#${apt.number}</span>
                    <div class="appointment-actions">
                        <button class="btn-edit" onclick="editAppointment('${doctor}', '${apt.id}')" ${disabledAttr}>
                            ✏️ Edit
                        </button>
                        <button class="btn-delete" onclick="deleteAppointment('${doctor}', '${apt.id}')" ${disabledAttr}>
                            🗑️ Delete
                        </button>
                    </div>
                </div>
                <div class="appointment-details">
                    <p><strong>👤 Patient:</strong> ${apt.patient_name || apt.patientName}</p>
                </div>
            </div>
        `;
    }).join('');
    
    updateStatistics();
}

// Update statistics
async function updateStatistics() {
    const umarAppointments = await loadAppointments('umar');
    const samreenAppointments = await loadAppointments('samreen');
    const total = umarAppointments.length + samreenAppointments.length;
    
    const today = getTodayDate();
    const todayTotal = [...umarAppointments, ...samreenAppointments].filter(apt => 
        apt.date === today || !apt.date
    ).length;
    
    document.getElementById('totalAppointments').textContent = total;
    document.getElementById('todayAppointments').textContent = todayTotal;
}

// Filter appointments
function filterAppointments(doctor, searchTerm) {
    renderAppointments(doctor, searchTerm);
}

// Update next available appointment number display
async function updateNextNumber(doctor) {
    const nextNumber = await generateNextAppointmentNumber(doctor);
    const nextElement = document.getElementById(`${doctor}-next`);
    if (nextElement) {
        nextElement.textContent = nextNumber;
    }
}


// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const doctor = btn.dataset.doctor;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active section
        document.querySelectorAll('.doctor-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${doctor}-section`).classList.add('active');
        
        currentDoctor = doctor;
        // Clear search when switching tabs
        document.getElementById(`${doctor}-search`).value = '';
        renderAppointments(doctor).then(() => {
            updateStatistics();
        });
    });
});

// Open add appointment modal
function openAddModal(doctor) {
    currentDoctor = doctor;
    editingAppointmentId = null;
    
    const modal = document.getElementById('appointmentModal');
    const form = document.getElementById('appointmentForm');
    const title = document.getElementById('modalTitle');
    
    title.textContent = '➕ Add Appointment';
    form.reset();
    
    // Generate next appointment number
    generateNextAppointmentNumber(doctor).then(nextNumber => {
        document.getElementById('appointmentNo').value = nextNumber;
    });
    
    modal.classList.add('active');
}

// Edit appointment
function editAppointment(doctor, id) {
    const appointments = loadAppointments(doctor);
    const appointment = appointments.find(apt => apt.id === id);
    
    if (!appointment) return;
    
    // Check if frozen
    if (isFrozen(doctor, appointment.number)) {
        showToast('This appointment number is frozen and cannot be edited.', 'error');
        return;
    }
    
    currentDoctor = doctor;
    editingAppointmentId = id;
    
    const modal = document.getElementById('appointmentModal');
    const form = document.getElementById('appointmentForm');
    const title = document.getElementById('modalTitle');
    
    title.textContent = '✏️ Edit Appointment';
    
    // Fill form with appointment data
    document.getElementById('appointmentNo').value = appointment.number;
    document.getElementById('patientName').value = appointment.patient_name || appointment.patientName || '';
    
    modal.classList.add('active');
}

// Delete appointment
async function deleteAppointment(doctor, id) {
    const appointments = await loadAppointments(doctor);
    const appointment = appointments.find(apt => apt.id === id);
    
    if (!appointment) return;
    
    // Check if frozen
    if (isFrozen(doctor, appointment.number)) {
        showToast('This appointment number is frozen and cannot be deleted.', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete appointment #${appointment.number}?`)) {
        // Delete from database
        try {
            await fetch(`${API_BASE}/appointments?doctor=${doctor}&id=${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.log('Database delete failed, using localStorage:', error);
        }
        
        const updatedAppointments = appointments.filter(apt => apt.id !== id);
        saveAppointments(doctor, updatedAppointments);
        await renderAppointments(doctor);
        await updateNextNumber(doctor);
        showToast(`Appointment #${appointment.number} deleted successfully.`, 'success');
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('appointmentModal');
    modal.classList.remove('active');
    editingAppointmentId = null;
}

// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const appointments = await loadAppointments(currentDoctor);
    const appointmentNumber = parseInt(document.getElementById('appointmentNo').value);
    const patientName = document.getElementById('patientName').value.trim();
    
    // Validation
    if (!patientName) {
        showToast('Please enter patient name.', 'error');
        return;
    }
    
    // Check if number is frozen (for new appointments)
    if (!editingAppointmentId && isFrozen(currentDoctor, appointmentNumber)) {
        showToast('This appointment number is frozen and cannot be used.', 'error');
        return;
    }
    
    if (editingAppointmentId) {
        // Update existing appointment
        const appointment = appointments.find(apt => apt.id === editingAppointmentId);
        if (appointment && isFrozen(currentDoctor, appointment.number)) {
            showToast('This appointment number is frozen and cannot be edited.', 'error');
            return;
        }
        
        let updatedAppointments = appointments.map(apt => {
            if (apt.id === editingAppointmentId) {
                return {
                    ...apt,
                    patient_name: patientName,
                    patientName: patientName, // Keep for backward compatibility
                    date: apt.date || getTodayDate() // Preserve existing date or set to today
                };
            }
            return apt;
        });
        
        // Update in database
        try {
            const response = await fetch(`${API_BASE}/appointments?doctor=${currentDoctor}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingAppointmentId,
                    patient_name: patientName,
                    date: appointment.date || getTodayDate()
                })
            });
            if (response.ok) {
                const updated = await response.json();
                updatedAppointments = updatedAppointments.map(apt => 
                    apt.id === editingAppointmentId ? { ...apt, ...updated } : apt
                );
            }
        } catch (error) {
            console.log('Database update failed, using localStorage:', error);
        }
        
        saveAppointments(currentDoctor, updatedAppointments);
    } else {
        // Check if number is already taken today
        const today = getTodayDate();
        const todayAppointments = appointments.filter(apt => apt.date === today || !apt.date);
        if (todayAppointments.some(apt => apt.number === appointmentNumber)) {
            showToast('This appointment number is already taken today. Please use the auto-generated number.', 'error');
            return;
        }
        
        // Create new appointment
        const newAppointment = {
            id: Date.now().toString(),
            number: appointmentNumber,
            patient_name: patientName,
            date: today
        };
        
        appointments.push(newAppointment);
        saveAppointments(currentDoctor, appointments);
        
        // Save to database
        try {
            const response = await fetch(`${API_BASE}/appointments?doctor=${currentDoctor}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment)
            });
            if (response.ok) {
                const saved = await response.json();
                // Update with database ID if provided
                if (saved.id) {
                    const index = appointments.findIndex(apt => apt.id === newAppointment.id);
                    if (index !== -1) {
                        appointments[index] = saved;
                        saveAppointments(currentDoctor, appointments);
                    }
                }
            }
        } catch (error) {
            console.log('Database save failed, using localStorage:', error);
        }
    }
    
    closeModal();
    await renderAppointments(currentDoctor);
    await updateNextNumber(currentDoctor);
    showToast(editingAppointmentId ? 'Appointment updated successfully!' : 'Appointment created successfully!', 'success');
});

// Close modal when clicking outside
document.getElementById('appointmentModal').addEventListener('click', (e) => {
    if (e.target.id === 'appointmentModal') {
        closeModal();
    }
});

// Open reset modal
function openResetModal() {
    const modal = document.getElementById('resetModal');
    document.getElementById('resetPassword').value = '';
    modal.classList.add('active');
}

// Close reset modal
function closeResetModal() {
    const modal = document.getElementById('resetModal');
    modal.classList.remove('active');
    document.getElementById('resetPassword').value = '';
}

// Handle reset form submission
document.getElementById('resetForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('resetPassword').value;
    
    if (password !== RESET_PASSWORD) {
        showToast('Incorrect password. Please try again.', 'error');
        document.getElementById('resetPassword').value = '';
        return;
    }
    
    if (confirm('⚠️ WARNING: This will delete ALL appointments for both doctors. Are you absolutely sure?')) {
        // Reset in database
        try {
            const response = await fetch(`${API_BASE}/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Reset failed');
            }
        } catch (error) {
            console.log('Database reset failed, using localStorage:', error);
        }
        
        // Clear all appointments for both doctors
        localStorage.removeItem('appointments_umar');
        localStorage.removeItem('appointments_samreen');
        
        // Clear search inputs
        document.getElementById('umar-search').value = '';
        document.getElementById('samreen-search').value = '';
        
        // Refresh both views
        await renderAppointments('umar');
        await renderAppointments('samreen');
        await updateNextNumber('umar');
        await updateNextNumber('samreen');
        
        closeResetModal();
        showToast('All appointments have been reset successfully.', 'success');
    }
});

// Close reset modal when clicking outside
document.getElementById('resetModal').addEventListener('click', (e) => {
    if (e.target.id === 'resetModal') {
        closeResetModal();
    }
});

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Get yesterday's date in YYYY-MM-DD format
function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

// Format date for display
function formatDateDisplay(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Format time for display (HH:MM to 12-hour format)
function formatTime(timeString) {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Get today's appointments for a doctor
async function getTodayAppointments(doctor) {
    const appointments = await loadAppointments(doctor);
    const today = getTodayDate();
    // Filter by today's date, or include appointments without date (for backward compatibility)
    return appointments.filter(apt => apt.date === today || !apt.date);
}

// Get yesterday's appointments for a doctor
async function getYesterdayAppointments(doctor) {
    const appointments = await loadAppointments(doctor);
    const yesterday = getYesterdayDate();
    return appointments.filter(apt => apt.date === yesterday);
}

// Render today's appointments
async function renderTodayAppointments() {
    const today = getTodayDate();
    document.getElementById('todayDate').textContent = formatDateDisplay(today);
    
    const umarAppointments = await getTodayAppointments('umar');
    const samreenAppointments = await getTodayAppointments('samreen');
    
    const umarContainer = document.getElementById('today-umar-list');
    const samreenContainer = document.getElementById('today-samreen-list');
    
    // Render Dr. Umar Farooq appointments
    if (umarAppointments.length === 0) {
        umarContainer.innerHTML = '<p class="no-appointments">No appointments for today</p>';
    } else {
        umarAppointments.sort((a, b) => a.number - b.number);
        umarContainer.innerHTML = umarAppointments.map(apt => {
            const frozen = isFrozen('umar', apt.number);
            const frozenClass = frozen ? 'frozen' : '';
            return `
                <div class="today-appointment-card ${frozenClass}">
                    <span class="appointment-number">#${apt.number}</span>
                    <span class="patient-name">${apt.patient_name || apt.patientName}</span>
                    ${frozen ? '<span class="frozen-badge">🔒 FROZEN</span>' : ''}
                </div>
            `;
        }).join('');
    }
    
    // Render Dr. Samreen Malik appointments
    if (samreenAppointments.length === 0) {
        samreenContainer.innerHTML = '<p class="no-appointments">No appointments for today</p>';
    } else {
        samreenAppointments.sort((a, b) => a.number - b.number);
        samreenContainer.innerHTML = samreenAppointments.map(apt => {
            const frozen = isFrozen('samreen', apt.number);
            const frozenClass = frozen ? 'frozen' : '';
            return `
                <div class="today-appointment-card ${frozenClass}">
                    <span class="appointment-number">#${apt.number}</span>
                    <span class="patient-name">${apt.patient_name || apt.patientName}</span>
                    ${frozen ? '<span class="frozen-badge">🔒 FROZEN</span>' : ''}
                </div>
            `;
        }).join('');
    }
}

// Open today appointments modal
function openTodayModal() {
    const modal = document.getElementById('todayModal');
    renderTodayAppointments();
    modal.classList.add('active');
}

// Close today appointments modal
function closeTodayModal() {
    const modal = document.getElementById('todayModal');
    modal.classList.remove('active');
}

// Close today modal when clicking outside
document.getElementById('todayModal').addEventListener('click', (e) => {
    if (e.target.id === 'todayModal') {
        closeTodayModal();
    }
});

// Render yesterday's appointments
function renderYesterdayAppointments() {
    const yesterday = getYesterdayDate();
    document.getElementById('yesterdayDate').textContent = formatDateDisplay(yesterday);
    
    const umarAppointments = getYesterdayAppointments('umar');
    const samreenAppointments = getYesterdayAppointments('samreen');
    
    const umarContainer = document.getElementById('yesterday-umar-list');
    const samreenContainer = document.getElementById('yesterday-samreen-list');
    
    // Render Dr. Umar Farooq appointments
    if (umarAppointments.length === 0) {
        umarContainer.innerHTML = '<p class="no-appointments">No appointments for yesterday</p>';
    } else {
        umarAppointments.sort((a, b) => a.number - b.number);
        umarContainer.innerHTML = umarAppointments.map(apt => {
            const frozen = isFrozen('umar', apt.number);
            const frozenClass = frozen ? 'frozen' : '';
            return `
                <div class="today-appointment-card ${frozenClass}">
                    <span class="appointment-number">#${apt.number}</span>
                    <span class="patient-name">${apt.patient_name || apt.patientName}</span>
                    ${frozen ? '<span class="frozen-badge">🔒 FROZEN</span>' : ''}
                </div>
            `;
        }).join('');
    }
    
    // Render Dr. Samreen Malik appointments
    if (samreenAppointments.length === 0) {
        samreenContainer.innerHTML = '<p class="no-appointments">No appointments for yesterday</p>';
    } else {
        samreenAppointments.sort((a, b) => a.number - b.number);
        samreenContainer.innerHTML = samreenAppointments.map(apt => {
            const frozen = isFrozen('samreen', apt.number);
            const frozenClass = frozen ? 'frozen' : '';
            return `
                <div class="today-appointment-card ${frozenClass}">
                    <span class="appointment-number">#${apt.number}</span>
                    <span class="patient-name">${apt.patient_name || apt.patientName}</span>
                    ${frozen ? '<span class="frozen-badge">🔒 FROZEN</span>' : ''}
                </div>
            `;
        }).join('');
    }
}

// Open yesterday appointments modal
function openYesterdayModal() {
    const modal = document.getElementById('yesterdayModal');
    renderYesterdayAppointments();
    modal.classList.add('active');
}

// Close yesterday appointments modal
function closeYesterdayModal() {
    const modal = document.getElementById('yesterdayModal');
    modal.classList.remove('active');
}

// Close yesterday modal when clicking outside
document.getElementById('yesterdayModal').addEventListener('click', (e) => {
    if (e.target.id === 'yesterdayModal') {
        closeYesterdayModal();
    }
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Dark mode toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    loadTheme();
    await renderAppointments('umar');
    await updateStatistics();
    await updateNextNumber('umar');
    await updateNextNumber('samreen');
});

