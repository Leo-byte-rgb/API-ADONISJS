import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/users", "UsersController.all");
  Route.delete("/users/:id", "UsersController.delete");
  Route.put("/users/:id", "UsersController.update");
  Route.get("/users/:id", "UsersController.find");
})
  .prefix("/api")
  .middleware("auth");

Route.group(() => {
  Route.post("/register", "UsersController.create");
  Route.post("/login", "AuthController.authenticate");
}).prefix("/auth");
