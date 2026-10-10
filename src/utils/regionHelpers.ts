import { INDONESIA_PROVINCES_DATA, ProvinceData, CityData, DistrictData } from '../data/indonesiaRegions';

export function getAllProvinces(): { id: string; name: string }[] {
  return INDONESIA_PROVINCES_DATA.map((p) => ({ id: p.id, name: p.name }));
}

export function getCitiesByProvince(provinceNameOrId?: string): string[] {
  if (!provinceNameOrId) return [];
  const found = INDONESIA_PROVINCES_DATA.find(
    (p) =>
      p.id.toLowerCase() === provinceNameOrId.toLowerCase() ||
      p.name.toLowerCase() === provinceNameOrId.toLowerCase()
  );
  if (!found) return [];
  return found.cities.map((c) => c.name);
}

export function getDistrictsByCity(provinceNameOrId?: string, cityName?: string): string[] {
  if (!provinceNameOrId || !cityName) return [];
  const foundProv = INDONESIA_PROVINCES_DATA.find(
    (p) =>
      p.id.toLowerCase() === provinceNameOrId.toLowerCase() ||
      p.name.toLowerCase() === provinceNameOrId.toLowerCase()
  );
  if (!foundProv) return [];

  const foundCity = foundProv.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
  if (!foundCity) return [];

  return foundCity.districts.map((d) => d.name);
}

export function getVillagesByDistrict(
  provinceNameOrId?: string,
  cityName?: string,
  districtName?: string
): { villages: string[]; postalCode?: string } {
  if (!provinceNameOrId || !cityName || !districtName) return { villages: [] };
  const foundProv = INDONESIA_PROVINCES_DATA.find(
    (p) =>
      p.id.toLowerCase() === provinceNameOrId.toLowerCase() ||
      p.name.toLowerCase() === provinceNameOrId.toLowerCase()
  );
  if (!foundProv) return { villages: [] };

  const foundCity = foundProv.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
  if (!foundCity) return { villages: [] };

  const foundDistrict = foundCity.districts.find(
    (d) => d.name.toLowerCase() === districtName.toLowerCase()
  );
  if (!foundDistrict) return { villages: [] };

  return {
    villages: foundDistrict.villages,
    postalCode: foundDistrict.postalCode,
  };
}
