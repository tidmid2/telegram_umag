
    const { 
        getDocumentType
    } = require('../controllers/db.controller')
    const express = require('express');
    
    const router = express.Router();
    router.get('/app', getDocumentType)
    // router .post('/auth/signup', validateSignUpUser, signUpUser)
    module.exports = router;