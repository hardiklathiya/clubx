import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import user from "../../images/user.jpeg";
import Timestamp from "react-timestamp";
export default function Review() {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  let ratingLength = 0;
  product.map((item) => {
    return (ratingLength = item.reviews.filter(function (review) {
      return review.rating;
    }));
  });

  let ratingOneStar = 0,
    ratingTwoStar = 0,
    ratingThreeStar = 0,
    ratingFourStar = 0,
    ratingFiveStar = 0;
  product.map((item) => {
    return item.reviews.map((review) => {
      if (review.rating === 1) {
        ratingOneStar++;
      } else if (review.rating === 2) {
        ratingTwoStar++;
      }
      if (review.rating === 3) {
        ratingThreeStar++;
      }
      if (review.rating === 4) {
        ratingFourStar++;
      }
      if (review.rating === 5) {
        ratingFiveStar++;
      }
    });
  });
  let ratingRatioOneStar = 0,
    ratingRatioTwoStar = 0,
    ratingRatioThreeStar = 0,
    ratingRatioFourStar = 0,
    ratingRatioFiveStar = 0;
  let totalRating;
  product.map((item) => {
    return (totalRating = item.reviews.length);
  });

  ratingRatioOneStar = Math.floor((ratingOneStar / totalRating) * 100);
  ratingRatioTwoStar = Math.floor((ratingTwoStar / totalRating) * 100);
  ratingRatioThreeStar = Math.floor((ratingThreeStar / totalRating) * 100);
  ratingRatioFourStar = Math.floor((ratingFourStar / totalRating) * 100);
  ratingRatioFiveStar = Math.floor((ratingFiveStar / totalRating) * 100);

  const review = [
    {
      star: 1,
      ratingRatio: ratingRatioOneStar,
    },
    {
      star: 2,
      ratingRatio: ratingRatioTwoStar,
    },
    {
      star: 3,
      ratingRatio: ratingRatioThreeStar,
    },
    {
      star: 4,
      ratingRatio: ratingRatioFourStar,
    },
    {
      star: 5,
      ratingRatio: ratingRatioFiveStar,
    },
  ];
  return (
    <div className="review_container">
      <div className="customer_reviews_analysis">
        <h2>Customer reviews</h2>
        <article>
          {product.map((prod) => (
            <Rating
              key={prod._id}
              name="half-rating-read"
              value={prod.ratings}
              precision={0.5}
              readOnly
              className="customer_ratings"
            />
          ))}
          {product.map((prod) => (
            <span key={prod._id}>{prod.ratings.toFixed(1)} out of 5</span>
          ))}
        </article>
        <h6>{ratingLength.length} Global Ratings</h6>

        {totalRating > 0 ? (
          <>
            {review.map((review) => (
              <>
                <div className="rating_chart">
                  <div className="rating_chart_1">{review.star} star</div>
                  <div className="rating_chart_2">
                    <span
                      style={{
                        width: `${review.ratingRatio}%`,
                      }}
                    ></span>
                  </div>
                  <div className="rating_chart_3">{review.ratingRatio}%</div>
                </div>
              </>
            ))}
          </>
        ) : (
          <h2>No Reviews Yet</h2>
        )}
      </div>
      <div className="customer_reviews_container">
        <h2>Top Reviews</h2>
        {totalRating > 0 ? (
          <>
            {product.map((prod) =>
              prod.reviews.map((review) => (
                <div className="customer_review_body" key={prod._id}>
                  <article className="customer_review_body1">
                    <img src={user} alt="" />
                    <h6>{review.name}</h6>
                  </article>
                  <article className="customer_review_body2">
                    <Rating
                      name="half-rating-read"
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      className="customer_ratings"
                    />{" "}
                    <span>
                      <strong>{review.comment}</strong>
                    </span>
                  </article>
                  <article className="customer_review_body3">
                    Reviewd on{" "}
                    <Timestamp relative date={review.createdAt} autoUpdate />
                  </article>
                </div>
              ))
            )}
          </>
        ) : (
          <h2>No Reviews yet</h2>
        )}
      </div>
    </div>
  );
}
