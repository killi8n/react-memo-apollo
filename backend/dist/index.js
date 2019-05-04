"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var mongoURI = process.env.MONGO_URI;
var memos = [
    {
        id: 1,
        content: 'hello world',
        writer: 'dongho',
        createdAt: '2019-01-02',
    },
    {
        id: 2,
        content: 'my name is dongho!',
        writer: 'dongho',
        createdAt: '2019-01-03',
    },
    {
        id: 3,
        content: 'Good to see ya!',
        writer: 'dongho',
        createdAt: '2019-01-04',
    },
];
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Query {\n        memos: [Memo]\n        memo(id: ID!): Memo!\n    }\n\n    type Memo {\n        id: ID!\n        content: String!\n        writer: String!\n        createdAt: String!\n    }\n\n    type Mutation {\n        createMemo(content: String!): Memo\n    }\n"], ["\n    type Query {\n        memos: [Memo]\n        memo(id: ID!): Memo!\n    }\n\n    type Memo {\n        id: ID!\n        content: String!\n        writer: String!\n        createdAt: String!\n    }\n\n    type Mutation {\n        createMemo(content: String!): Memo\n    }\n"])));
var resolvers = {
    Query: {
        memos: function () { return memos; },
        memo: function (_, _a) {
            var id = _a.id;
            var targetMemo = memos.filter(function (memo) { return memo.id === +id; });
            return targetMemo[0];
        },
    },
    Mutation: {
        createMemo: function (_, _a) {
            var content = _a.content;
            var memo = {
                id: memos[memos.length - 1].id + 1,
                content: content,
                createdAt: '2019-01-23',
            };
            return memo;
        },
    },
};
var server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
mongoose_1.default
    .connect(mongoURI)
    .then(function () {
    console.log('mongodb connected');
})
    .catch(function (e) {
    console.log(e);
});
var app = express_1.default();
server.applyMiddleware({ app: app });
// const router = express.Router();
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
var templateObject_1;
//# sourceMappingURL=index.js.map