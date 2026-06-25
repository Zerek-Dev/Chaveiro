import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { firebaseConfig } from "@/lib/firebase-config";

/**
 * Obtém ou inicializa a instância do app Firebase (singleton).
 * @returns Instância FirebaseApp já configurada para o projeto site-chaveiro.
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

/**
 * Retorna o cliente Firestore associado ao app Firebase.
 * @returns Instância Firestore para leitura e escrita de dados.
 */
export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

/**
 * Retorna o serviço Firebase Authentication.
 * @returns Instância Auth para login do painel administrativo.
 */
export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
