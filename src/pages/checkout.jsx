import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header";
import PaymentForm from "../components/paymentForm";
import "../styles/pages/_checkout.scss";

export default function Checkout() {
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: document.querySelector(".payment-methods"),
        threshold: 0.6,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header heading={"Checkout"} />
      <Layout>
        <section className='payment-method-section'>
          <div className='payment-wrapper'>
            <h2 className='payment-title'>Payment Method</h2>

            <div className='payment-methods'>
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`card ${activeIndex === index ? "active" : ""}`}
                >
                  <div className='card__top'>
                    <img
                      src='/card-background.png'
                      alt='card-wedges'
                      className='card-background'
                    />
                    <img
                      src={
                        index === 0
                          ? "/mastercard-logo.svg"
                          : "/PayPal-logo.webp"
                      }
                      alt={index === 0 ? "Mastercard logo" : "PayPal logo"}
                      className={`card__logo ${index === 1 ? "paypal" : ""}`}
                    />
                    <p className='card__balance-label'>Balance</p>
                    <p className='card__balance-amount'>
                      {index === 0 ? "$120,580.00" : "$240,000.00"}
                    </p>
                  </div>

                  <div className='card__bottom'>
                    <div className='card__holder'>
                      <p className='card__holder-label'>Card Holder</p>
                      <strong className='card__holder-name'>
                        Miles Morales
                      </strong>
                    </div>
                    <div className='card__number'>
                      <span className='card__number-masked'>
                        **** **** ****
                      </span>
                      <span className='card__number-last'>51446</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='payment-details-section'>
          <div className='payment-details-wrapper'>
            <h2 className='payment-details-title'>Payment Details</h2>
            <PaymentForm />
          </div>
        </section>
      </Layout>
    </>
  );
}
