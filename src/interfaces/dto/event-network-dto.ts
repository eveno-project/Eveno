import EventDto from "./event-dto";
import NetworkDto from "./network-dto";

export default interface EventNetworkDto {
    event?: EventDto
    id: number
    link: string
    network: NetworkDto
}