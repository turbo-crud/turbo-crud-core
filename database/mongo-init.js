
conn = new Mongo();
db = conn.getDB("turbocrud_db")

db.createUser(
  {
      user: "usr_turbocrud",
      pwd: "kXXEo3FD-6yVoW_0f4Vh",
      roles: [
          {
              role: "readWrite",
              db: "turbocrud_db"
          }
      ]
  }
);