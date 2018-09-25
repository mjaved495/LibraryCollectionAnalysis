c3.generate({
    bindto: '#sjr',
    data: {
        columns: [
            ['SJR', 0.879]
        ],
        type: 'gauge',
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
       label: {
           format: function(value, ratio) {
               return "SJR : "+value;
           },
           show: false // to turn off the min/max labels.
       },
       min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
       max: 1, // 100 is default
       units: 'value',
       width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
             unit: 'value', // percentage is default
             max: 1, // 100 is default
             values: [0.25, 0.50, 0.75, 1.0]
        }
    },
    size: {
        height: 180
    }
});

c3.generate({
    bindto: '#snip',
    data: {
        columns: [
            ['SNIP', 1.065]
        ],
        type: 'gauge',
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
       label: {
           format: function(value, ratio) {
               return "SNIP : "+value;
           },
           show: false // to turn off the min/max labels.
       },
       min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
       max: 4, // 100 is default
       units: 'value',
       width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
             unit: 'value', // percentage is default
             max: 4, // 100 is default
             values: [1,2,3,4]
        }
    },
    size: {
        height: 180
    }
});

c3.generate({
    bindto: '#citescore',
    data: {
        columns: [
            ['CiteScore', 1.69]
        ],
        type: 'gauge',
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
       label: {
           format: function(value, ratio) {
               return "CiteScore : "+value;
           },
           show: false // to turn off the min/max labels.
       },
       min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
       max: 4, // 100 is default
       units: 'value',
       width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
             unit: 'value', // percentage is default
             max: 4, // 100 is default
             values: [1, 2, 3, 4]
        }
    },
    size: {
        height: 180
    }
});


