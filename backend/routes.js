const router = require("express").Router();
const controller = require("./controller/controller")


router.post("/api/webhooks",controller.webhooks);
router.post("/api/event-emulate", controller.emulate);
router.get('/api/db',controller.db);

module.exports = router;