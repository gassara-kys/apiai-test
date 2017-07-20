# APIAI-TEST

## 概要

node.jsでAPIサーバーを立ててapi.aiへの会話を仲介します。
質問を加工したり、回答を解析したり編集したりするようです。
api.aiクライアントのクライアントトークンは環境変数などに設定して起動するイメージです。


## Usage

- APIAIのクライアントアクセストークンを環境変数に設定
- api.aiのagentの設定画面から取得できますので設定してください

```bash
# 環境変数
$ export APIAI_CLIENT_ACCESS_TOKEN=<YOUR_TOKEN>

# ローカルのvscodeなどでデバッグする場合は、launch.jsonに設定すると便利です(.gitinoreに入れておりコミット対象外にしてます)
$ cat .vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}/server.js",
            "env": {
                "APIAI_CLIENT_ACCESS_TOKEN": "<YOUR_TOKEN>",
                "PORT" : 8080
            }
        }
    ]
}
```

- node 起動

```bash
# 必要なモジュール
$ npm install

# サーバー起動
$ node server.js
```

- curlで動作確認

```bash
# POSTでquestionに質問とかを書く
$ curl -v -H "Content-type: application/json" \
    -X POST \
    -d '{"question":"いいラーニングについて教えて！"}' \
    http://localhost:8080/api/question
```