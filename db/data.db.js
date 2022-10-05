const db = require('../db.js');

const fetchDocumentTypeDB = async () => {
    try {
        const res = await db.query(`Select * from document_type order by id ASC`);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

module.exports = {  
    fetchDocumentTypeDB
}