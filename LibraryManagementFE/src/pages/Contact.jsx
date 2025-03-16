import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContextStore";

export const Contact = () => {
  const initialUserForm = { name: "", email: "", message: "" };
  const [contact, setContact] = useState(initialUserForm);
  const { user, api } = useAuth();

  // Set user data on mount if available
  useEffect(() => {
    if (user) {
      setContact({ name: user.name, email: user.email, message: "" });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("api/contact", contact);
      console.log("Response data", data);
      toast.success("Message sent successfully!");
      setContact(initialUserForm); //
    } catch (error) {
      console.error("Contact error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send contact message."
      );
    }
  };

  return (
    <div className="container contact-container">
      <div className="contact-grid">
        <div className="contact-left-img">
          <img src="/support.png" alt="Registration image" />
        </div>

        <div className="contact-left-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={contact.name}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={contact.email}
              onChange={handleInputChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              autoComplete="off"
              value={contact.message}
              onChange={handleInputChange}
              required
              cols="30"
              rows="6"
            ></textarea>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
