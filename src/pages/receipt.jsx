import Layout from "../components/Layout";
import Icons from "../utils/Icons";
import Header from "../components/header";
import "../styles/pages/_reciept.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Header heading='E-Ticket' />

      <Layout>
        <section
          className={`modal ${showModal ? "modal--visible" : "modal--hidden"}`}
        >
          <div className='modal__content'>
            <div className='modal__icon'>
              <Icons.download size={44} aria-label='shield icon' />
            </div>
            <div className='modal__body'>
              <h2 className='modal__title'>Your ticket has been downloaded</h2>
              <p className='modal__text'>
                Adele is a Scottish heiress whose extremely wealthy family owns
                estates and grounds. When she was a teenager. Read More
              </p>
            </div>
            <NavLink to='/' className='modal__cta'>
              Back To Home
            </NavLink>
          </div>
        </section>

        <section className='receipt' aria-labelledby='receipt-instructions'>
          <header className='receipt__header'>
            <h2 id='receipt-instructions' className='receipt__title'>
              Instruction
            </h2>
            <p className='receipt__text'>
              Come to the cinema, show and scan the barcode to the space
              provided. Continue to comply with health protocols.
            </p>
          </header>

          <div className='receipt__card'>
            <div className='receipt__info'>
              <div className='receipt__row'>
                <span>Film: Shang-Chi</span>
                <span className='receipt__eticket'>e-ticket</span>
              </div>

              <div className='receipt__grid'>
                <div>
                  <p className='receipt__label'>Date</p>
                  <p className='receipt__value'>06/09/2021</p>
                </div>
                <div>
                  <p className='receipt__label'>Seats</p>
                  <p className='receipt__value'>C4, C5</p>
                </div>
                <div>
                  <p className='receipt__label'>Location</p>
                  <p className='receipt__value'>Viva Cinema</p>
                </div>
                <div>
                  <p className='receipt__label'>Time</p>
                  <p className='receipt__value'>01.00 PM</p>
                </div>
                <div>
                  <p className='receipt__label'>Payment</p>
                  <p className='receipt__value'>Successful</p>
                </div>
                <div>
                  <p className='receipt__label'>Order</p>
                  <p className='receipt__value'>1904566</p>
                </div>
              </div>
            </div>

            <div className='receipt__barcode'>
              <div className='dot1'></div>
              <div className='dot2'></div>
              <img src='/Barcode.png' alt='Barcode' />
            </div>
          </div>

          <button onClick={handleDownloadClick} className='receipt__download'>
            Download E-Ticket
          </button>
        </section>
      </Layout>
    </>
  );
}
