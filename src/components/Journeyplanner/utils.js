import { STATIONS } from "../../utils/globalConst.js";

export class GeoPositioner {
    async getGeopositions (field) {
        try {
            const pos = await this.#getCurrentPositionAsync()
            const { latitude, longitude } = pos.coords
            return this.#findClosestStation(latitude, longitude)
        } catch (err) {
            console.error(err)
            throw new Error("Error with searching for station", err);
        }
    }

    #getDistance (lat1, lon1, lat2, lon2) {
        const R = 6371
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    #findClosestStation (userLat, userLon) {
        let closest = null;
        let minDistance = Infinity;
    
        for (const station of STATIONS) {
          const distance = this.#getDistance(userLat, userLon, station.lat, station.lon);
          if (distance < minDistance) {
            minDistance = distance;
            closest = station;
          }
        }
    
        return { ...closest, distance: minDistance };
    }

    #getCurrentPositionAsync () {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }
}