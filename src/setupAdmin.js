import { ref, set } from "firebase/database";
import { db } from "./Firebase";

export const setupAdminCredentials = async () => {
  try {
    await set(ref(db, 'Admin'), {
      email: 'admin@gmail.com',
      password: '123456'
    });
    console.log('Admin credentials set successfully');
  } catch (error) {
    console.error('Error setting admin credentials:', error);
  }
}; 