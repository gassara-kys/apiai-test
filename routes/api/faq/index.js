'use strinct'
// 環境変数からアクセストークンを読み込む
const APIAI_CLIENT_ACCESS_TOKEN = process.env.APIAI_CLIENT_ACCESS_TOKEN;

var apiai   = require('apiai');
var uuid    = require('node-uuid');
var express = require('express');

/**
 * Router
 */
var faqRoutes = express.Router();

/**
 * api.aiにPOSTします。
 * TODO try..catchとかちょっとまだ
 */
// POST(http://localhost:8080/api/question)
faqRoutes.post('/question', function(req, res) {

    asyncApiaiRequest(req.body.question)
    .then(function(aiResponse){
        var statusCode = aiResponse.status.code;
        var message = "";
        for(var msg of aiResponse.result.fulfillment.messages){
            message = message + msg.speech + "\n";
        }
        return res
            .status(statusCode)
            .json({
            success  : aiResponse.status.errorType,
            question : aiResponse.result.resolvedQuery,
            action   : aiResponse.result.action,
            answer   : message
        });
    });

});

/**
 * API.AIへの非同期リクエスト
 * @param {String} query
 * @return {Promise}
 */
function asyncApiaiRequest(query){
    var aiInstance = apiai(APIAI_CLIENT_ACCESS_TOKEN);
    var aiRequest = aiInstance.textRequest(query, {sessionId: uuid.v1()});
    return new Promise(function(resolve, reject){
        aiRequest.on('response', function(response){
            resolve(response);
        });
        aiRequest.end();
    });
}


module.exports = faqRoutes;
