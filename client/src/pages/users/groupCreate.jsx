import React, { useCallback, useReducer, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
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
  change_during
} from "../../reducer/users/groupCreate";

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
`;

const GroupCreate = () => {
  const { userInfo } = useContext(UserContext);
  const { userEmail } = userInfo;

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

  const onSubmit = useCallback(
    e => {
      const { data } = state;
      const form = new FormData();

      data.leader = userEmail;
      data.location = { lat: 41.12, lon: -50.34 };
      data.endTime = data.startTime + data.during;
      data.endTime = data.endTime > 24 ? data.endTime - 24 : data.endTime;

      let validationObj = {};
      if (!(validationObj = validation(data)).isProper)
        return alert(validationObj.reason);

      form.append("image", data.thumbnail);
      delete data.during;
      delete data.thumbnail;

      form.append("data", JSON.stringify(data));

      axios
        .post(`${REQUEST_URL}/api/studygroup/register`, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          const { status } = data;
          if (status === 400) return alert(data.reason);
          window.location.href = "/";
        })
        .catch(e => {
          console.error(e);
          alert("에러 발생");
        });
    },
    [state, userEmail]
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
        <ImageUploader dispatch={dispatch} />
        <textarea
          className="textarea"
          name="intro"
          onChange={onChangeContent}
          value={intro}
          placeholder="그룹 소개"
        ></textarea>
      </div>

      <TagInput tags={tags} dispatch={dispatch} />

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

const validation = data => {
  if (data.category.length !== 2 || data.category.some(v => v === null))
    return { isProper: false, reason: "카테고리 두 개를 선택해주세요" };
  if (!data.title) return { isProper: false, reason: "제목을 입력해주세요" };
  if (!data.subtitle)
    return { isProper: false, reason: "부제목을 입력해주세요" };
  if (!data.days.length)
    return { isProper: false, reason: "스터디 요일을 선택해주세요" };
  if (!data.leader) return { isProper: false, reason: "잘못된 접근입니다." };
  if (!data.location || Object.values(data.location).length !== 2)
    return { isProper: false, reason: "위치를 선택해주세요" };
  return { isProper: true };
};

export default GroupCreate;
