// AlQuran Cloud API integrations

export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface MergedAyah {
  numberInSurah: number;
  globalNumber: number;
  arabicText: string;
  translationText: string;
}

export interface MergedSurahData {
  meta: SurahMeta;
  mergedAyahs: MergedAyah[];
}

// Get all surahs
export async function getSurahs(): Promise<SurahMeta[]> {
  const res = await fetch('https://api.alquran.cloud/v1/surah');
  const json = await res.json();
  return json.data;
}
// Get surah by id in arabic
export async function getArabicSurah(id: number): Promise<SurahData> {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
  const json = await res.json();
  return json.data;
}

// Get surah by id in translation
export async function getTranslationSurah(id: number): Promise<SurahData> {
  // Using Sahih International translation
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/en.sahih`);
  const json = await res.json();
  return json.data;
}

export async function getMergedSurah(id: number): Promise<MergedSurahData> {
  const [arabicData, translationData] = await Promise.all([
    getArabicSurah(id),
    getTranslationSurah(id),
  ]);

  const map = new Map<number, Partial<MergedAyah>>();

  arabicData.ayahs.forEach((ayah) => {
    map.set(ayah.numberInSurah, {
      numberInSurah: ayah.numberInSurah,
      globalNumber: ayah.number,
      arabicText: ayah.text,
    });
  });

  translationData.ayahs.forEach((ayah) => {
    if (map.has(ayah.numberInSurah)) {
      const existing = map.get(ayah.numberInSurah)!;
      existing.translationText = ayah.text;
    }
  });

  const mergedAyahs = Array.from(map.values()) as MergedAyah[];
  // Sort by numberInSurah
  mergedAyahs.sort((a, b) => a.numberInSurah - b.numberInSurah);

  return {
    meta: {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      revelationType: arabicData.revelationType,
      numberOfAyahs: arabicData.numberOfAyahs,
    },
    mergedAyahs,
  };
}
