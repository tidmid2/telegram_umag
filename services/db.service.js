const { 
    fetchDocumentTypeDB
}
= require('../db/data.db');

const fetchDocumentType = async () => {
try {
    return await fetchDocumentTypeDB();
} catch (e) {
    throw new Error(e.message);
}
}

module.exports = {  
    fetchDocumentType
}