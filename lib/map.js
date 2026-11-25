const isValidNumber = (value) =>
    value !== null && value !== "" && Number.isFinite(Number(value));

/**
 * Returns only points that can be placed on the map.
 * Rows without coordinates in the DB (e.g. a service with no lat/lng)
 * would make Leaflet throw "Invalid LatLng" and crash the whole page.
 */
export function withValidCoordinates(points) {
    return (points || []).filter(
        (p) => isValidNumber(p?.coordinates?.lat) && isValidNumber(p?.coordinates?.lng)
    );
}
