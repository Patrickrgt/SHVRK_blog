import React from "react";
import { Spring } from "react-spring/renderprops";

export default function PublishedAt(props) {
  const { rawDate } = props;

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let longDate = new Date(rawDate);
  let day = longDate.getDate();
  let monthIndex = longDate.getMonth();
  let year = longDate.getFullYear();

  const formatDate = months[monthIndex] + " " + day + " " + year;
  console.log(formatDate);

  return (
    <div>
      {rawDate != undefined ? (
        <article style={props}>
          <h3 className="post-date">{formatDate}</h3>{" "}
        </article>
      ) : (
        <div></div>
      )}
    </div>
  );
}
