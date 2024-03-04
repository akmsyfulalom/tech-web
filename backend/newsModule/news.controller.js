const News = require('./news.model');


const createNews = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        console.log("🚀 ~ createNews ~ title, description, image:", title, description, image)
        
   
        if (!title || !description || !image) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const news = new News({ title, description, image });

        const savedNews = await news.save();

        res.status(201).json(savedNews);
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'An error occurred while creating the news.' });
    }
};


const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send('News not found.');
        }
        res.json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateNews = async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNews) {
            return res.status(404).send('News not found.');
        }
        res.json(updatedNews);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).send('News not found.');
        }
        res.send('News deleted successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
};
