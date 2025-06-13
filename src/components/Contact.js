import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
