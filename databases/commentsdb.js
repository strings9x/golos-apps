const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

let client = null

MongoClient.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(function(instance){
	client = instance
}).catch(console.log);

async function getComment(author, permlink, prefix) {

  

    if (!client) {
        return;
    }

    try {

        const db = client.db("golos-donators");

        let collection = db.collection('comments' + prefix);

        let query = {author, permlink}

        let res = await collection.findOne(query);

return res;

    } catch (err) {

        console.error(err);
    return err;
      } finally {

       
    }
}

async function addComments(comments, prefix) {



  if (!client) {
      return;
  }

  try {

      const db = client.db("golos-donators");

      let collection = db.collection('comments' + prefix);

      let res = await collection.insertMany(comments);

return res;

  } catch (err) {

      console.error(err);
  return err;
    } finally {


  }
}

async function updateComment(author, permlink, title, golos_amount, gbg_amount, prefix) {

 

  if (!client) {
      return;
  }

  try {

      const db = client.db("golos-donators");

      let collection = db.collection('comments' + prefix);

      let res = await collection.updateOne({author, permlink}, {$set: {author, permlink, title, golos_amount, gbg_amount}}, { upsert: true });
console.log(JSON.stringify(res));
return res;

  } catch (err) {

      console.error(err);
  return err;
    } finally {


  }
}

async function removeComments(prefix) {



  if (!client) {
      return;
  }

  try {

      const db = client.db("golos-donators");

      let collection = db.collection('posts' + prefix);

      let res = await collection.drop();

return res;

  } catch (err) {

      console.log(err);
  return err;
    } finally {


  }
}

async function findAllComments(prefix) {


  if (!client) {
      return;
  }

  try {

      const db = client.db("golos-donators");

      let collection = db.collection('comments' + prefix);

      const res = [];
      let cursor = await collection.find({}).limit(500);
      let doc = null;
      while(null != (doc = await cursor.next())) {
          res.push(doc);
      }
  return res;
    } catch (err) {

      console.log(err);
  return err;
    } finally {

  }
}

module.exports.getComment = getComment;
module.exports.updateComment = updateComment;
module.exports.removeComments = removeComments;
module.exports.findAllComments = findAllComments;