import { Decimal } from "@prisma/client/runtime/library";
import { CreateDeliveryRequestDto } from "src/models/deliveries/dtos";

export let createMockDeliveryRequestDto = (
    email: string = "dominik.blazic@gmail.com"): CreateDeliveryRequestDto => {
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

export const mockedDeliveryRequest = {
    id: 1,
    createdAt: new Date("2023-11-19T17:29:41.108Z"),
    deliveryDistance: new Decimal(2),
    deliveryDate: new Date("2023-11-25T17:29:41.108Z"),
    numberOfPackages: 2,
    firstName: "Dominik",
    lastName: "Blazic",
    email: "dominik.blazic@gmail.com",
    phoneNumber: "+385955396860",
    totalPrice: new Decimal(10.5),
  };

export const mockedDeliveryRequestWithWeekendDelivery = {
    id: 2,
    createdAt: new Date("2023-11-19T17:29:41.108Z"),
    deliveryDistance: new Decimal(2),
    deliveryDate: new Date("2023-11-26T17:29:41.108Z"), 
    numberOfPackages: 2,
    firstName: "Dominik",
    lastName: "Blazic",
    email: "dominik.blazic@gmail.com",
    phoneNumber: "+385955396860",
    totalPrice: new Decimal(10.5),
  };