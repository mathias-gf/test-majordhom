import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    civility: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    messageType: "",
    message: "",
    visitDay: "Lundi",
    visitHour: "10h",
    visitMinute: "0m",
    selectedTimes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addVisitTime = () => {
    const { visitDay, visitHour, visitMinute } = formData;
    const newTime = `${visitDay} ${visitHour} ${visitMinute}`;
    setFormData((prev) => ({
      ...prev,
      selectedTimes: [...prev.selectedTimes, newTime],
    }));
  };

  const removeVisitTime = (timeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      selectedTimes: prev.selectedTimes.filter((time) => time !== timeToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:80/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    alert(result.message || "Formulaire envoyé !");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contactez l’agence</h2>
      <div className="section">
        <h4>Vos coordonnées</h4>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="civility"
              value="Mme"
              onChange={handleChange}
            />
            Mme
          </label>
          <label>
            <input
              type="radio"
              name="civility"
              value="M"
              onChange={handleChange}
            />
            M
          </label>
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Nom"
            name="lastName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Prénom"
            name="firstName"
            onChange={handleChange}
          />
        </div>

        <input
          type="email"
          placeholder="Adresse mail"
          name="email"
          onChange={handleChange}
        />
        <input
          type="tel"
          placeholder="Téléphone"
          name="phone"
          onChange={handleChange}
        />
      </div>

      <div className="section">
        <h4>Votre message</h4>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="messageType"
              value="visite"
              onChange={handleChange}
            />
            Demande de visite
          </label>
          <label>
            <input
              type="radio"
              name="messageType"
              value="rappel"
              onChange={handleChange}
            />
            Être rappelé·e
          </label>
          <label>
            <input
              type="radio"
              name="messageType"
              value="photos"
              onChange={handleChange}
            />
            Plus de photos
          </label>
        </div>
        <textarea
          placeholder="Votre message"
          name="message"
          onChange={handleChange}
        />
      </div>

      <div className="section">
        <h4>Disponibilités pour une visite</h4>
        <div>
          <select
            name="visitDay"
            value={formData.visitDay}
            onChange={handleChange}
          >
            <option value="Lundi">Lundi</option>
            <option value="Mardi">Mardi</option>
            <option value="Mercredi">Mercredi</option>
            <option value="Jeudi">Jeudi</option>
            <option value="Vendredi">Vendredi</option>
          </select>

          <select
            name="visitHour"
            value={formData.visitHour}
            onChange={handleChange}
          >
            {Array.from({ length: 9 }, (_, i) => i + 10).map((hour) => (
              <option key={hour} value={`${hour}h`}>
                {hour}h
              </option>
            ))}
          </select>

          <select
            name="visitMinute"
            value={formData.visitMinute}
            onChange={handleChange}
          >
            <option value="0m">0m</option>
            <option value="15m">15m</option>
            <option value="30m">30m</option>
            <option value="45m">45m</option>
          </select>
          <div className="dispo">
            <button type="button" onClick={addVisitTime}>
              Ajouter dispo
            </button>
          </div>
        </div>

        <div>
          {formData.selectedTimes.map((time, index) => (
            <div key={index}>
              {time}
              <button type="button" onClick={() => removeVisitTime(time)}>
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;
