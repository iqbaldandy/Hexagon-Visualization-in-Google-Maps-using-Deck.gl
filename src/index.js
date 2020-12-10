import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';


const sourceData = './italy-cvd19(1).json';

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Longitude, d.Latitude],
    getFillColor: d => d.TotalPositiveCases > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const { TotalPositiveCases, ProvinceName } = object;
          el.innerHTML = `<h1>Total Positive Cases ${TotalPositiveCases}, ${ProvinceName} Province </h1>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },
  });

const heatmap = () => new HeatmapLayer({
    id: 'heat',
    data: sourceData,
    getPosition: d => [d.Longitude, d.Latitude],
    getWeight: d => d.TotalPositiveCases,
    radiusPixels: 60,
});

const hexagon = () => new HexagonLayer({
    id: 'hex',
    data: sourceData,
    getPosition: d => [d.Longitude, d.Latitude],
    getElevationWeight: d => d.TotalPositiveCases,
    elevationScale: 100,
    extruded: true,
    radius: 1609,         
    opacity: 0.6,        
    coverage: 0.88,
    lowerPercentile: 50
});

  window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.902782, lng: 12.496366},
        zoom: 5,
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot(),
            heatmap(),
            hexagon()
        ],
    });

    overlay.setMap(map);
    
}