//exporting the home controller

module.exports.home = function (req, res) {
  // console.log('cokkie', req.cookies);
  // console.log("home controller k andar");
  // console.log("mera bhai",(res.locals));
  
  try {
    return res.render("home", {
      title: "title",
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
