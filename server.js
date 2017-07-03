const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const port_number = 8000;;

const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie',
        created: new Date('2016-08-16'), effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    },
];
app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.lenght + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';
    issues.push(newIssue);
    res.json(newIssue);
});


app.listen(port_number, () => {
    console.log('App started on port ' + port_number);
});

