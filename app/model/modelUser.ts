interface users {
  id: number
  name: string;
  username: string;
  email: string;
  descripcion: string;
  precio: string;
  kilometraje: number;
  phone: string;
  website: string;
  address: address;
  company: company;
}

interface address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
}

interface geo {
  lat: string;
  lng: string;
}

interface company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type { users };
