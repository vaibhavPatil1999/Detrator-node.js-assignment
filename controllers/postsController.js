const connection = require("../model/connection");

const uploadPost = async (req, res) => {
  const { user_id, filename } = req.body;
  const tableCreationQuery =
    "create table if not exists posts (id int AUTO_INCREMENT , user_id int , filename varchar(255),PRIMARY KEY(id))";
  connection.query(tableCreationQuery, (err, result) => {
    if (!err) {
      console.log("table created...");
      const checkingUser = "select * from posts where user_id=?";
      connection.query(checkingUser, [user_id], (err, result) => {
        if (!err) {
          if (result.length > 0) {
            res.status(401).json({
              message: `this userId-${user_id} already posted a post`,
              note: "A user can upload only one post , try with different userId",
              suc: false,
            });
          } else {
            const uploadingQuery =
              "insert into posts (user_id,filename) values (?,?)";
            connection.query(
              uploadingQuery,
              [user_id, filename],
              (err, result) => {
                if (!err) {
                  res.status(200).json({ message: "post uploaded", suc: true });
                } else {
                  console.log("error X :", err);
                  res
                    .status(401)
                    .json({ message: "post not uploaded", suc: false });
                }
              }
            );
          }
        } else {
          console.log("error during finding user", err);
          res.status(401).json({ message: err, suc: false });
        }
      });
    } else {
      console.log("table not created...", err);
    }
  });
};

const getPosts = (req, res) => {
  const fetchingQuery = "select filename from posts";
  connection.query(fetchingQuery, (err, result) => {
    if (!err) {
      res.status(200).json({ suc: true, post: result });
    } else {
      console.log("error X :", err);
      res.status(401).json({ message: "something wrong", suc: false });
    }
  });
};
module.exports = {
  uploadPost,
  getPosts,
};
