'use strict';

const Article = require('../../models/Article');
const User = require('../../models/User');

const {parseAndSanitizeMarkdownToHTML} = require('../../helpers');

// article.content = parseAndSanitizeMarkdownToHTML(article.content);
// article.updatedAt = new Date(article.updatedAt).toDateString();

// GET Article
exports.getPressArticle = async (req, res, next) => renderArticle(req, res, next, '/news/press', 'Press');
exports.getBusinessArticle = async (req, res, next) => renderArticle(req, res, next, '/news/business', 'Business');
exports.getTechnologyArticle = async (req, res, next) =>
    renderArticle(req, res, next, '/news/technology', 'Technology');
exports.getLifestyleArticle = async (req, res, next) => renderArticle(req, res, next, '/news/lifestyle', 'Lifestyle');

// GET Articles
exports.getPress = async (req, res, next) => renderArticles(req, res, next, '/news/press', 'Press');
exports.getBusiness = async (req, res, next) => renderArticles(req, res, next, '/news/business', 'Business');
exports.getTechnology = async (req, res, next) => renderArticles(req, res, next, '/news/technology', 'Technology');
exports.getLifestyle = async (req, res, next) => renderArticles(req, res, next, '/news/lifestyle', 'Lifestyle');

// Helper functions
const renderArticles = async (req, res, next, path, category) => {
    try {
        const articles = await Article.find({category: category}).populate('author').limit(9);

        res.render('articles', {
            title: category + ' | BayBank - the best solution for both individuals and companies',
            path: path,
            active: category,
            articles: articles,
        });
    } catch (error) {
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};

const renderArticle = async (req, res, next, path, category) => {
    try {
        let articleId = req.params.articleId;
        const article = await Article.findOne({_id: articleId});

        const isEdit = true;

        res.render('article', {
            title: article.title + ' | BayBank - the best solution for both individuals and companies',
            path: path,
            active: category,
            article: article,
            edit: isEdit,
        });
    } catch (error) {
        res.render('404', {
            title: '404',
            path: '/404',
            active: '',
        });
    }
};
