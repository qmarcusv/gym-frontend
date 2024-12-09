export type User = {
  uuid?: string;
  name?: string;
  email?: string;
  password?: string;
  roles?: string; // This could also be an array if a user has multiple roles
  //   roles: string[]; // Array of roles
};
