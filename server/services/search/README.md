# 검색 서비스
사용자 위치에 따른 스터디 그룹 검색 서비스

## 응답
```
{
  id,
  days: [],
  startTime: ,
  endTime: ,
  location: {
    lat
    lon
  },
  max_personnel,
  now_personnel,
  min_personnel,
  title,
  subtitle,
  thumbnail,
  tags: []
}
```
## Query
| No. |      From   | Query | To | Description |
| :-: | :----------: | :---: | :-: | :---------: |
|  1  |`ApiGateway` |  `searchAllStudyGroupWithCategory` |
|  2  |`ApiGateway` | `tagStudyGroup` |
|  3  |`ApiGateway` | `tagStudyGroupWithCategory` |
|  4  |`ApiGateway` | `searchAllStudyGroup` |
|  5  |`ApiGateway` | `searchStudyGroup` |
|  6  |`ApiGateway` | `searchStudyGroupWithCategory` |
|  7  |`studygroup`| `bulkStudyGroups` |

### 1.1 searchAllStudyGroupWithCategory
- Params
```
{ category :String, lat : String, lon: String, isRecruit:String }
```

### 1.2 tagStudyGroup
- Params
```
{ tags :String, lat :String, lon:String, isRecruit:String }
```
### 1.3 tagStudyGroupWithCategory (아직 미구현)
- Params
```
{}
```

### 1.4 searchAllStudyGroup
- Params
```
{ lat:String, lon:String, isRecruit:String }
```

### 1.5 searchStudyGroup
- Params
```
{ searchWord:String, lat:String, lon:String, isRecruit:String }
```


### 1.6 searchStudyGroupWithCategory
- Params
```
{ searchWord:String, category:String, lat:String, lon:String, isRecruit:String }
```


### 1.7 bulkStudyGroups
- Params
```
[group]
```


