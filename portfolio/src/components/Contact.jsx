import { useState, useRef } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import FadeInSection from "./FadeInSection";

const Contact = ({ data }) => {
  const contactData = data.contact;
  const formRef = useRef(); // Referencia al formulario

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,      
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,     
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY      
      );

      if (result.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setErrorMessage(contactData.error || "Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container-custom">
        <FadeInSection>
          <h2 className="section-title">{contactData.title}</h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <FadeInSection direction="left">
                  <h3 className="text-2xl font-semibold tracking-tight mb-6">
                    {contactData.subtitle}
                  </h3>

                  <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                      <FiMail size={20} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${contactData.email}`} className="text-gray-900 hover:text-accent transition-colors">
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all mt-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                      <FiPhone size={20} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <a href={`https://wa.me/549${contactData.phone}?text=Hola%20vi%20tu%20portfolio%20y%20quiero%20contactarme%20con%20vos`} target="_blank" className="text-gray-900 hover:text-accent transition-colors">
                        +54 {contactData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all mt-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                      <FiMapPin size={20} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ubicación</p>
                      <p className="text-gray-900">{contactData.location}</p>
                    </div>
                  </div>
                </FadeInSection>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <FadeInSection direction="right">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {contactData.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                      {contactData.mail}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                      {contactData.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed bg-accent hover:bg-accent-dark"
                  >
                    {status === "sending" ? contactData.sending : (
                      <>
                        {contactData.button}
                        <FiSend size={18} />
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <div className="p-3 mt-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm text-center animate-fade-in">
                      {contactData.success}
                    </div>
                  )}
                  {status === "error" && (
                    <div className="p-3 mt-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center animate-fade-in">
                      {errorMessage}
                    </div>
                  )}
                </FadeInSection>
              </form>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;