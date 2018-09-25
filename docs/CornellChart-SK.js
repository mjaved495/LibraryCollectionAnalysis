var cornell = c3.generate({
    bindto: '#cornell',
    data: {
        x: 'x',
        columns: [
            ['x', '2010', '2011', '2012', '2013', '2014', '2015', '2016' ,'2017', '2018'],
            ['PublicationCount',1,0,1,3,4,4,4,4,5]
        ],
        type: 'bar'
    },
    grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
    }   
});