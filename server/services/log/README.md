# Log Service

### PORT : 8004

## API

로그 형식

```json
{
    "traceId":"",                    // timestamp기준으로 uuid 생성
    "id":"",                         // span id
    "kind":"",                       // 서비스명
    "name":"",                       // "METHOD PATH"형식 ex)"GET /"
    "timestamp":                     // epoch 사용
    "http.path": ""
    "localEndpoint": {
      "serviceName": "backend",    // 해당 span을 호출한 서비스
      "ipv4": "172.16.180.133"
    },
}
```
