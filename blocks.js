<table id="tableOne">
  <thead>
    <tr class="filter">
      <th>Family</th>
      <th>kids</th>
      <th>Number</th>
      <th>Food</th>
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>

table {
    font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse:collapse;
    width:500px;
}
table th {
    font-size:9pt;
    text-align:left;
    padding-top:5px;
    padding-bottom:4px;
    background-color:#414141;
    border:1px solid #000000;
    color:#FFFFFF;
}
table td {
    font-size:9pt;
    border:1px solid #000000;
    padding:3px 7px 2px 7px;
}

var data =[
    {
        "family": "Johnson",
        "food": "Stuffing",
        "count": "2",
        "kids": "no"
    },
    {
        "family": "Smith",
        "food": "Turkey",
        "count": "3",
        "kids": "yes"
    },
    {
        "family": "Hampton",
        "food": "Wieners",
        "count": "4",
        "kids": "yes"
    },
    {
        "family": "Jones",
        "food": "Pie",
        "count": "2",
        "kids": "no"
    }
];

var tbody = document.getElementById("tbody");
var i = 0;
var n = 0;
var time = null;
var fragment = document.createDocumentFragment();
var updateRate = 10; //ms
console.time('start');

function makeRow() {
    var tr, td;
    //if (i === data.length - 1) {
    if (n === 10000) {
        console.timeEnd('start');
        tbody.appendChild(fragment);
        time = null;
        return;
    }
    if (! time) time = +new Date();
    
    tr = document.createElement('tr');
    tr.className = 'parent';
    tr.setAttribute('id', data[i].family);
    ['family', 'kids', 'count', 'food'].forEach(function (key) {
        td = document.createElement('td');
        td.textContent = data[i][key];
        if (key === 'family') td.className = 'toggle';
        tr.appendChild(td);
    });
    fragment.appendChild(tr);
    
    //i++;
    n++;
    if (+new Date() - time < updateRate) {
        makeRow();
    } else {
        console.log('append rows', n);
        tbody.appendChild(fragment);
        time = null;
        setTimeout(makeRow, 1);
    }
}
makeRow();
