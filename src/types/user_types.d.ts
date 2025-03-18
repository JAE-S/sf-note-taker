export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;

  birthdate: Date;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  location: {
    city: string;
    postcode: number;
    state: string;
    street: string;
  };
  phone_number: string;
  title: string;
  username: string;
}
