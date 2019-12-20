/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useReducer,
  useContext,
  useEffect,
  useState
} from "react";
import styled from "styled-components";
import axios from "axios";
import { REQUEST_URL } from "../../config.json";
import useAxios from "../../lib/useAxios";
import imageResize from "../../lib/imageResize";
import { isURL, isProperGroupDataFormat } from "../../lib/utils";

import Category from "../../components/users/groupCreate/Category";
import ImageUploader from "../../components/users/groupCreate/ImageUploader";
import TagInput from "../../components/users/groupCreate/TagInput";
import ScheduleInput from "../../components/users/groupCreate/ScheduleInput";
import RangeSlider from "../../components/users/common/RangeSlider";
import { UserContext } from "./index";
import {
  groupUpdateReducer,
  initialState,
  input_content,
  change_personnel,
  category_click,
  change_hour,
  click_day,
  change_during,
  add_tag,
  set_initial_data,
  attach_image,
  set_location
} from "../../reducer/users/groupUpdate";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledGroupUpdate = styled.div`
  width: 60%;
  margin: 2rem auto;

  .categories {
    height: 5rem;
  }

  .category {
    cursor: pointer;
  }

  & > * {
    margin: 0.9rem 0.6rem;
  }

  .introduction {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1.8rem;

    .textarea {
      flex: 1;
      min-width: 0rem;
      margin-left: 2rem;
      height: auto;
    }
  }

  .button:focus {
    background-color: white;
  }

  .location-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 2rem;
    }
  }
`;

