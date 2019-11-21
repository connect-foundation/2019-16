# App List Manager
## App list manager 란?
현재 실행중인 모든 App리스트를 관리하는 모듈

## Query 종류
- add : app 추가
- delete : app 삭제
- update : app 업데이트
- get : app 응답
- getAll : 모든 apps 응답

## 응답 패킷

### query : get, getAll 
```
{
  method : "REPLY",
  query : "apps",
  params : {},
  body : {apps},
  info : {name, host, port}
}
```