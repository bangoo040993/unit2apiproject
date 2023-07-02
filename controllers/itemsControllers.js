const Item = require('../models/itemModel');




//POST\\
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.status(201).json({ 
            message: 'Item created successfully',
            createdItem: item,
            request: {
                type: 'GET',
                url: "http://localhost:3000/items/" + item._id
            }
    })
        console.log(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
//GET\\
exports.getOneItem = async (req, res) => {
    try {
    const oneItem = await Item.findOne({ _id: req.params.id });
    res.json({ 
        message: 'Item retrieved successfully',
        item: oneItem,
        seeAllItems: {
            type: 'GET',                                              
            url: 'http://localhost:3000/items/'
        },
        createNewItem: {
            type: 'POST',
            url: 'http://localhost:3000/items/create'
        }
    });
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
};

//GET\\
exports.getAllItems = async (req, res) => {
    try {
    const foundItems = await Item.find({});
    res.json({ message: 'we in Neo',
        items: foundItems.map(doc => {
            return {
                name: doc.name, 
                _id: doc._id,
                request: {
                    type: 'GET',                                              
                    url: 'http://localhost:3000/items/' + doc._id
                }
            }
        }) 
    });
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
 };