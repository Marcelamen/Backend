import libroRoute from "./o1/libroRoute.js";
import prestamoRoutes from "./o1/prestamoRouter.js";
import usuarioRoutes from "./o1/usuarioRoutes.js";
// import Routes from "./o1/usuarioRoutes.js";
// i

const routesApi = (app) => {

  const routes = [ usuarioRoutes ,prestamoRoutes, libroRoute]
  routes.forEach(ruta => {
    app.use("/api/o1", ruta);
  })
  
  app.get("/load", (req, resp) => {
    resp.send("Api Loading");
  });
};

export { routesApi };