document.addEventListener('DOMContentLoaded', () => {
    const appointmentsList = document.getElementById('appointments-list');
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<p>No appointments scheduled.</p>';
    } else {
        appointments.forEach((appointment, index) => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.classList.add('appointment');
            appointmentDiv.innerHTML = `
                <p><strong>Domisili:</strong> ${appointment.domisili}</p>
                <p><strong>Daerah:</strong> ${appointment.puskesmas_daerah || appointment.posyandu_daerah}</p>
                <p><strong>Service:</strong> ${appointment.service}</p>
                <p><strong>Date:</strong> ${appointment.date}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
            `;
            appointmentsList.appendChild(appointmentDiv);
        });
    }
});
