import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./ContactStyle.css";
import AOS from "aos"; /* for animation  aos package*/
import "aos/dist/aos.css";
import axios from "axios";

function ContactUs() {

  const [guestMsg, setGuestMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    subject:"",
    message:"",
  })

  const onChangeHandler = (e) =>{
    setGuestMsg({...guestMsg, [e.target.name] : e.target.value});
  }
  /* for animation part */
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    await axios.post(`${import.meta.env.VITE_SERVER}/api/mainHome/contact/guestMessage`, guestMsg, {withCredentials: true})
    .then(res =>{
      console.log("success");
      window.location.reload();
  })
  .catch(err =>{
      console.log(err);
  })
  }

  return (
    <>
      <div className="App mt-0">
        <div data-aos="fade-left" className="Topic">
          <h1>Contact Us</h1>
        </div>

        <div className="wrapper">
          <div className="typing-demo">
            {"Leave Us a Massage & We Will Respond you at our Earliest!"}
          </div>
        </div>

        <div className="Thank">
          <h1>
            Thank you for visiting us and taking the time to connect with us.
            Your message will be sent to the relevant team member, who will get
            back to you as soon as they can. However, weekends and public
            holidays might delay the response time, and we hope you will bear
            with us
          </h1>
        </div>

        <div className="TopicC flex">
          <h1>Your information</h1>
          <div className="pl-2">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </div>
        <div className="container">
          <form onSubmit={onSubmitHandler} >
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name *
              </label>
              <input
                className="form-control"
                name="firstName"
                onChange={onChangeHandler} 
                value={guestMsg.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name *
              </label>
              <input
                className="form-control"
                name="lastName"
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                className="form-control"
                name="email"
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                className="form-control"
                name="phoneNumber"
                onChange={onChangeHandler}
                // value={formData.phonenumber}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject *
              </label>
              <input
                className="form-control"
                name="subject"
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Massage *
              </label>
              <input
                className="form-controll"
                name="message"
                onChange={onChangeHandler}
              />
            </div>

            <button className="button button1" type="submit">
              Send Message
              <div className="icon">
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
