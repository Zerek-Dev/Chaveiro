import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDb, getFirebaseAuth } from "@/lib/firebase/client";

/**
 * Autentica administrador com email e palavra-passe.
 * @param email - Email do utilizador Firebase Auth.
 * @param password - Palavra-passe.
 * @returns Credencial do utilizador autenticado.
 */
export async function loginAdmin(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email.trim(),
    password
  );
  return credential.user;
}

/**
 * Termina a sessão do administrador.
 */
export async function logoutAdmin(): Promise<void> {
  await signOut(getFirebaseAuth());
}

/**
 * Verifica se o UID pertence à coleção admins.
 * @param uid - UID do utilizador autenticado.
 * @returns true se existir documento em admins/{uid}.
 */
export async function isCurrentUserAdmin(uid: string): Promise<boolean> {
  const adminRef = doc(getDb(), "admins", uid);
  const snapshot = await getDoc(adminRef);
  return snapshot.exists();
}

/**
 * Regista callback para mudanças de autenticação.
 * @param callback - Função chamada quando o estado de auth muda.
 * @returns Função para cancelar a subscrição.
 */
export function onAdminAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
