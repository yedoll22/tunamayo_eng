"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.sendStatus(200);
});
router.get("/:toiletId", (req, res) => {
    res.sendStatus(200);
});
router.get("/:toiletId/comments", (req, res) => {
    res.sendStatus(200);
});
router.post("/:toiletId/comments", (req, res) => {
    res.sendStatus(200);
});
router.patch("/:toiletId/comments/:commentId", (req, res) => {
    res.sendStatus(200);
});
router.delete("/:toiletId/comments/:commentId", (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
//# sourceMappingURL=toilets.js.map