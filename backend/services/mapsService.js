import axios from 'axios';

class MapsService {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api';
  }

  /**
   * Get optimized pickup route
   * @param {Array<{latitude: number, longitude: number, items?: any}>} pickupLocations 
   * @returns {Promise<{optimizedRoute: any, waypointOrder: number[], distance: number, duration: number}>}
   */
  async getOptimizedPickupRoute(pickupLocations) {
    const waypoints = pickupLocations.map(loc => 
      `${loc.latitude},${loc.longitude}`
    ).join('|');

    try {
      const { data } = await axios.get(`${this.baseUrl}/directions/json`, {
        params: {
          origin: `${pickupLocations[0].latitude},${pickupLocations[0].longitude}`,
          destination: `${pickupLocations[pickupLocations.length-1].latitude},${pickupLocations[pickupLocations.length-1].longitude}`,
          waypoints: `optimize:true|${waypoints}`,
          key: this.apiKey
        }
      });

      return {
        optimizedRoute: data.routes[0],
        waypointOrder: data.waypoint_order,
        distance: data.routes[0].legs.reduce((sum, leg) => sum + leg.distance.value, 0),
        duration: data.routes[0].legs.reduce((sum, leg) => sum + leg.duration.value, 0)
      };
    } catch (error) {
      console.error('Maps API error:', error.response?.data || error.message);
      throw new Error('Failed to optimize pickup route');
    }
  }

  /**
   * Generate map embed URL
   * @param {Array<{latitude: number, longitude: number}>} locations 
   * @returns {string} Google Maps embed URL
   */
  generateEmbedMap(locations) {
    const markers = locations.map((loc, i) => 
      `&markers=color:red%7Clabel:${i+1}%7C${loc.latitude},${loc.longitude}`
    ).join('');

    return `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=${locations[0].latitude},${locations[0].longitude}&zoom=12${markers}`;
  }
}

// Singleton instance
const mapsService = new MapsService();
export default mapsService;
