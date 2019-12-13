import React from "react";
import ListCard from "./ListCard";
const StudyRoomList = ({ data }) => {
  let itemCount = 65;
  return (
    <div>
      <ul>
        {data.map(room => {
          return (
            <li>
              <ListCard data={room} index={itemCount++}></ListCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default StudyRoomList;
