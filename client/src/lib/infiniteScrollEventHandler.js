import axios from "axios";
import { set_additional_groups } from "../reducer/users/index";
import { REQUEST_URL } from "../config.json";
const infiniteScrollEventHandler = (
  lat,
  lon,
  userIndexDispatch,
  scrollStateRef,
  category
) => {
  if (!scrollStateRef.hasOwnProperty("current")) return;
  if (scrollStateRef.current.loading) return;
  if (scrollStateRef.current.isLastItems) return;

  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const scrollTop = Math.max(
    document.documentElement.scrollTop,
    document.body.scrollTop
  );
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight + 200 >= scrollHeight) {
    console.log(scrollStateRef.current);

    scrollStateRef.current = { ...scrollStateRef.current, loading: true };

    let url = `${REQUEST_URL}/api/search/all/location/${lat.current}/${lon.current}/page/${scrollStateRef.current.pageIndex}/true`;
    if (category === String)
      url = `${REQUEST_URL}/api/search/all/category/${category}location/${lat.current}/${lon.current}/page/${scrollStateRef.current.pageIndex}/true`;

    axios.get(url).then(({ data }) => {
      const takenGroups = data;

      const { pageIndex } = scrollStateRef.current;
      const changedScrollState = {
        isLastItems: false,
        pageIndex: pageIndex + 1,
        loading: false
      };

      if (isLastPagenation(takenGroups)) changedScrollState.isLastItems = true;

      userIndexDispatch(set_additional_groups(takenGroups));
      scrollStateRef.current = changedScrollState;
    });
  }
};

export default infiniteScrollEventHandler;

function isLastPagenation(takenGroups) {
  const takenLength = takenGroups.length || 0;
  if (!takenGroups || !takenLength || takenLength < 6) return true;
  return false;
}
