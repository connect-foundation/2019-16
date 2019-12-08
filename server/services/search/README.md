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
|  1  | |  `searchAllStudyGroupWithCategory` |
|  2  | | `tagStudyGroup` |
|  3  | | `tagStudyGroupWithCategory` |
|  4  | | `searchAllStudyGroup` |
|  5  | | `searchStudyGroup` |
|  6  | | `searchStudyGroupWithCategory` |
|  7  | | `bulkStudyGroups` |

### 1.1 searchAllStudyGroupWithCategory
- Params
```
{ category, lat, lon, isRecruit }
```

### 1.2 tagStudyGroup
- Params
```
{ tags, lat, lon, isRecruit }
```
### 1.3 tagStudyGroupWithCategory
- Params
```
```

### 1.4 searchAllStudyGroup
- Params
```
{ lat, lon, isRecruit }
```

### 1.5 searchStudyGroup
- Params
```
{ searchWord, lat, lon, isRecruit }
```


### 1.6 searchStudyGroupWithCategory
- Params
```
{ searchWord, category, lat, lon, isRecruit }
```


### 1.7 bulkStudyGroups
- Params
```
[group]
```


