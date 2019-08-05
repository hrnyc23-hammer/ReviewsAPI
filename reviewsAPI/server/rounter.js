const router = require("express").Router();
const { getReviews, getRatings } = require("./controller.js");
const { postReviews, putReport } = require("./controller.js");
const { putHelpfulness, createReviews } = require("./controller.js");

//GET /reviews/:product_id/list
router.get("/:product_id/list", (req, res) => {
  getReviews(req, res, req.params.product_id);
});

//GET /reviews/:product_id/meta
router.get("/:product_id/meta", (req, res) => {
  getRatings(req, res, req.params.product_id);
});

//POST /reviews/:product_id
router.post("/:product_id", (req, res) => {
  postReviews(req, res, req.params.product_id);
});

//PUT /reviews/helpful/:review_id
router.put("/helpful/:review_id", (req, res) => {
  putHelpfulness(req, res, req.params.review_id);
});

//PUT /reviews/report/:review_id
router.put("/report/:review_id", (req, res) => {
  putReport(req, res, req.params.review_id);
});

module.exports = router;
