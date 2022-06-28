var config = {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [{
            label: 'Productos',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [10, 50, 40],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Total de ordenes son 51 ordenes de Oct 25,2017 - Nov 8, 2017'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 10,
                    max: 50
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('line-chart').getContext('2d');
    window.myLine = new Chart(ctx, config);
    var pieChart = document.getElementById('pie-chart').getContext('2d');
    window.myPie = new Chart(pieChart, configPieChart);
};

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var configPieChart = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                '#b1cc43',
                '#cc9043',
                '#0099cc',
                '#e81123',
            ],
            label: 'Dataset 1'
        }],
        labels: [
            'Material Medico',
            'Pastillas',
            'Jarabes',
            'Inyecciones',
        ]
    },
    options: {
        responsive: true
    }
};

// window.onload = function() {
//
// };



