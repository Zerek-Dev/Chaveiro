"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";
import {
  fetchAllCities,
  fetchAllNeighborhoodsAll,
  addCity,
  updateCity,
  removeCityWithNeighborhoods,
  addNeighborhood,
  updateNeighborhood,
  removeNeighborhood,
} from "@/services/areas-service";
import { AdminAlert } from "@/components/admin/admin-alerts";
import type { City, Neighborhood } from "@/types/site";

/**
 * Agrupa bairros por cidade para exibição no painel.
 * @param neighborhoods - Lista completa de bairros.
 * @returns Mapa cityId → bairros ordenados.
 */
function groupNeighborhoodsByCity(
  neighborhoods: Neighborhood[]
): Record<string, Neighborhood[]> {
  const grouped: Record<string, Neighborhood[]> = {};
  neighborhoods.forEach((neighborhood) => {
    if (!grouped[neighborhood.cityId]) {
      grouped[neighborhood.cityId] = [];
    }
    grouped[neighborhood.cityId].push(neighborhood);
  });
  return grouped;
}

/**
 * Painel de gestão de cidades e bairros com hierarquia visual (cidade → bairros).
 */
export function AreasPanel() {
  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [newCityName, setNewCityName] = useState<string>("");
  const [neighborhoodInputs, setNeighborhoodInputs] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const neighborhoodsByCity = useMemo(
    () => groupNeighborhoodsByCity(neighborhoods),
    [neighborhoods]
  );
  /**
   * Recarrega cidades e bairros do Firestore.
   */
  async function loadAreas(): Promise<void> {
    setIsLoading(true);
    try {
      const [loadedCities, loadedNeighborhoods] = await Promise.all([
        fetchAllCities(),
        fetchAllNeighborhoodsAll(),
      ]);
      setCities(loadedCities);
      setNeighborhoods(loadedNeighborhoods);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadAreas();
  }, []);
  /**
   * Adiciona nova cidade à lista de zonas de atuação.
   */
  async function handleAddCity(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const name: string = newCityName.trim();
    if (!name) {
      return;
    }
    try {
      const nextOrder: number = cities.length + 1;
      await addCity({ name, order: nextOrder, active: true });
      setNewCityName("");
      await loadAreas();
      setAlert({ message: `Cidade "${name}" adicionada. Agora adicione os bairros abaixo.`, type: "success" });
    } catch {
      setAlert({ message: "Erro ao adicionar cidade.", type: "error" });
    }
  }
  /**
   * Adiciona bairro à cidade indicada.
   * @param cityId - ID da cidade no Firestore.
   */
  async function handleAddNeighborhood(cityId: string): Promise<void> {
    const name: string = (neighborhoodInputs[cityId] ?? "").trim();
    if (!name || !cityId) {
      return;
    }
    try {
      const cityNeighborhoods: Neighborhood[] = neighborhoodsByCity[cityId] ?? [];
      const nextOrder: number = cityNeighborhoods.length + 1;
      await addNeighborhood({
        cityId,
        name,
        order: nextOrder,
        active: true,
      });
      setNeighborhoodInputs((previous) => ({ ...previous, [cityId]: "" }));
      await loadAreas();
      setAlert({ message: "Bairro adicionado.", type: "success" });
    } catch {
      setAlert({ message: "Erro ao adicionar bairro.", type: "error" });
    }
  }
  /**
   * Alterna estado activo de uma cidade.
   * @param city - Cidade a actualizar.
   */
  async function toggleCityActive(city: City): Promise<void> {
    await updateCity(city.id, {
      name: city.name,
      order: city.order,
      active: !city.active,
    });
    await loadAreas();
  }
  /**
   * Alterna estado activo de um bairro.
   * @param neighborhood - Bairro a actualizar.
   */
  async function toggleNeighborhoodActive(neighborhood: Neighborhood): Promise<void> {
    await updateNeighborhood(neighborhood.id, {
      cityId: neighborhood.cityId,
      name: neighborhood.name,
      order: neighborhood.order,
      active: !neighborhood.active,
    });
    await loadAreas();
  }
  /**
   * Remove cidade e todos os bairros associados.
   * @param city - Cidade a remover.
   */
  async function handleRemoveCity(city: City): Promise<void> {
    const cityNeighborhoods: Neighborhood[] = neighborhoodsByCity[city.id] ?? [];
    const confirmMessage: string =
      cityNeighborhoods.length > 0
        ? `Remover "${city.name}" e os ${cityNeighborhoods.length} bairro(s) associados?`
        : `Remover a cidade "${city.name}"?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }
    try {
      await removeCityWithNeighborhoods(city.id);
      await loadAreas();
      setAlert({ message: "Cidade removida.", type: "success" });
    } catch {
      setAlert({ message: "Erro ao remover cidade.", type: "error" });
    }
  }
  /**
   * Remove um bairro após confirmação.
   * @param neighborhood - Bairro a remover.
   */
  async function handleRemoveNeighborhood(neighborhood: Neighborhood): Promise<void> {
    if (!window.confirm(`Remover o bairro "${neighborhood.name}"?`)) {
      return;
    }
    await removeNeighborhood(neighborhood.id);
    await loadAreas();
  }
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">A carregar zonas...</p>;
  }
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Adicione cada <strong className="text-foreground">cidade</strong> e, dentro dela, os{" "}
          <strong className="text-foreground">bairros</strong> que cobre. No site público, o
          visitante verá algo como: <em>Lisboa → Benfica · Alvalade · Parque das Nações</em>.
        </p>
      </div>
      {alert && (
        <AdminAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleAddCity} className="flex flex-wrap gap-2">
        <input
          value={newCityName}
          onChange={(event) => setNewCityName(event.target.value)}
          placeholder="Nova cidade (ex.: Lisboa)"
          className="min-w-[220px] flex-1 rounded-md border border-border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" />
          Adicionar cidade
        </button>
      </form>
      {cities.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma cidade registada. Adicione a primeira cidade acima.
        </p>
      )}
      <div className="grid gap-4">
        {cities.map((city) => {
          const cityNeighborhoods: Neighborhood[] = neighborhoodsByCity[city.id] ?? [];
          const activeNeighborhoods: Neighborhood[] = cityNeighborhoods.filter(
            (item) => item.active
          );
          return (
            <section
              key={city.id}
              className={`rounded-xl border p-5 ${
                city.active
                  ? "border-border bg-card"
                  : "border-border/50 bg-muted/20 opacity-75"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-accent">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{city.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeNeighborhoods.length > 0
                        ? `${activeNeighborhoods.length} bairro(s) activo(s)`
                        : "Sem bairros — aparece só o nome da cidade"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCityActive(city)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs font-medium"
                  >
                    {city.active ? "Activa" : "Inactiva"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCity(city)}
                    className="inline-flex items-center gap-1 rounded-md border border-red-300 px-3 py-1.5 text-xs text-red-700"
                  >
                    <Trash2 className="size-3.5" />
                    Remover
                  </button>
                </div>
              </div>
              {cityNeighborhoods.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cityNeighborhoods.map((neighborhood) => (
                    <li
                      key={neighborhood.id}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                        neighborhood.active
                          ? "border-border bg-secondary text-foreground"
                          : "border-border/40 bg-muted/30 text-muted-foreground line-through"
                      }`}
                    >
                      <span>{neighborhood.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleNeighborhoodActive(neighborhood)}
                        className="rounded px-1 text-[10px] uppercase tracking-wide opacity-70 hover:opacity-100"
                        title={neighborhood.active ? "Desactivar" : "Activar"}
                      >
                        {neighborhood.active ? "Activo" : "Inactivo"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveNeighborhood(neighborhood)}
                        className="rounded px-1 text-red-600 hover:bg-red-50"
                        title="Remover bairro"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <input
                  value={neighborhoodInputs[city.id] ?? ""}
                  onChange={(event) =>
                    setNeighborhoodInputs((previous) => ({
                      ...previous,
                      [city.id]: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddNeighborhood(city.id);
                    }
                  }}
                  placeholder={`Bairro em ${city.name} (ex.: Benfica)`}
                  className="min-w-[200px] flex-1 rounded-md border border-border px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleAddNeighborhood(city.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium"
                >
                  <Plus className="size-4" />
                  Adicionar bairro
                </button>
              </div>
            </section>
          );
        })}
      </div>
      {cities.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Pré-visualização no site: cada cartão mostra a cidade em destaque e os bairros como
          etiquetas por baixo.
        </p>
      )}
    </div>
  );
}
