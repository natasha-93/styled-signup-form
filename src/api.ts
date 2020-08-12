import { FormData } from "./models/FormData";

type Response = Promise<{ message: string }>;

export const submitForm = (data: FormData): Response => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: "Thank you for joining!" });
    }, 3000);
  });
};
