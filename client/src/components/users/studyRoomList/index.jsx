import React, { Fragment } from "react";
import { ListCard } from "./ListCard";
import NoRoom from "./NoRoom";

const StudyRoomList = ({ data }) => {
  let itemCount = 65;
  return (
    <Fragment>
      {data.length ? (
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
      ) : (
        <NoRoom />
      )}
    </Fragment>
  );
};
export default StudyRoomList;
