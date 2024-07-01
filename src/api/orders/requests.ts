import { BrokerEndpoints } from "../endpoints";
import { useFetch } from "../queryClient";
import { Order } from "./types";

export const getAllOrders = () => {
  return useFetch<Order[]>({
    endpoint: BrokerEndpoints.getAllOrders,
    service: "BROKER",
  });
};
