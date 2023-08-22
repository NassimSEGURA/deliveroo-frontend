import { useState } from "react";

const Items = ({ meal, handleCart }) => {
  const [isInCart, setIsInCart] = useState(false);

  const addToCart = () => {
    handleCart({
      id: meal.id,
      title: meal.title,
      price: meal.price,
      quantity: 1,
    });

    setIsInCart(true);
  };

  return (
    <div
      className={`cardWrapper ${isInCart ? "inCart" : ""}`}
      onClick={() => {
        if (isInCart) {
          handleCart({
            id: meal.id,
            title: meal.title,
            price: meal.price,
            quantity: meal.quantity + 1, // Increment quantity
          });
        } else {
          addToCart();
        }
      }}
    >
      <div className="cardInnerWrapper">
        <div className="leftCard">
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <div className="leftCardInfos">
            <span className="mealPrice">{meal.price}</span>
            {meal.popular && (
              <span className="mealPopular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8000"
                  className="feather feather-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Populaire
              </span>
            )}
          </div>
        </div>
        <div className="rightCard">
          {meal.picture && <img src={meal.picture} alt={meal.title} />}
        </div>
      </div>
    </div>
  );
};

export default Items;
