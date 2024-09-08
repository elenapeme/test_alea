import axios from 'axios';

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    'https://reqres.in/api/login',
    {
      email,
      password,
    }
  );
  return response.data;
};
