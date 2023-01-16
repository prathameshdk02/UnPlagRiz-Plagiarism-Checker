const express = require('express');
const router = express.Router();

router.use((req,res) => {
    let url = req.url;
    res.status(404).render('404',{route:url});
});

module.exports = router;