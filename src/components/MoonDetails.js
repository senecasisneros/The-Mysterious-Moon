import React from "react";
import moment from "moment";
import lodash from "lodash";

const MoonDetails = ( {moon, phase, place, date} ) => {
  const { transitISO, riseISO, setISO} = moon;
  const { name, angle, illum, age } = phase;
  const { dateTimeISO } = date;
  let city = place.name
  _.capitalize(city)
  const { state } = place

  let transit = moment(transitISO).format('LT');
  let rise = moment(riseISO).format('LT');
  let set = moment(setISO).format('LT');
  let dateTime = moment(dateTimeISO).format('lll');

  return (
    <div className="container">
      <div className="row">
        <div className="details col-md-4">
          <img width="375" height="375" src={`https://s3.amazonaws.com/lunarlove/waxing crescent.jpg`}/>
        </div>
        <div className="currentDetails col-md-4">
          <p>{_.startCase(_.camelCase(city))}, {_.capitalize(state)}</p>
          <p>{ dateTime }</p>
          <p>Phase: {_.startCase(_.camelCase(name))}</p>
          <p>Moon Age: {age} days</p>
          <p>Illumination: { illum }%</p>
          <p>Moon Angle: { angle }</p>
          <p>Moonrise: { rise }</p>
          <p>Moonset: { set }</p>
          <p>Moon Transit: { transit }</p>
        </div>
      </div>
    </div>
  );
}

export default MoonDetails;
