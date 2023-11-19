import { CreateDeliveryRequestDto } from "src/models/deliveries/dtos";

export const createMockDeliveryRequestDto = (email: string = "dominik.blazic@gmail.com"): CreateDeliveryRequestDto => {
    return {
        deliveryDistanceInKm: 5,
        deliveryDate: "2024-11-19T17:29:41.108Z",
        numberOfPackages: 2,
        firstName: "Dominik",
        lastName: "Blazic",
        email: email,
        phoneNumber: "+385955396860"
    };
  };