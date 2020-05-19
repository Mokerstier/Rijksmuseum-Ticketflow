
    function getHome(req, res){
        res.render('pages/home.ejs', {
            title: 'Home'
        })
    }



module.exports = {
    getHome
}