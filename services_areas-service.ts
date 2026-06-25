import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import { buildDefaultServiceAreas } from "@/lib/site-defaults";
import type { City, Neighborhood, ServiceArea } from "@/types/site";

/**
 * Lista cidades ativas ordenadas para exibição pública.
 * @returns Cidades com id do Firestore.
 */
export async function fetchActiveCities(): Promise<City[]> {
  const citiesQuery = query(
    collection(getDb(), "cities"),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(citiesQuery);
  return snapshot.docs.map((cityDoc) => ({
    id: cityDoc.id,
    ...(cityDoc.data() as Omit<City, "id">),
  }));
}

/**
 * Lista todas as cidades (painel admin).
 * @returns Todas as cidades ordenadas por order.
 */
export async function fetchAllCities(): Promise<City[]> {
  const citiesQuery = query(
    collection(getDb(), "cities"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(citiesQuery);
  return snapshot.docs.map((cityDoc) => ({
    id: cityDoc.id,
    ...(cityDoc.data() as Omit<City, "id">),
  }));
}

/**
 * Lista bairros ativos de uma cidade.
 * @param cityId - ID do documento na coleção cities.
 * @returns Bairros ativos ordenados.
 */
export async function fetchActiveNeighborhoods(cityId: string): Promise<Neighborhood[]> {
  const neighborhoodsQuery = query(
    collection(getDb(), "neighborhoods"),
    where("cityId", "==", cityId),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(neighborhoodsQuery);
  return snapshot.docs.map((neighborhoodDoc) => ({
    id: neighborhoodDoc.id,
    ...(neighborhoodDoc.data() as Omit<Neighborhood, "id">),
  }));
}

/**
 * Lista todos os bairros de uma cidade (painel admin).
 * @param cityId - ID da cidade.
 * @returns Bairros ordenados por order.
 */
export async function fetchAllNeighborhoods(cityId: string): Promise<Neighborhood[]> {
  const neighborhoodsQuery = query(
    collection(getDb(), "neighborhoods"),
    where("cityId", "==", cityId),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(neighborhoodsQuery);
  return snapshot.docs.map((neighborhoodDoc) => ({
    id: neighborhoodDoc.id,
    ...(neighborhoodDoc.data() as Omit<Neighborhood, "id">),
  }));
}

/**
 * Lista todos os bairros de todas as cidades (painel admin).
 * @returns Bairros ordenados por order.
 */
export async function fetchAllNeighborhoodsAll(): Promise<Neighborhood[]> {
  const neighborhoodsQuery = query(
    collection(getDb(), "neighborhoods"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(neighborhoodsQuery);
  return snapshot.docs.map((neighborhoodDoc) => ({
    id: neighborhoodDoc.id,
    ...(neighborhoodDoc.data() as Omit<Neighborhood, "id">),
  }));
}

/**
 * Monta zonas de atuação agrupando cidades e bairros do Firestore.
 * @returns ServiceArea[] ou fallback estático se não houver dados.
 */
export async function fetchServiceAreas(): Promise<ServiceArea[]> {
  const cities = await fetchActiveCities();
  if (cities.length === 0) {
    return buildDefaultServiceAreas();
  }
  const areas: ServiceArea[] = [];
  for (const city of cities) {
    const neighborhoods = await fetchActiveNeighborhoods(city.id);
    areas.push({
      id: city.id,
      name: city.name,
      neighborhoods: neighborhoods.map((item) => item.name),
    });
  }
  return areas;
}

/**
 * Cria uma nova cidade no Firestore.
 * @param city - Dados sem id.
 * @returns ID do documento criado.
 */
export async function addCity(city: Omit<City, "id">): Promise<string> {
  const docRef = await addDoc(collection(getDb(), "cities"), city);
  return docRef.id;
}

/**
 * Atualiza uma cidade existente.
 * @param cityId - ID do documento.
 * @param city - Campos a atualizar.
 */
export async function updateCity(
  cityId: string,
  city: Omit<City, "id">
): Promise<void> {
  await updateDoc(doc(getDb(), "cities", cityId), { ...city });
}

/**
 * Remove uma cidade e todos os bairros associados.
 * @param cityId - ID do documento da cidade.
 */
export async function removeCityWithNeighborhoods(cityId: string): Promise<void> {
  const neighborhoods = await fetchAllNeighborhoods(cityId);
  await Promise.all(neighborhoods.map((neighborhood) => removeNeighborhood(neighborhood.id)));
  await removeCity(cityId);
}

/**
 * Remove uma cidade do Firestore.
 * @param cityId - ID do documento.
 */
export async function removeCity(cityId: string): Promise<void> {
  await deleteDoc(doc(getDb(), "cities", cityId));
}

/**
 * Cria um bairro associado a uma cidade.
 * @param neighborhood - Dados sem id.
 * @returns ID do documento criado.
 */
export async function addNeighborhood(
  neighborhood: Omit<Neighborhood, "id">
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), "neighborhoods"), neighborhood);
  return docRef.id;
}

/**
 * Atualiza um bairro existente.
 * @param neighborhoodId - ID do documento.
 * @param neighborhood - Campos a atualizar.
 */
export async function updateNeighborhood(
  neighborhoodId: string,
  neighborhood: Omit<Neighborhood, "id">
): Promise<void> {
  await updateDoc(doc(getDb(), "neighborhoods", neighborhoodId), {
    ...neighborhood,
  });
}

/**
 * Remove um bairro do Firestore.
 * @param neighborhoodId - ID do documento.
 */
export async function removeNeighborhood(neighborhoodId: string): Promise<void> {
  await deleteDoc(doc(getDb(), "neighborhoods", neighborhoodId));
}
