import Items from "./Items";
import { useState, useEffect } from "react";

const Menuitems = ({ categories }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  let delivery = 2.5;
  let total = subTotal + delivery;

  const handleCart = (meal) => {
    const updatedCart = [...cart];
    let found = false;

    updatedCart.forEach((article) => {
      if (article.id === meal.id) {
        article.quantity++;
        found = true;
      }
    });

    if (!found) {
      meal.quantity = 1;
      updatedCart.push(meal);
    }

    setCart(updatedCart);
    recalculateTotals(updatedCart);
  };

  const decreaseQuantity = (mealId) => {
    const updatedCart = cart
      .map((article) => {
        if (article.id === mealId) {
          if (article.quantity > 1) {
            return { ...article, quantity: article.quantity - 1 };
          } else {
            return null; // Remove the article with quantity 1
          }
        }
        return article;
      })
      .filter(Boolean); // Remove null values from the array

    setCart(updatedCart);
    recalculateTotals(updatedCart);
  };

  const recalculateTotals = (updatedCart) => {
    const newSubTotal = updatedCart.reduce((total, article) => {
      return total + article.price * article.quantity;
    }, 0);

    setSubTotal(newSubTotal);
  };

  const increaseQuantity = (mealId) => {
    const updatedCart = cart.map((article) => {
      if (article.id === mealId) {
        return { ...article, quantity: article.quantity + 1 };
      }
      return article;
    });

    setCart(updatedCart);
    recalculateTotals(updatedCart);
  };

  useEffect(() => {
    cart.map((article) => {
      setSubTotal(subTotal + article.price * article.quantity);
    });
  }, [cart]);

  return (
    <>
      <div className="menu">
        {categories.map((category) => {
          if (category.meals.length > 0) {
            return (
              <div key={category.name} className="menuitems">
                <h2>{category.name}</h2>
                <div className="cardsWrapper">
                  {category.meals.map((meal) => (
                    <Items key={meal.id} handleCart={handleCart} meal={meal} />
                  ))}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="Cart">
        <div className="Cart--card">
          <button
            className={
              cart.length === 0
                ? "Cart--validate Cart--disabled"
                : "Cart--validate"
            }
          >
            <fontsninja-text
              id="fontsninja-text-378"
              className="fontsninja-family-variant_arial_700_normal"
            >
              Valider mon panier
            </fontsninja-text>
          </button>
          <div
            className={
              cart.length === 0 ? "displayNone" : "Cart-minus-cart-container"
            }
          >
            <div className="Cart--items">
              {cart.map((article) => (
                <div key={article.id} className="Cart--line">
                  <div className="Cart--counter">
                    <span onClick={() => decreaseQuantity(article.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus-circle"
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "rgb(0, 206, 189)",
                          cursor: "pointer",
                        }}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </span>
                    <span>{article.quantity}</span>
                    <span onClick={() => increaseQuantity(article.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus-circle"
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "rgb(0, 206, 189)",
                          cursor: "pointer",
                        }}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </span>
                  </div>
                  <span className="Cart--item-name">{article.title}</span>
                  <span className="Cart--amount">
                    {`${(article.price * article.quantity).toFixed(2)} €`}
                  </span>
                  {/* <span className="Cart--amount">{article.quantity}</span> */}
                </div>
              ))}
            </div>
            <div className="Cart--results">
              <div className="Cart--result-line">
                <span className="Cart--result-name">Sous-total</span>
                <span className="Cart--amount">{`${subTotal.toFixed(
                  2
                )} €`}</span>
              </div>
              <div className="Cart--result-line">
                <span className="Cart--result-name">Frais de livraison</span>
                <span>{`${delivery} €`}</span>
              </div>
            </div>
            <div className="Cart--total">
              <span className="Cart--result-name">Total</span>
              <span className="Cart--amount">{`${total.toFixed(2)} €`}</span>
            </div>
          </div>
          <div className={cart.length === 0 ? "Cart--empty" : "displayNone"}>
            <fontsninja-text
              id="fontsninja-text-379"
              className="fontsninja-family-variant_system-ui_400_normal"
            >
              Votre panier est vide
            </fontsninja-text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menuitems;
