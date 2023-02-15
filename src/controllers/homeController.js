exports.getHome = (req, res) => {
    res.render('home');
};

exports.allOtherRoutes = (req, res) => {
    res.render('404');
};