import zipCentroids from "./zipCentroids.json";

type ZipCentroids = Record<string, [latitude: number, longitude: number]>;

const centroids = zipCentroids as unknown as ZipCentroids;

export function distanceInKm(origin: string, destination: string): number {
    //[lat1, lon1]: [number, number], [lat2, lon2]: [number, number]): number {
    const [lat1, lon1] = centroids[origin] || [0, 0];
    const [lat2, lon2] = centroids[destination] || [0, 0];
    const radians = (degrees: number) => (degrees * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const latitudeDelta = radians(lat2 - lat1);
    const longitudeDelta = radians(lon2 - lon1);
    const a =
        Math.sin(latitudeDelta / 2) ** 2 +
        Math.cos(radians(lat1)) *
            Math.cos(radians(lat2)) *
            Math.sin(longitudeDelta / 2) ** 2;

    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

//USelss son. 
/*
export function getClosestZipCodes(zip: string, count = 1): { zip: string; distance: number }[] {
    const origin = centroids[zip.trim().padStart(5, "0")];
    if (!origin || count <= 0) return [{ zip: zip.trim().padStart(5, "0"), distance: 0 }];

    return  Object.entries(centroids)
        .map(([candidateZip, coordinates]) => ({
            zip: candidateZip,
            distance: distanceInKm(origin, coordinates),
        }))
        .sort((a, b) => a.distance - b.distance || a.zip.localeCompare(b.zip))
        .slice(0, count)
        .map(({ zip: candidateZip, distance }) => ({ zip: candidateZip, distance }))
    ;
}
*/
