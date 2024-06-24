import EventDto from "./event-dto";

export default interface EventLocalizationDto {
    address: string
    city: string
    event?: EventDto
    id: number
    latitude: number
    longitude: number
    regionName: string
    zipCode: number
};