import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Icons from "../utils/Icons";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    localStorage.setItem("paymentInfo", JSON.stringify(data));
    console.log("Payment submitted:", data);
    setShowModal(true);
  };

  const restrictToNumbers = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleCardInput = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const mainPart = input
      .slice(0, 12)
      .replace(/(.{4})/g, "$1 ")
      .trim();
    const lastChunk = input.slice(12);
    const formatted = lastChunk ? `${mainPart} ${lastChunk}` : mainPart;
    setValue("cardnumber", formatted);
  };

  return (
    <>
      <section
        className={`modal ${showModal ? "modal--visible" : "modal--hidden"}`}
      >
        <div className='modal__content'>
          <div className='modal__icon'>
            <Icons.shield size={44} aria-label='shield icon' />
          </div>
          <div className='modal__body'>
            <h2 className='modal__title'>Your payment was successful</h2>
            <p className='modal__text'>
              Adele is a Scottish heiress whose extremely wealthy family owns
              estates and grounds. When she was a teenager. Read More
            </p>
          </div>
          <NavLink to='/receipt' className='modal__cta'>
            See E-Ticket
          </NavLink>
        </div>
      </section>

      <form
        className='payment-form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className='form-group'>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            placeholder='Milesmorales@gmail.com'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <small className='error'>{errors.email.message}</small>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='cardholder'>Cardholder Name</label>
          <input
            type='text'
            id='cardholder'
            placeholder='Miles Morales'
            {...register("cardholder", {
              required: "Cardholder name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name can only contain letters and spaces",
              },
            })}
          />
          {errors.cardholder && (
            <small className='error'>{errors.cardholder.message}</small>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='cardnumber'>Card Number</label>
          <input
            type='text'
            id='cardnumber'
            placeholder='**** **** **** 51446'
            inputMode='numeric'
            maxLength={16}
            onKeyPress={restrictToNumbers}
            onChange={handleCardInput}
            {...register("cardnumber", {
              required: "Card number is required",
              pattern: {
                value: /^[0-9\s]+$/,
                message: "Card number must contain digits only",
              },
            })}
          />
          {errors.cardnumber && (
            <small className='error'>{errors.cardnumber.message}</small>
          )}
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='expiry'>Date</label>
            <select
              id='expiry'
              {...register("expiry", { required: "Expiry date is required" })}
            >
              <option value=''>Select a date</option>
              <option>02 Nov 2021</option>
            </select>
            {errors.expiry && (
              <small className='error'>{errors.expiry.message}</small>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='cvv'>CVV</label>
            <input
              type='text'
              id='cvv'
              placeholder='123'
              maxLength={3}
              inputMode='numeric'
              onKeyPress={restrictToNumbers}
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: "Enter a valid 3-digit CVV",
                },
              })}
            />
            {errors.cvv && (
              <small className='error'>{errors.cvv.message}</small>
            )}
          </div>
        </div>

        <button type='submit' className='pay-button'>
          <span>Pay Now</span>
          <span>|</span>
          <span>$99.8</span>
        </button>
      </form>
    </>
  );
}
