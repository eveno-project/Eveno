import EventNetworkDto from "./event-network-dto";

export default interface NetworkDto {
    id: number
    name: string
    eventNetworks: EventNetworkDto[]
}