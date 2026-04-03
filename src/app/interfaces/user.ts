export interface UserAddress {
  address: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: UserAddress;
  image: string;
}
