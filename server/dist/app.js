"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const users_1 = __importDefault(require("./router/users"));
const toilets_1 = __importDefault(require("./router/toilets"));
const reports_1 = __importDefault(require("./router/reports"));
require("reflect-metadata");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// {
//   origin: "*",
//   credentials: true,
//   methods: ["GET", "POST", "PATCH", "DELETE", "OPTION"],
// }
app.use((0, morgan_1.default)("tiny"));
app.use((0, helmet_1.default)());
app.use("/users", users_1.default);
app.use("/toilets", toilets_1.default);
app.use("/reports", reports_1.default);
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("server error");
});
app.listen(port, () => {
    console.log("Server running");
});
//# sourceMappingURL=app.js.map