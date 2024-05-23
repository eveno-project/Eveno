import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import { Color } from "@constants/color";
import Event from "@interfaces/event";

export default function EventCard({ event }: { event: Partial<Event> }) {
    const { title, images, localization, notes } = event;
    return (
        <article>
            {
                images && (
                    <div>
                        <img src={images[0].path} alt={images[0].name} />
                    </div>
                )
            }
            <p>{title}</p>
            {
                localization && (
                    <div>
                        <PinDropRoundedIcon htmlColor={Color.BLACK} />
                        <p>{localization.address}, {localization.zipCode} {localization.city}</p>
                    </div>
                )
            }
        </article>
    );
}