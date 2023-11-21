export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    token: string;
    data: {
      email: string;
      id: number;
      name: string;
    };
  };