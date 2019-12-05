# API Gateway

API 게이트웨이는 클라이언트의 요청을 제일 먼저 받는 서버입니다. 클라이언트에게서 온 요청을 어느 서비스에게 줄 것인지 확인하기도 하며 인증작업도 하고 있습니다.

## API

### 1. 사용자 등록 유무 확인

사용자가 처음 방문했는 지 확인하기 위한 요청입니다. 사용자의 이메일이 데이터베이스에 존재하지 않는다면 `false`를 반환하고 추가적인 작업을 합니다.

- `POST /auth/users/checkEmail`
- Params

```json
{
  "email": String
}
```

- Res

```json
{	"exist": true }
////// or ///////
{ "exist": false }

```

## Database Schema

### Partners-account

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String, // hashed
  "cid": String // 10자
}
```
