const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcryptjs");

const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  console.log("getusers")
  let users = await User.find({});

  users = users.map((user) => user.toObject());
  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const userId = request.params.id;

  const user = await User.findById(userId)

  return user;
})

userRouter.post("/login", async (request, response, next) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const isPasswordCorrect = user && await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

userRouter.post("/signup", async (request, response, next) => {
  const newUser = request.body;

  if (!newUser.username || newUser.username.length < 3 || !newUser.password || newUser.password.length < 3) {
    return response.status(400).json({ error: "username and password must be filled, and be minimum 3 characters long." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const user = new User({
    username: newUser.username,
    passwordHash: passwordHash,
    name: newUser.name,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

userRouter.put("/:id", async (request, response, next) => {
  const requestBody = request.body;

  if (!requestBody.password || requestBody.password.length < 3) {
    return response.status(400).json({ error: "username and password must be filled, and be minimum 3 characters long." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(requestBody.password, saltRounds);

  const newUser = {
    passwordHash: passwordHash,
    name: requestBody.name,
  };

  const updated = await User.findByIdAndUpdate(request.params.id, newUser, { new: true });
  response.json(updated);
});

module.exports = userRouter;
