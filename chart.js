let barChartInstance;
let doughnutChartInstance;

function createBarGraph(ctx) {
    if (barChartInstance) {
        barChartInstance.destroy(); // Destroy the previous instance if it exists
    }
    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Starbucks', 'Apple'],
            datasets: [{
                label: 'Profit in Billions',
                data: [112, 84, 114, 68, 92, 119],
                backgroundColor: '#3546a4', // First bar color
                borderWidth: 1
            },
            {
                label: 'Total Revenue in Billions',
                data: [118, 92, 128, 84, 104, 134],
                backgroundColor: '#3e5bff', // Second bar color
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        display: false // This will hide the y-axis scale numbers
                    }
                }
            }
        }
    });
}

function createDoughnutChart(doughnut) {
    if (doughnutChartInstance) {
        doughnutChartInstance.destroy(); // Destroy the previous instance if it exists
    }
    const xValues = ["Customers", "Marketing", "Analyst"];
    const yValues = [62, 24, 14];
    const barColors = [
        "rgba(63, 201, 201, 0.8)",
        "rgba(63, 201, 201, 0.6)",
        "rgba(63, 201, 201, 0.4)"
    ];

    doughnutChartInstance = new Chart(doughnut, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues,
                borderWidth: 0 // Remove the white border
            }]
        },
        options: {
            title: {
                display: true,
                text: "World Wide Wine Production 2018"
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const barGraph = document.getElementById('barGraph');
    const doughnut = document.getElementById('doughnut');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'barGraph') {
                    createBarGraph(entry.target);
                } else if (entry.target.id === 'doughnut') {
                    createDoughnutChart(entry.target);
                }
            }
        });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    observer.observe(barGraph);
    observer.observe(doughnut);
});