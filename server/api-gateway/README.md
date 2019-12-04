# API Gateway

## API
### 1. 사용자 로그인
> 카카오 로그인을 위한 요청
- `GET /auth/uesrs/login`



### 2. 사용자 로그아웃
> 카카오 로그아웃을 위한 요청
- `GET /auth/users/logout`

### 3. OAuth Callback 
- `GET /auth/users/callback`

### 4. 파트너 회원가입
- `POST /auth/partners/join`
- `Content-type: application/json`

|   Name   | Data Type | Required / Optional |   Description    |
| :------: | :-------: | :-----------------: | :--------------: |
|   name   |  string   |      required       |      파트너 이름      |
|  email   |  string   |      required       | 파트너 이메일 (unique) |
| password |  string   |      required       |     파트너 비밀번호     |
|   cid    |  string   |      required       |  가맹점 번호 (10글자)   |
- Req
```json
{
	"join": "success" // 회원가입 성공
}

{
	"join": "fail" // 회원가입 실패
}
```

### 5. 파트너 로그인
- `POST /auth/partners/login`
- `Content-type: application/json`

|   Name   | Data Type | Required / Optional | Description |
| :------: | :-------: | :-----------------: | :---------: |
|  email   |  string   |      required       |   파트너 이메일   |
| password |  string   |      required       |  파트너 비밀번호   |

- Req
```json
{
	"login": "success" // 로그인 성공
}
{
	"login": "fail" // 로그인 실패
}
```

### 6. 파트너 로그아웃
- `GET /auth/partners/logout`


## Database Schema

### 파트너 모델

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String, // hashed
  "cid": String // 10자
}
```

### 일반 사용자 모델
```json
{
	"_id": ObjectId,
	"email": String,
	"gender": String,
	"ageRange": String,
	"history": [mongoose.Types.ObjectId],
	"ownGroups": [mongoose.Types.ObjectId],
	"partipatedGroups": [mongoose.Types.ObjectId]
}
```