const GroupUpdate = ({ match, history }) => {
  const { userInfo } = useContext(UserContext);
  const { request } = useAxios(apiAxios);
  const [locationString, setLocationString] = useState("");
  const { userId } = userInfo;
  const { id } = match.params;

  const [state, dispatch] = useReducer(groupUpdateReducer, initialState);
  const { primaryCategories, secondaryCategories, daysInfo } = state;

  const { category, tags, title, subtitle, intro } = state.data;

  const onAttachImage = useCallback(file => dispatch(attach_image(file)), []);
  const onChangeContent = useCallback(e => {
    const contentType = e.target.name;
    const description = e.target.value;

    dispatch(input_content(contentType, description));
  }, []);

  const onChangeSlider = useCallback((min, max) => {
    dispatch(change_personnel(min, max));
  }, []);

  const onCategoryClick = useCallback((categoryType, categoryName) => {
    dispatch(category_click(categoryType, categoryName));
  }, []);

  const onDayDispatch = useCallback(
    i => e => {
      e.target.blur();
      dispatch(click_day(i));
    },
    []
  );

  const onChangeTagInput = useCallback(tagArr => {
    dispatch(add_tag(tagArr));
  }, []);

  const onTimeDispatch = useCallback(
    (TimeSlot, StartTime) => e => {
      const timeSlot = TimeSlot.current.value;
      const selectedStartTime = Number.parseInt(StartTime.current.value, 10);
      const resultStartTime = selectedStartTime + (timeSlot === "pm" ? 12 : 0);

      dispatch(change_hour(resultStartTime));
    },
    []
  );

  const onChangeDuring = useCallback(e => {
    const during = +e.target.value;
    dispatch(change_during(during));
  });

  const onSetLocation = useCallback(() => {
    const { daum, kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    let address;
    const oncomplete = data => {
      address = data.address;
      setLocationString(address);
    };
    const onclose = state => {
      if (state === "FORCE_CLOSE") {
        alert("필수 입력 사항입니다. 다시 로그인 해주세요");
        window.location.reload();
      } else if (state === "COMPLETE_CLOSE") {
        geocoder.addressSearch(address, (locationResult, locationStatus) => {
          // 여기로 위치 값이 들어옴
          const lat = +locationResult[0].y;
          const lon = +locationResult[0].x;

          dispatch(set_location(lat, lon));
        });
      }
    };

    alert("주소를 입력 해주세요");
    new daum.Postcode({ oncomplete, onclose }).open();
  }, []);

  const onSubmit = useCallback(
    async e => {
      const { data } = state;
      const form = new FormData();
      const image = data.thumbnail;

      data.leader = userId;
      data.location = userInfo.userLocation;
      data.endTime = data.startTime + data.during;
      data.endTime = data.endTime > 24 ? data.endTime - 24 : data.endTime;

      let validationObj = {};
      if (!(validationObj = isProperGroupDataFormat(data)).isProper)
        return alert(validationObj.reason);

      data.days.sort((a, b) => a - b);

      if (!isURL(image)) {
        const imageName = image.name;
        const resizedImage = await imageResize(image, 272, imageName);
        delete data.thumbnail;
        form.append("image", resizedImage, ".jpeg");
      }

      delete data.during;
      form.append("data", JSON.stringify(data));

      request("put", "/studygroup/detail", {
        data: form,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(data => {
          const { id, status, reason } = data;
          if (status === 400) return alert(reason);
          if (status === 200) history.push(`/group/detail/${id}`);
        })
        .catch(err => {
          alert("에러 발생");
          console.error(err);
        });
    },
    [state, userId]
  );

  useEffect(() => {
    request("get", `/studygroup/detail/${id}`)
      .then(({ detailInfo, status }) => {
        if (!detailInfo.isRecruiting) {
          alert("마감(예약) 상태에서 그룹 정보를 수정할 수 없습니다.");
          history.push(`/group/detail/${id}`);
        }
        if (status === 200) {
          dispatch(set_initial_data(detailInfo));
          const { kakao } = window;
          const geocoder = new kakao.maps.services.Geocoder();
          const { lat, lon } = detailInfo.location;
          const coords = new kakao.maps.LatLng(lat, lon);
          geocoder.coord2RegionCode(
            coords.getLng(),
            coords.getLat(),
            displayCenterInfo
          );
          function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
              for (var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === "H") {
                  setLocationString(result[i].address_name);
                  break;
                }
              }
            }
          }
        }
      })
      .catch(err => {
        console.error(err);
        alert("요청 에러");
      });
  }, []);

  return (
    <StyledGroupUpdate>
      <div className="is-centered categories">
        <Category
          categories={primaryCategories}
          categoryType="primary"
          onCategoryClick={onCategoryClick}
        />

        {category[0] && (
          <Category
            categories={secondaryCategories[category[0]]}
            categoryType="secondary"
            onCategoryClick={onCategoryClick}
          />
        )}
      </div>

      <input
        className="input"
        name="title"
        placeholder="title"
        onChange={onChangeContent}
        value={title}
      />

      <input
        className="input"
        name="subtitle"
        placeholder="subtitle"
        onChange={onChangeContent}
        value={subtitle}
      />

      <div className="introduction">
        <ImageUploader
          thumbnail={state.data.thumbnail}
          onAttachImage={onAttachImage}
        />
        <textarea
          className="textarea"
          name="intro"
          onChange={onChangeContent}
          value={intro}
          placeholder="그룹 소개"
        ></textarea>
      </div>

      <div className="location-block">
        <button className="button" onClick={onSetLocation}>
          위치 설정
        </button>
        <span>
          {locationString
            ? locationString
            : "스터디를 진행할 위치를 선택해주세요"}
        </span>
      </div>
      <TagInput tags={tags} onChangeTagInput={onChangeTagInput} />

      <ScheduleInput
        daysInfo={daysInfo}
        startTime={state.data.startTime}
        during={state.data.during}
        onTimeDispatch={onTimeDispatch}
        onDayDispatch={onDayDispatch}
        onChangeDuring={onChangeDuring}
      />

      <RangeSlider
        minRange={1}
        maxRange={10}
        step={1}
        min_personnel={state.data.min_personnel}
        max_personnel={state.data.max_personnel}
        onChangeSlider={onChangeSlider}
      />
      <button type="submit" className="button" onClick={onSubmit}>
        {" "}
        수정하기{" "}
      </button>
    </StyledGroupUpdate>
  );
};

export default GroupUpdate;
