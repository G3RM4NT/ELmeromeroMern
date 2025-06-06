import express from "express";
import faqsController from "../controllers/faqsController.js";

const router = express.Router();

router
  .route("/")
  .get(faqsController.getAllFaqs)
  .post(faqsController.createFaq);

router
  .route("/:id")
  .put(faqsController.updateFaq)
  .delete(faqsController.deleteFaq);

export default router;
