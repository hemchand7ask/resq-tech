let map;
let markers = [];
const accidentData = [
    {
        date: "12-02-2026",
        time: "10:30 AM",
        latitude: 12.9716,
        longitude: 77.5946,
        status: "Alert Sent"
    },
    {
        date: "13-02-2026",
        time: "08:15 PM",
        latitude: 13.0827,
        longitude: 80.2707,
        status: "Cancelled"
    },
    {
        date: "14-02-2026",
        time: "06:45 PM",
        latitude: 17.3850,
        longitude: 78.4867,
        status: "Alert Sent"
    }
];
function initMap() {
    map = L.map('map').setView([12.9716, 77.5946], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    addAllMarkers();
}
function addAllMarkers() {
    accidentData.forEach((data, index) => {
        const marker = L.marker([data.latitude, data.longitude])
            .addTo(map)
            .bindPopup(`
                <b>Accident</b><br>
                ${data.date} ${data.time}<br>
                Status: ${data.status}
            `);

        markers.push(marker);
    });
}
function focusMarker(index) {
    const data = accidentData[index];
    map.setView([data.latitude, data.longitude], 14);
    markers[index].openPopup();
}
function loadAccidentData() {
    const table = document.getElementById("accidentTable");

    accidentData.forEach((data, index) => {
        const row = document.createElement("tr");

        const statusClass =
            data.status === "Alert Sent" ? "alert" : "cancelled";

        row.innerHTML = `
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.latitude}</td>
            <td>${data.longitude}</td>
            <td>
                <span class="status ${statusClass}">
                    ${data.status}
                </span>
            </td>
        `;

        row.onclick = () => focusMarker(index);
        table.appendChild(row);
    });
}
function updateSummary() {
    document.getElementById("totalCount").innerText = accidentData.length;
    document.getElementById("alertCount").innerText =
        accidentData.filter(a => a.status === "Alert Sent").length;
    document.getElementById("cancelledCount").innerText =
        accidentData.filter(a => a.status === "Cancelled").length;
}
window.onload = () => {
    initMap();
    loadAccidentData();
    updateSummary();
};
