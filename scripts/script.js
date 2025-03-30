document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');

    fetch('http://localhost:3306/api/highscores')
    .then(response => response.json())
    .then(data => {
        tbody.innerHTML = ''
        data.forEach((row,index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.username}</td>
                <td>${row.score}</td>
            `;
            tbody.appendChild(tr);
        })
    })
    .catch(error => {
        console.error('Error fetching high scores: ', error);
    })
});