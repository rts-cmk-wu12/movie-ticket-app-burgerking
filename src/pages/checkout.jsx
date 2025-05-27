import Layout from "../components/Layout";
import Header from "../components/header";
import "../styles/pages/_checkout.scss";

export default function Checkout() {
  return (
    <>
      <Header heading={"Checkout"} />
      <Layout>
        <section className='payment-method-section'>
          <div className='payment-wrapper'>
            <h2 className='payment-title'>Payment Method</h2>

            <div className='card'>
              <div className='card__top'>
                <img
                  src='/card-background.png'
                  alt='card-wedges'
                  className='card-background'
                />
                <img
                  src='/mastercard-logo.svg'
                  alt='Mastercard logo'
                  className='card__logo'
                />
                <p className='card__balance-label'>Balance</p>
                <p className='card__balance-amount'>$120,580.00</p>
              </div>

              <div className='card__bottom'>
                <div className='card__holder'>
                  <p className='card__holder-label'>Card Holder</p>
                  <strong className='card__holder-name'>Miles Morales</strong>
                </div>
                <div className='card__number'>
                  <span className='card__number-masked'>**** **** ****</span>
                  <span className='card__number-last'>51446</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='payment-details-section'>
          <div className='payment-details-wrapper'>
            <h2 className='payment-details-title'>Payment Details</h2>

            <form className='payment-form'>
              <div className='form-group'>
                <label htmlFor='email'>Your Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Milesmorales@gmail.com'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='cardholder'>Cardholder Name</label>
                <input
                  type='text'
                  id='cardholder'
                  name='cardholder'
                  placeholder='Miles Morales'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='cardnumber'>Card Number</label>
                <input
                  type='text'
                  id='cardnumber'
                  name='cardnumber'
                  placeholder='**** **** **** 51446'
                />
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='expiry'>Date</label>
                  <select id='expiry' name='expiry'>
                    <option>02 Nov 2021</option>
                    {/* Add real dates here */}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='cvv'>CVV</label>
                  <input type='text' id='cvv' name='cvv' placeholder='123' />
                </div>
              </div>

              <button type='submit' className='pay-button'>
                <span>Pay Now</span>
                <span>|</span>
                <span>$99.8</span>
              </button>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}
