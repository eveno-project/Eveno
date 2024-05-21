"use client";

import { createEvent } from "@common/actions/Events";
import prisma from "@common/utils/db";
import { useState } from "react";

const CreateEventForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [linkTicketing, setLinkTicketing] = useState("");
    const [adult, setAdult] = useState(false);
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await createEvent(title, description, linkTicketing, adult);
            console.log(response);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="connect-user-form">
            <h2>Créer un utilisateur</h2>
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
                <button type="submit">Créer un évènement</button>
            </form>
        </div>
    );
};

export default CreateEventForm;
