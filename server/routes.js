// routes.js
// Middleware para prefijar /api antes de las rutas de json-server

export default function (req, res, next) {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.replace('/api', '');
  }
  next();
}
