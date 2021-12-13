"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicationController_1 = __importDefault(require("../controllers/publicationController"));
const router = express_1.default.Router();
router.put("/publications", publicationController_1.default.putPublications);
router.get("/publication", publicationController_1.default.getPublication);
router.post("/publications/new", publicationController_1.default.setPublication);
router.delete("/publications/:_id", publicationController_1.default.deletePublications);
router.put("/publications/stock", publicationController_1.default.putStock);
router.get("/publications/marks", publicationController_1.default.getPublicationsMarks);
router.get("/publications/related", publicationController_1.default.getRelatedPublications);
router.put("/publications/state", publicationController_1.default.putPublicationState);
router.post("/publication/message", publicationController_1.default.postPublicationMessageADM);
module.exports = router;
