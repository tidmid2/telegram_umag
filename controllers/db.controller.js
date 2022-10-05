const { 
    fetchDocumentType
} = require('../services/db.service');


//вывод documents_type
const getDocumentType = async (req, res, next) => {
try {
    const newDocument = await fetchDocumentType();
    return res.status(200).json(newDocument);
} catch(err) {
    return next(err);
}
}

//вывод Admin документов
// const fetchDocument = async (req, res, next) => {
// try {
//     const {dt1,dt2} = req.params
//     const newDocument = await fetchAllDocumentByUser(dt1,dt2)
//     if (!newDocument) {
//         return res.status(422).json({
//             error: { status: 422, data: "Нет данных."}
//         });
//     }
//     return res.json(newDocument)
// } catch(err) {
//     return next(err);
// }
// }



module.exports = {
    getDocumentType
}