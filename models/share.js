const db= require ('../db/config');

const Share = {};

Share.findByUsername = (username) => {
  console.log("show model" + username)
  return db.any(
    `
    SELECT shares.id, shares.home_user, shares.peer_user, shares.code, shares._date, users.username
    FROM shares
    JOIN users ON users.username = shares.home_user
    WHERE users.username = $1
    ORDER BY shares._date ASC
    `, [username]
  );
};


Share.create = (share) => {
 console.log ("save-models-create");
 console.log("+" + share.code)
  return db.one(`
    INSERT INTO shares
    (home_user, peer_user, code)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [share.home_user, share.peer_user, share.code]);
};



Share.update = (share, id) => {
  console.log ("models-update" + share.code);
  return db.one(
    `
    UPDATE shares SET
      code = $1
    WHERE id = $2
    RETURNING *
  `,
    [share.code, id]
  );
};


Share.destroy = (id) => {
  console.log ("models-delete" + id);
  return db.none(`
    DELETE FROM shares
    WHERE id = $1
  `, [id])
}


Share.findById = (id) => {
 console.log ("get-models-findbyid");
 console.log("+" + id)
  return db.any(`
    SELECT * FROM shares
    WHERE id = $1
  `, [id])
}





module.exports = Share;



