import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./ContactStyle.css";
import AOS from "aos"; /* for animation  aos package*/
import "aos/dist/aos.css";

function ContactUs() {
  /* for animation part */
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);

  return (
    <>
      <div className="App mt-16">
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
          <form
          // onSubmit={onSubmitHandler}
          >
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                First Name *
              </label>
              <input
                className="form-control"
                name="firstname"
                // onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Last Name *
              </label>
              <input
                className="form-control"
                name="username"
                // onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                className="form-control"
                name="email"
                // onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                className="form-control"
                name="phonenumber"
                // onChange={onChangeHandler}
                // value={formData.phonenumber}
              />
            </div>

            <div className="form-group">
              <label htmlFor="yourmassage" className="form-label">
                Your Massage *
              </label>
              <input
                className="form-controll"
                name="yourmassage"
                // onChange={onChangeHandler}
              />
            </div>

            <button className="button button1">
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
