var linechart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', '2015', '2016', '2017', '2018', '2019'],
            ['CostData', 0, 0, 0, 1987, 2384],
            ['UsageData', 190, 765, 634, 387, 0],
            ['TurnawayData', 4, 8, 8, 0, 0],
            ['ClickData', 65, 154, 44, 19, 0],
        ],
        types: {
            UsageData: 'spline',
            TurnawayData: 'spline',
            ClickData: 'spline',
            CostData: 'bar'
        },
        axes: {
            CostData: 'y2',
            UsageData: 'y',
            TurnawayData: 'y',
            ClickData: 'y'
        }
    },
    grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
    },
    axis: {
        y2: {
            show: true,
        }
    }
});