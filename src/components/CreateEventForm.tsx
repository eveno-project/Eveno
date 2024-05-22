"use client";

import { createEvent } from "@common/actions/Events";
import { useState } from "react";

const CreateEventForm = () => {
    const today = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [linkTicketing, setLinkTicketing] = useState("");
    const [adult, setAdult] = useState(false);
    const [publishAt, setPublishAt] = useState(today);
    const [address, setAdresse] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [regionName, setRegionName] = useState("");
    const [error, setError] = useState("");

    const handleChangeTitle = (event: any) => {
        setTitle(event.target.value);
    };
    const handleChangeDescription = (event: any) => {
        setDescription(event.target.value);
    };
    const handleChangeLinkTicketing = (event: any) => {
        setLinkTicketing(event.target.value);
    };
    const handleChangeAdult = (event: any) => {
        setAdult(event.target.checked);
    };
    const handlePublishAt = (event: any) => {
        setPublishAt(event.target.value);
    };
    const handleAdresse = (event: any) => {
        setAdresse(event.target.value);
    };
    const handleCity = (event: any) => {
        setCity(event.target.value);
    };
    const handleZipCode = (event: any) => {
        setZipCode(event.target.value);
    };
    const handleRegionName = (event: any) => {
        setRegionName(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (address != '' && city != '' && zipCode != '' && regionName != '') {
            if (!/^\d{5}$/.test(zipCode)) {
                setError("Le code postal doit contenir exactement 5 chiffres.");
                return;
            }
            if (address == '' || city == '' || zipCode == '' || regionName == '') {
                setError("L'adresse n'est pas complète.");
                return;
            }
        }
        try {
            const response = await createEvent(title, description, linkTicketing, adult, new Date(publishAt), address, city, parseInt(zipCode, 10), regionName);
            console.log(response);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section className="create-event-form">
            <h2>Créer un évènement</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre:</label>
                    <input type="text" id="title" value={title} onChange={handleChangeTitle} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={handleChangeDescription} required />
                </div>
                <div className="form-group">
                    <label htmlFor="linkTicketing">Lien billeterie :</label>
                    <input type="text" id="linkTicketing" value={linkTicketing} onChange={handleChangeLinkTicketing} />
                </div>
                <div className="form-group">
                    <label htmlFor="adult">Contenu adulte ?</label>
                    <input type="checkbox" id="adult" checked={adult} onChange={handleChangeAdult} />
                </div>
                <div className="form-group">
                    <label htmlFor="publishAt">Publication pour le :</label>
                    <input type="date" id="publishAt" value={publishAt} onChange={handlePublishAt} min={today} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adresse :</label>
                    <input type="text" id="address" value={address} onChange={handleAdresse} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ville :</label>
                    <input type="text" id="city" value={city} onChange={handleCity} />
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">Code postal :</label>
                    <input type="number" id="zipCode" value={zipCode} onChange={handleZipCode} pattern="^\d{5}$" />
                </div>
                <div className="form-group">
                    <label htmlFor="regionName">Region :</label>
                    <input type="text" id="regionName" value={regionName} onChange={handleRegionName} />
                </div>
                <button type="submit">Créer un évènement</button>
            </form>
        </section>
    );
};

export default CreateEventForm;
