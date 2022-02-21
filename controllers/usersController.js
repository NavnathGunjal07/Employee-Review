const User = require('../models/user');

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }


    return res.render('user_sign_up', {
        title: "Employee Review | Sign Up",
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Employee Review | Sign In",
    })
}

// render the update user page
module.exports.updatePage = async function(req, res){
    let userUpdate = await User.findById(req.params.id);
    return res.render('updateEmployee', {
        title: "Employee Review | Update Employee",
        User_id:req.params.id,
        userUpdate:userUpdate
    })
}

// render add new review page
module.exports.addReviewPage = async function(req, res){
    let userUpdate = await User.findById(req.params.id);
    return res.render('addPerformanceReview', {
        title: "Employee Review | Add New Review",
        User_id:req.params.id,
        userUpdate:userUpdate
    })
}

// render the View All reviews page
module.exports.viewAllReviewsPage = async function(req, res){
    let userUpdate = await User.findById(req.params.id);
    console.log(userUpdate.performanceReview);
    return res.render('viewAllReviews', {
        title: "Employee Review |View All Reviews",
        User_id:req.params.id,
        userUpdate:userUpdate
    })
}
var assginedUser;
// render the Assign to review user user page
module.exports.assignToReviewPage = async function(req, res){
    let userUpdate = await User.findById(req.params.id);
    let users = await User.find({ isAdmin: { $ne: true },_id:{$ne: req.params.id}});
    assginedUser = userUpdate;
    return res.render('AsignToReview', {
        title: "Employee Review | Assign To Review",
        User_id:req.params.id,
        userUpdate:userUpdate,
        users:users,
    })
}
// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            console.log(req.body);
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('back');
            })
        }else{
            return res.redirect('/users/sign-in');
        }

    });
}

// controller for deleting the user
module.exports.destroy = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        user.remove();
        return res.redirect('back');
    }catch(err){
       return res.redirect('back');
    }
}

// controller for making the user admin
module.exports.makeAdmin = async function(req, res){
    try{
        //let user = await User.findById(req.params.id);
        User.findByIdAndUpdate(req.params.id, { isAdmin: true },
        function (err, docs) {
                if (err){
                console.log(err)
                }
                else{
                     console.log("Updated User : ", docs);
                }
            });
        return res.redirect('back');
    }catch(err){
       return res.redirect('back');
    }
}

// controller for updating user details
module.exports.update = async function(req, res){
    try{
        //let user = await User.findById(req.params.id);
        User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email, password: req.body.password},
            function (err, docs) {
                    if (err){
                    console.log(err)
                    }
                    else{
                         console.log("Updated User : ", docs);
                    }
                });
      
        return res.redirect('/');
    }catch(err){
       return res.redirect('back');
    }
}


// controller for Adding performance Review
module.exports.addPerformanceReview = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
       user.performanceReview.push({name:req.user.name, review:req.body.review});
       await user.save();
       let obj = req.user.assignedWorks.find(o => o.uId == req.params.id);
       req.user.assignedWorks = req.user.assignedWorks.filter(item=> item !== obj);
       await req.user.save();
       return res.redirect('/');
    }catch(err){
        console.log(err,"Hey");
       return res.redirect('back');
    }

}

// controller for assigning performance Review to other employees
module.exports.assignReview = async function(req, res){
    try{
       let user = await User.findById(req.params.id);

            assginedUser.assignedWorks.push({name:user.name, uId:req.params.id});
            await assginedUser.save(); 
      
        return res.redirect('/');
    }catch(err){
        console.log(err,"Hey");
       return res.redirect('back');
    }

}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/users/sign-in');
}

