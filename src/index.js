"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsLoader = exports.ActionBuilder = exports.CommandBuilder = exports.TgBuilder = void 0;
var telegraf_1 = require("telegraf");
var dotenv_1 = require("dotenv");
var lowdb_1 = require("lowdb");
var node_1 = require("lowdb/node");
dotenv_1.default.config();
process.on('uncaughtException', function (e) {
    console.log(new Date().toString(), e.stack || e);
    process.exit(1);
});
var TgBuilder = /** @class */ (function () {
    function TgBuilder() {
        this.commands = [];
        this.actions = [];
    }
    TgBuilder.prototype.setUniqToken = function (token) {
        this.token = token;
        return this;
    };
    TgBuilder.prototype.setBotName = function (name) {
        this.botName = name;
        return this;
    };
    TgBuilder.prototype.setNewCommand = function (botName, command, callback) {
        var _this = this;
        this.commands.push({
            command: command,
            callback: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, callback(ctx)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            if (err_1.code === 403) {
                                console.log('User has blocked the bot.');
                            }
                            else {
                                throw err_1;
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            botName: botName,
        });
        return this;
    };
    TgBuilder.prototype.addCommandGroup = function (botName, commandGroup) {
        var _a;
        var _this = this;
        var newCommands = commandGroup
            .getCommands()
            .map(function (_a) {
            var command = _a.command, callback = _a.callback;
            return {
                command: command,
                callback: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, callback(ctx)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_2 = _a.sent();
                                if (err_2.code === 403) {
                                    console.log('User has blocked the bot.');
                                }
                                else {
                                    throw err_2;
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
                botName: botName,
            };
        });
        (_a = this.commands).push.apply(_a, newCommands);
        return this;
    };
    TgBuilder.prototype.addActionGroup = function (botName, actionGroup) {
        var _a;
        var _this = this;
        var newActions = actionGroup.getActions().map(function (_a) {
            var action = _a.action, callback = _a.callback;
            return {
                action: action,
                callback: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var err_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, callback(ctx)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_3 = _a.sent();
                                if (err_3.code === 403) {
                                    console.log('User has blocked the bot.');
                                }
                                else {
                                    throw err_3;
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); },
                botName: botName,
            };
        });
        (_a = this.actions).push.apply(_a, newActions);
        return this;
    };
    TgBuilder.prototype.build = function () {
        var _this = this;
        if (!this.token) {
            throw new Error('Bot token is not set');
        }
        this.bot = new telegraf_1.Telegraf(this.token);
        if (this.commands.length) {
            this.commands.forEach(function (command) {
                var _a;
                if (command.botName === _this.botName) {
                    (_a = _this.bot) === null || _a === void 0 ? void 0 : _a.command(command.command, command.callback);
                }
            });
        }
        if (this.actions.length) {
            this.actions.forEach(function (action) {
                var _a;
                if (action.botName === _this.botName) {
                    (_a = _this.bot) === null || _a === void 0 ? void 0 : _a.action(action.action, action.callback);
                }
            });
        }
        this.bot.use(function (ctx, next) {
            ctx.state.botId = _this.token;
            return next();
        });
        this.bot.catch(function (err, ctx) {
            console.log("Encountered an error for ".concat(ctx.updateType), err);
        });
        return this.bot;
    };
    return TgBuilder;
}());
exports.TgBuilder = TgBuilder;
var CommandBuilder = /** @class */ (function () {
    function CommandBuilder(botName) {
        this.commands = [];
        this.botName = botName;
    }
    CommandBuilder.prototype.setNewCommand = function (command, callback) {
        this.commands.push({ command: command, callback: callback, botName: this.botName });
        return this;
    };
    CommandBuilder.prototype.getCommands = function () {
        return this.commands;
    };
    return CommandBuilder;
}());
exports.CommandBuilder = CommandBuilder;
var ActionBuilder = /** @class */ (function () {
    function ActionBuilder(botName) {
        this.actions = [];
        this.botName = botName;
    }
    ActionBuilder.prototype.setNewAction = function (action, callback) {
        this.actions.push({ action: action, callback: callback, botName: this.botName });
        return this;
    };
    ActionBuilder.prototype.getActions = function () {
        return this.actions;
    };
    return ActionBuilder;
}());
exports.ActionBuilder = ActionBuilder;
var BotsLoader = /** @class */ (function () {
    function BotsLoader(path, defModel) {
        this.builders = [];
        var adapter = new node_1.JSONFileSync(path || 'tg.json');
        var db = new lowdb_1.LowSync(adapter, defModel || { bots: [] });
        db.read();
        this.botData = db.data;
    }
    BotsLoader.prototype.addBot = function (botName, commands, actions) {
        var _this = this;
        var newBot = this.botData.bots.filter(function (f) { return f.name === botName; });
        if (newBot.length) {
            newBot.forEach(function (bot) {
                var botBuilder = new TgBuilder();
                botBuilder
                    .setUniqToken((bot === null || bot === void 0 ? void 0 : bot.token) || '')
                    .setBotName(botName)
                    .addCommandGroup(botName, commands(botName))
                    .addActionGroup(botName, actions(botName));
                _this.builders.push(botBuilder);
            });
        }
    };
    BotsLoader.prototype.launch = function (cb) {
        var bots = this.builders.map(function (builder) { return builder.build(); });
        Promise.all(bots.map(function (bot) { return bot.launch(); }))
            .then(function () {
            console.log('All bots launched');
        })
            .then(function () {
            cb();
        })
            .catch(function (err) {
            cb(err);
        });
    };
    return BotsLoader;
}());
exports.BotsLoader = BotsLoader;
