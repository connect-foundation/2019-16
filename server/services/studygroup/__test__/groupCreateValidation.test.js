function validation(data) {
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
}

describe("Group Creation Input Validation", () => {
  const successData = {
    category: ["면접", "기술면접"],
    leader: "dlatns0201@gmail.com",
    tags: [],
    title: "제목",
    subtitle: "부제목",
    intro: "소개 입력 폼",
    days: [1, 2, 3],
    startTime: 1,
    isRecruiting: true,
    min_personnel: 1,
    now_personnel: 1,
    max_personnel: 10,
    location: { lat: 41.12, lon: -50.34 },
    endTime: 2
  };
  test("normal input", () => {
    const data = { ...successData };
    expect(validation(data)).toEqual({ isProper: true });
  });

  describe("Category Test", () => {
    test("Input have empty category", () => {
      const data = { ...successData };
      data.category = [];
      expect(validation(data)).toEqual({
        isProper: false,
        reason: "카테고리 두 개를 선택해주세요"
      });
    });

    test("Input have one category", () => {
      const data = { ...successData };
      data.category = ["면접"];
      expect(validation(data)).toEqual({
        isProper: false,
        reason: "카테고리 두 개를 선택해주세요"
      });
    });

    test("Input have two category, but one is null", () => {
      const data = { ...successData };
      data.category = [null, "면접"];
      expect(validation(data)).toEqual({
        isProper: false,
        reason: "카테고리 두 개를 선택해주세요"
      });
    });
  });

  test("Input don't have title", () => {
    const data = { ...successData };
    delete data.title;
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "제목을 입력해주세요"
    });
    data.title = "";
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "제목을 입력해주세요"
    });
  });

  test("Input don't have subtitle ", () => {
    const data = { ...successData };
    delete data.subtitle;
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "부제목을 입력해주세요"
    });
    data.subtitle = "";
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "부제목을 입력해주세요"
    });
  });

  test("Input don't have days", () => {
    const data = { ...successData };
    data.days = [];
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "스터디 요일을 선택해주세요"
    });
  });

  test("Input don't have leader email", () => {
    const data = { ...successData };
    delete data.leader;
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "잘못된 접근입니다."
    });
  });

  test("Input don't have location info", () => {
    const data = { ...successData };
    delete data.location;
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "위치를 선택해주세요"
    });
    data.location = {};
    expect(validation(data)).toEqual({
      isProper: false,
      reason: "위치를 선택해주세요"
    });
  });
});
