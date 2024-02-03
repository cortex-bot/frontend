import { BrokerEndpoints } from "../endpoints";
import { useGet } from "../queryClient";
import { Order } from "./types";

export const getAllOrders = () => {
  return useGet<Order[]>({
    endpoint: BrokerEndpoints.getAllOrders,
    service: "BROKER",
  });
};
