import Image from "next/image";
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import { Color } from "@constants/color";
import Event from "@interfaces/event";

export default function EventCard({event}: {event: Partial<Event>}) {
    const {title, image, localization, notes} = event;
    return (
        <article>
            {
                image && (
                    <div>
                        <img src={image.path} alt={image.name} />
                    </div>
                )
            }
            <p>{title}</p>
            {
                localization && (
                    <div>
                        <PinDropRoundedIcon htmlColor={Color.BLACK}/>
                        <p>{localization.address}, {localization.zipCode} {localization.city}</p>
                    </div>
                )
            }
        </article>
    );
}