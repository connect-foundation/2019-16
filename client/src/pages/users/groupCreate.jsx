import React, { useCallback, useReducer, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import resizeImage from "../../lib/imageResize";
import { isProperGroupDataFormat } from "../../lib/utils";

import { REQUEST_URL } from "../../config.json";
import Category from "../../components/users/groupCreate/Category";
import ImageUploader from "../../components/users/groupCreate/ImageUploader";
import TagInput from "../../components/users/groupCreate/TagInput";
import ScheduleInput from "../../components/users/groupCreate/ScheduleInput";
import RangeSlider from "../../components/users/common/RangeSlider";
import { UserContext } from "./index";
import {
  groupCreateReducer,
  initialState,
  input_content,
  change_personnel,
  category_click,
  click_day,
  change_hour,
  change_during,
  add_tag,
  attach_image,
  set_location
} from "../../reducer/users/groupCreate";
import useAxios from "../../lib/useAxios.jsx";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledGroupCreate = styled.div`
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

const GroupCreate = ({ history }) => {
  const { userInfo } = useContext(UserContext);
  const { request } = useAxios(apiAxios);
  const [locationString, setLocationString] = useState("");
  const { userId } = userInfo;

  const [state, dispatch] = useReducer(groupCreateReducer, initialState);
  const { primaryCategories, secondaryCategories, daysInfo } = state;
  const { category, tags, title, subtitle, intro } = state.data;

  const onCategoryClick = useCallback((categoryType, categoryName) => {
    dispatch(category_click(categoryType, categoryName));
  }, []);

  const onChangeContent = useCallback(e => {
    const contentType = e.target.name;
    const description = e.target.value;

    dispatch(input_content(contentType, description));
  }, []);

  const onDayDispatch = useCallback(
    i => e => {
      e.target.blur();
      dispatch(click_day(i));
    },
    []
  );
  const onAttachImage = useCallback(file => dispatch(attach_image(file)), []);
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

  const onChangeSlider = useCallback((min, max) => {
    dispatch(change_personnel(min, max));
  }, []);

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
      const imageName = image && image.name;

      data.leader = userId;
      data.endTime = data.startTime + data.during;
      data.endTime = data.endTime > 24 ? data.endTime - 24 : data.endTime;

      let validationObj = {};
      if (!(validationObj = isProperGroupDataFormat(data)).isProper)
        return alert(validationObj.reason);

      data.days.sort((a, b) => a - b);

      const resizedImage = image && (await resizeImage(image, 272));

      image && form.append("image", resizedImage, imageName);
      delete data.during;
      delete data.thumbnail;

      form.append("data", JSON.stringify(data));

      request("post", "/studygroup/register", {
        data: form,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(({ status, id }) => {
          if (status === 400) return alert("요청 데이터가 잘못됨");
          if (status === 200) history.push(`/group/detail/${id}`);
        })
        .catch(err => {
          alert("서버 에러 발생");
          console.error(err);
        });
    },
    [state, userId]
  );

  return (
    <StyledGroupCreate>
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
        <ImageUploader onAttachImage={onAttachImage} />
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
        onDayDispatch={onDayDispatch}
        onTimeDispatch={onTimeDispatch}
        onChangeDuring={onChangeDuring}
      />

      <RangeSlider
        minRange={1}
        maxRange={10}
        step={1}
        onChangeSlider={onChangeSlider}
      />
      <button type="submit" className="button" onClick={onSubmit}>
        {" "}
        등록하기{" "}
      </button>
    </StyledGroupCreate>
  );
};

export default GroupCreate;
