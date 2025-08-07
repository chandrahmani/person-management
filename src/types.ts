import { ReactNode } from "react";


export type ROUTE = {
	name: string
	title: string
	element: ReactNode
	path: string;
	index?: boolean;
}


export type UserProfileType = {
  id: number;
  firstName: string;
  lastName: string;
  role:string;
  maidenName: string;
  age: number;
  gender: string;
  email: string; //'emily.johnson@x.dummyjson.com';
  phone: string; // '+81 965-431-3024'
  username: string;
  password: string;
  birthDate: string; // '1996-5-30'
  image: string;
  bloodGroup: string; // 'O-'
  height: number;
  weight: number;
  discountPercentage:number;
  price: number;
  rating: number;
  description: string;
  eyeColor: string;
};