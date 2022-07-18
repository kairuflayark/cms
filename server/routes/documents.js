var express = require('express');
var router = express.Router();


const sequenceGenerator = require('./sequenceGenerator');

const Document = require('../models/document');

router.get('/', (req, res, next) => {
    Document.find({}, {_id:0})
        .then(documents => {
            res
                .status(200)
                .json({
                    message: "Documents fetched successfully",
                    documents: documents
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.get('/:id', (req, res, next) => {
    Document.findOne({
        'id': req.params.id
    }, {_id:0})
        .then(document => {
            res
                .status(200)
                .json({
                    message: "Document fetched successfully",
                    document: document
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId('documents');

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,

        children: req.body.children,
    });

    document.save()
        .then(createdDocument => {
            res
                .status(201)
                .json({
                    message:"Document Added Successfully",
                    document: createdDocument
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            })
        })
});

router.put('/:id', (req, res, next) => {
    Document.findOne({
        id:req.params.id
    })
    .then(document => {
        document.name = req.body.name;
        document.description = req.body.description,
        document.url = req.body.url;
        document.children = req.body.children;

        Document.updateOne({
            id:req.params.id
        }, document)
        .then(result => {
            res
            .status(204)
            .json({
                message: "Document updated successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            })
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Document.findOne({
        id:req.params.id
    })
    .then(document => {
        Document.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res
            .status(204)
            .json({
                message:'Document deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            });
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occurred",
            error: error
        })
    })
})

module.exports = router