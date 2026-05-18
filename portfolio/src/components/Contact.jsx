import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = ({ data }) => {
  const contactData = data.contact;
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

    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.message) {
        setStatus("error");
        setErrorMessage("Por favor completa todos los campos.");
        return;
      }

      if (!formData.email.includes("@")) {
        setStatus("error");
        setErrorMessage("Por favor ingresa un correo válido.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">{contactData.title}</h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold tracking-tight mb-6">
                {contactData.subtitle}
              </h3>

              <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                  <FiMail
                    size={20}
                    className="text-gray-600 group-hover:text-white"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-900 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                  <FiPhone size={20} className="text-gray-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <a
                    href={`https://wa.me/549${contactData.phone}?text=Hola%20vi%20tu%20portfolio%20y%20quiero%20contactarme%20con%20vos`}
                    target="_blank"
                    className="text-gray-900 hover:text-[var(--color-accent)] transition-colors"
                  >
                    +54 {contactData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 apple-card group hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                  <FiMapPin size={20} className="text-gray-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="text-gray-900">{contactData.location}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)]"
              >
                {status === "sending" ? (
                  contactData.sending
                ) : (
                  <>
                    {contactData.button}
                    <FiSend size={18} />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm text-center animate-fade-in">
                  {contactData.success}
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center animate-fade-in">
                  {errorMessage || contactData.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
