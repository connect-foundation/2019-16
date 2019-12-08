## App class
- service class 들이 상속받아 구현할 추상 class 혹은 부모 class

### 기능
다른 service들과 socket통신 할 수 있는 메소드 제공 및 api gateway의 통신, 자신의 message queue를 비우는 작업

### 생성자
name : 이름

host : ip host

port : port 번호

job : onRead 이벤트함수(자신에게 data 이벤트가 발생했을 때 호출한는 함수)에서 하는 작업(함수)

### method
- send (appClient : socket, data : Object): void
  - 전송할 data와 목표하는 socket Client 를 받아 packet을 전송한다. 만약, data의 curQuery와 endQuery가 같으면 apiGateway에게 data를 전송한다.

- connectToApp(name, onCreate, onRead, onEnd, onError) : cleint
  - socket연결을 할 app name과 이벤트 함수들을 받아 연결한 뒤 , client를 반환한다.

- connectToAppListManager : client
  - applistmanager와 socket 연결
  
- connectToLogService
  - connectToLogService socket 연결
  
- connectToApiGateway
  - connectToApiGateway socket 연결
