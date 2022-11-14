import { useState, useEffect } from "react";
import BackShadow from "./BackShadow";
import CloseIcon from "@mui/icons-material/Close";
export default function ProductDelivery() {
  const [toggleInfo, setToggleInfo] = useState(false);
  const [toggleDetailInfo, setToggleDetailInfo] = useState(false);
  const toggleDeliveryInfo = () => {
    setToggleInfo(!toggleInfo);
  };
  const toggleDeliveryInstallationInfo = () => {
    setToggleDetailInfo(!toggleDetailInfo);
  };
  let deliveryTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 6);
  //* get a delivery month
  let deliveryMonth;
  if (deliveryTime.getMonth() === 1) {
    deliveryMonth = "jan";
  } else if (deliveryTime.getMonth() === 2) {
    deliveryMonth = "Feb";
  } else if (deliveryTime.getMonth() === 3) {
    deliveryMonth = "Mar";
  } else if (deliveryTime.getMonth() === 4) {
    deliveryMonth = "Apr";
  } else if (deliveryTime.getMonth() === 5) {
    deliveryMonth = "May";
  } else if (deliveryTime.getMonth() === 6) {
    deliveryMonth = "Jun";
  } else if (deliveryTime.getMonth() === 7) {
    deliveryMonth = "Jul";
  } else if (deliveryTime.getMonth() === 8) {
    deliveryMonth = "Aug";
  } else if (deliveryTime.getMonth() === 9) {
    deliveryMonth = "Sep";
  } else if (deliveryTime.getMonth() === 10) {
    deliveryMonth = "Oct";
  } else if (deliveryTime.getMonth() === 11) {
    deliveryMonth = "Nov";
  } else if (deliveryTime.getMonth() === 12) {
    deliveryMonth = "Dec";
  }

  let deliveryDate = deliveryTime.getDate();

  let deliveryDay;
  if (deliveryTime.getDay() === 1) {
    deliveryDay = "Monday";
  } else if (deliveryTime.getDay() === 2) {
    deliveryDay = "Tuesday";
  } else if (deliveryTime.getDay() === 3) {
    deliveryDay = "Wednesday";
  } else if (deliveryTime.getDay() === 4) {
    deliveryDay = "Thursday";
  } else if (deliveryTime.getDay() === 5) {
    deliveryDay = "Friday";
  } else if (deliveryTime.getDay() === 6) {
    deliveryDay = "Saturday";
  } else if (deliveryTime.getDay() === 7) {
    deliveryDay = "Sunday";
  }
  useEffect(() => {
    if (toggleInfo === true) {
      document.body.style.overflowY = "hidden";
    } else if (toggleInfo === false) {
      document.body.style.overflowY = "scroll";
    }
  }, [toggleInfo]);
  return (
    <>
      <article className="delivery_timing_container">
        <h5>
          Delivery by
          <strong>
            {deliveryDate} {deliveryMonth},{deliveryDay}
          </strong>
        </h5>
        <span style={{ fontSize: "10px", color: "#878787" }}>|</span>
        <h6>
          Free <span>₹50</span>
        </h6>
        <span className="question_mark_info" onClick={toggleDeliveryInfo}>
          ?
        </span>
      </article>
      {toggleInfo && (
        <>
          <article className="delivery_price_info_container">
            <CloseIcon
              className="delivery_info_close_icon"
              onClick={() => setToggleInfo(false)}
            />
            <h5>Shipping Charges For Flipkart Assured Items</h5>
            <ul>
              <li>
                Shipping charges are calculated based on the number of units,
                distance and delivery date.
              </li>
              <li>For Plus customers, shipping charges are free.</li>
              <li>
                For non-Plus customers, if the total value of FAssured items is
                more than Rs.500, shipping charges are free. If the total value
                of FAssured items is less than Rs.500, shipping charges = Rs.40
                per unit
              </li>
              <li>
                * For faster delivery, shipping charges will be applicable
              </li>
            </ul>
          </article>
          <BackShadow toggle={toggleDeliveryInfo} isOpen={toggleInfo} />
        </>
      )}
      <span
        className="view_details_price"
        onClick={toggleDeliveryInstallationInfo}
      >
        View Details
      </span>

      {toggleDetailInfo && (
        <>
          <div className="delivery_installation_details_container">
            <CloseIcon
              className="delivery_installation_info_close_icon"
              onClick={() => setToggleDetailInfo(false)}
            />
            <h3>Delivery & Installation details</h3>
            <article className="delivery_timing_container">
              <h5>
                Delivery by
                <strong>
                  {deliveryDate} {deliveryMonth},{deliveryDay}
                </strong>
              </h5>
              <span style={{ fontSize: "10px", color: "#878787" }}>|</span>
              <h6>
                Free <span>₹50</span>
              </h6>
            </article>
            <article className="installation_details">
              <h6>Installation Details</h6>
              <ul>
                <li>This product doesn't require installation</li>
              </ul>
            </article>

            <h5>Shipping Charges For Flipkart Assured Items</h5>
            <ul>
              <li>
                Shipping charges are calculated based on the number of units,
                distance and delivery date.
              </li>
              <li>For Plus customers, shipping charges are free.</li>
              <li>
                For non-Plus customers, if the total value of FAssured items is
                more than Rs.500, shipping charges are free. If the total value
                of FAssured items is less than Rs.500, shipping charges = Rs.40
                per unit
              </li>
              <li>
                * For faster delivery, shipping charges will be applicable
              </li>
            </ul>
          </div>
          <BackShadow
            toggle={toggleDeliveryInstallationInfo}
            isOpen={toggleDetailInfo}
          />
        </>
      )}
    </>
  );
}
