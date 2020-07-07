const express = require('express');
const app = express();
const port = 3000;
app.get('/brand/:name', (req, res) => {
    // Get the brand
    if(req.params.name){
        // Get ML data
        console.log(req.params.name)
    }
    res.json({ data: [] });
});

app.listen(port, () => console.log(`Listening in port: ${port}`))
