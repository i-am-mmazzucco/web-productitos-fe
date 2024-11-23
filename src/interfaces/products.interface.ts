import { IPrice } from "./prices.interface";
import { IStore } from "./stores.interface";

export interface IProduct {
  imageUrl: string
  name: string;
  prices: IPrice[]
  stores: IStore[]
  timestamp: string;
  _id: string;
}