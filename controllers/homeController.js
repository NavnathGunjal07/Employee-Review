
const User = require('../models/user');

//controller for rendering home page
module.exports.home = async function(req,res){
   let users = await User.find({ isAdmin: { $ne: true } }).sort('-createdAt');
   let employee = await User.findById(req.user.id);
   let assignedWorks = employee.assignedWorks;
    return res.render('index.ejs',{
        title: 'Employee Review | Home',
        users: users,
        assignedWorks:assignedWorks
    });
}
