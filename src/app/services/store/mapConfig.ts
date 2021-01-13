import {
  Environment,
  Geocoder,
  GoogleMap,
  GoogleMaps,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  HtmlInfoWindow,
  ILatLng,
  LocationService,
  Marker,
  MarkerCluster,
  MarkerClusterIcon,
  MarkerClusterOptions,
  MarkerIcon,
  MarkerLabel,
  MyLocation
} from '@ionic-native/google-maps';

export const markerNewHtmlInfo = `
<style>
.marker-info-wrapper{
  text-align:center;
  width:150px;
}
.marker-info-wrapper button{
  padding: 6px 8px;
  border-radius:3px;
  background:#3171e0;
  color:white;
}
.marker-info-wrapper div{
  margin-bottom:4px;
}
</style>
<div class="marker-info-wrapper">
<div><strong>New love location!</strong></div>
<div>🍆 Well done ;) 🍆</div>
<div><button>Save location</button></div>
</div>
`;

export const markerViewHtmlInfo = `
<style>
.marker-info-wrapper{
  text-align:center;
  width:150px;
}
.marker-info-wrapper button{
  padding: 6px 8px;
  border-radius:3px;
  background:#3171e0;
  color:white;
}
.marker-info-wrapper div{
  margin-bottom:4px;
}
</style>
<div class="marker-info-wrapper">
<div><strong>Love location!</strong></div>
<div><button>View Details</button></div>
</div>
`;

const markerIconUrl = 'assets/icon/markerIcon.png';
const markerIconPinkUrl = 'assets/icon/markerIconPink.png';
const markerIconMagentagUrl = 'assets/icon/markerIconMagenta.png';

let iconConfig = (icon): MarkerIcon => {
  return {
    url: icon,
    size: { width: 30, height: 30 }
  };
};

export const iconNew = iconConfig(markerIconUrl);
export const iconExisting = iconConfig(markerIconMagentagUrl);

//MARKER CLUSTER
let labelOptions: MarkerLabel = {
  bold: false,
  fontSize: 15,
  color: 'white'
};
export const clusterIcons: MarkerClusterIcon[] = [
  {
    min: 2,
    max: 100,
    url: 'assets/icon/markerCluster/mBlue.png',
    anchor: { x: 16, y: 16 },
    label: labelOptions
  },
  {
    min: 100,
    max: 1000,
    url: 'assets/icon/markerCluster/mYellow.png',
    anchor: { x: 16, y: 16 },
    label: labelOptions
  },
  {
    min: 1000,
    max: 2000,
    url: 'assets/icon/markerCluster/mRed.png',
    anchor: { x: 24, y: 24 },
    label: labelOptions
  },
  {
    min: 2000,
    url: 'assets/icon/markerCluster/mMagenta.png',
    anchor: { x: 32, y: 32 },
    label: labelOptions
  }
];
