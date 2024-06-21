document.addEventListener('DOMContentLoaded', () => {
    const puskesmasOptions = {
        'domisili1': ['Puskesmas A', 'Puskesmas B'],
        'domisili2': ['Puskesmas C', 'Puskesmas D']
    };

    const posyanduOptions = {
        'domisili1': ['Posyandu X', 'Posyandu Y'],
        'domisili2': ['Posyandu Z', 'Posyandu W']
    };

    const domisiliSelect = document.getElementById('domisili');
    const puskesmasSelect = document.getElementById('puskesmas_daerah') || document.getElementById('posyandu_daerah');
    const form = document.querySelector('form');

    domisiliSelect.addEventListener('change', (event) => {
        const selectedDomisili = event.target.value;
        let options = [];

        if (puskesmasSelect.id === 'puskesmas_daerah') {
            options = puskesmasOptions[selectedDomisili] || [];
        } else if (puskesmasSelect.id === 'posyandu_daerah') {
            options = posyanduOptions[selectedDomisili] || [];
        }

        // Clear previous options
        puskesmasSelect.innerHTML = '<option value="">Select Daerah</option>';
        // Populate new options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            puskesmasSelect.appendChild(optionElement);
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const appointment = {};
        formData.forEach((value, key) => {
            appointment[key] = value;
        });
        saveAppointment(appointment);
        form.reset();
        alert('Appointment saved successfully!');
    });
});

function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}
