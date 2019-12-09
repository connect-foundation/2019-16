# 결제 서비스
사용자들의 중복 결제를 방지하고, 결제 내역을 저장하는 서비스 입니다.

## Query
|  No.  |     From      |   Query    |    To     |   Description    |
| :---: | :-----------: | :--------: | :-------: | :--------------: |
|   1   |   `gateway`   | `payStart` | `gateway` |  결제 시작을 알리는 요청   |
|   2   | `reservation` |  `payEnd`  | `gateway` | 결제 후 예약 저장까지 마무리 |
|   3   |   `gateway`   |  `cancel`  | `gateway` |  결제 취소 후 리다이렉트   |
|   4   |   `gateway`   |   `fail`   | `gateway` |  결제 실패 후 리다이렉트   |

### 1. payStart
사용자가 결제를 시작하기 전에 예약하려는 스터디룸이 예약 가능한지 확인
- Params
```json
{}
```

- Req
```json
{}
```

### 2. payEnd
카카오페이 성공 이후에 예약 정보까지 저장한 후 결제 큐에서 결제 완료한 스터디룸 정보를 삭제

### 3. cancel
카카오페이가 취소 되었을 경우 결제 큐를 업데이트

### 4. fail
카카오페이가 실패했을 경우 결제 큐를 업데이트


## Database Schema

### 결제 큐 (in memory)
결제 큐는 동시에 같은 스터디 룸에 예약하는 것을 방지하는 구조체입니다. 자세한 내용은 [여기]()에 있습니다.

### 결제 내역 모델 (MongoDB)