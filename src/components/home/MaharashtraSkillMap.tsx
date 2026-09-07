import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { DistrictData } from '../../types';

const MAP_TRANSLATIONS: Record<SupportedLang, {
  badge: string;
  title: string;
  districtsLive: string;
  subtitle: string;
  searchPlaceholder: string;
  allSectors: string;
  allCentres: string;
  resetMap: string;
  tabOverview: string;
  tabSkills: string;
  tabInstitutes: string;
  tabAction: string;
  demandHigh: string;
  demandMed: string;
  vacancies: string;
}> = {
  en: {
    badge: 'Real-Time Geographic Intelligence Layer',
    title: 'Interactive Maharashtra Skill Map',
    districtsLive: '36 Districts Live',
    subtitle: 'Explore district-level hiring signals, industrial cluster telemetry, and ITI unit expansion needs across all 36 districts.',
    searchPlaceholder: 'Search District (e.g. Pune, Nagpur, Nashik)...',
    allSectors: 'All Sectors',
    allCentres: 'All Training Centres',
    resetMap: 'Reset Map',
    tabOverview: 'District Overview',
    tabSkills: 'MIDC Industrial Clusters',
    tabInstitutes: 'Training Ecosystem',
    tabAction: 'Telemetry & Interventions',
    demandHigh: 'High Demand',
    demandMed: 'Moderate Demand',
    vacancies: 'Open Vacancies'
  },
  mr: {
    badge: 'प्रत्यक्ष भौगोलिक माहिती प्रणाली',
    title: 'महाराष्ट्राचा संवादात्मक कौशल्य नकाशा',
    districtsLive: '३६ जिल्हे थेट',
    subtitle: 'महाराष्ट्रातील ३६ जिल्ह्यांतील औद्योगिक मागणी, भरती संकेत आणि ITI क्षमता पहा.',
    searchPlaceholder: 'जिल्हा शोधा (उदा. पुणे, नागपूर, नाशिक)...',
    allSectors: 'सर्व क्षेत्रे',
    allCentres: 'सर्व प्रशिक्षण केंद्रे',
    resetMap: 'नकाशा रीसेट करा',
    tabOverview: 'जिल्हा आढावा',
    tabSkills: 'MIDC औद्योगिक क्लस्टर',
    tabInstitutes: 'प्रशिक्षण संस्था',
    tabAction: 'टेलिमेट्री व उपाय योजना',
    demandHigh: 'उच्च मागणी',
    demandMed: 'मध्यम मागणी',
    vacancies: 'रिक्त पदे'
  },
  hi: {
    badge: 'वास्तविक समय भौगोलिक इंटेलिजेंस परत',
    title: 'इंटरएक्टिव महाराष्ट्र कौशल मानचित्र',
    districtsLive: '36 जिले लाइव',
    subtitle: 'सभी 36 जिलों में भर्ती संकेतों, औद्योगिक क्लस्टर टेलीमेट्री और ITI इकाइयों का अन्वेषण करें।',
    searchPlaceholder: 'जिला खोजें (जैसे पुणे, नागपुर, नासिक)...',
    allSectors: 'सभी क्षेत्र',
    allCentres: 'सभी प्रशिक्षण केंद्र',
    resetMap: 'मानचित्र रीसेट करें',
    tabOverview: 'जिला अवलोकन',
    tabSkills: 'MIDC औद्योगिक क्लस्टर',
    tabInstitutes: 'प्रशिक्षण तंत्र',
    tabAction: 'टेलीमेट्री एवं उपाय योजना',
    demandHigh: 'उच्च मांग',
    demandMed: 'मध्यम मांग',
    vacancies: 'रिक्तियां'
  }
};
import {
  MapPin,
  Building,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Filter,
  Eye,
  Layers,
  Search,
  Maximize2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Navigation,
  Globe,
  Sun,
  Moon,
  Compass
} from 'lucide-react';

// Geographic Coordinates for Maharashtra Districts (Lat, Lng)
const DISTRICT_GEO_COORDS: Record<string, [number, number]> = {
  pune: [18.5204, 73.8567],
  mumbai: [19.0760, 72.8777],
  nashik: [20.0000, 73.7800],
  nagpur: [21.1458, 79.0882],
  thane: [19.2183, 72.9781],
  'chhatrapati-sambhajinagar': [19.8762, 75.3433],
  kolhapur: [16.7050, 74.2433],
  satara: [17.6805, 74.0183],
  solapur: [17.6599, 75.9064],
  amravati: [20.9374, 77.7796],
  ahmednagar: [19.0948, 74.7480],
  akola: [20.7002, 77.0082],
  beed: [18.9891, 75.7601],
  bhandara: [21.1700, 79.6500],
  buldhana: [20.5288, 76.1842],
  chandrapur: [19.9615, 79.2961],
  dhule: [20.9042, 74.7749],
  gadchiroli: [20.1849, 80.0029],
  gondia: [21.4624, 80.1961],
  hingoli: [19.7176, 77.1472],
  jalgaon: [21.0077, 75.5626],
  jalna: [19.8410, 75.8864],
  latur: [18.4088, 76.5604],
  nanded: [19.1383, 77.3210],
  nandurbar: [21.3713, 74.2409],
  dharashiv: [18.1861, 76.0419],
  parbhani: [19.2608, 76.7748],
  raigad: [18.5158, 73.1822],
  ratnagiri: [16.9902, 73.3120],
  sangli: [16.8524, 74.5815],
  sindhudurg: [16.1670, 73.6890],
  wardha: [20.7453, 78.6022],
  washim: [20.1095, 77.1352],
  yavatmal: [20.3888, 78.1204],
  palghar: [19.6966, 72.7699]
};

// Map Tile Layers
const MAP_TILES = {
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    name: 'Standard Voyager'
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    name: 'Midnight Dark'
  },
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    name: 'Clean Light'
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    name: 'Satellite View'
  }
};

const DEFAULT_CENTER: [number, number] = [19.65, 75.80];
const DEFAULT_ZOOM = 7;

export const MaharashtraSkillMap: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = MAP_TRANSLATIONS[currentLang] || MAP_TRANSLATIONS.en;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // States
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(MAHARASHTRA_DISTRICTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [centreFilter, setCentreFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'Skill Demand' | 'Training Capacity' | 'Skill Gap' | 'Emerging Sector'>('Skill Demand');
  const [tileStyle, setTileStyle] = useState<keyof typeof MAP_TILES>('voyager');
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'institutes' | 'action'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filtered districts
  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter((district) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = district.name.toLowerCase().includes(q);
      const matchMarathi = district.marathiName.toLowerCase().includes(q);
      const matchRegion = district.region.toLowerCase().includes(q);
      if (!matchName && !matchMarathi && !matchRegion) return false;
    }

    if (sectorFilter !== 'All') {
      const hasSector = district.highGrowthSectors.some((s) =>
        s.toLowerCase().includes(sectorFilter.toLowerCase())
      );
      if (!hasSector) return false;
    }

    if (centreFilter !== 'All') {
      const hasCentre = district.trainingEcosystem.some((c) =>
        c.toLowerCase().includes(centreFilter.toLowerCase())
      );
      if (!hasCentre) return false;
    }

    return true;
  });

  const getDistrictCoords = (district: DistrictData): [number, number] => {
    if (district.lat && district.lng) return [district.lat, district.lng];
    if (DISTRICT_GEO_COORDS[district.id]) return DISTRICT_GEO_COORDS[district.id];
    return [19.5, 75.5];
  };

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'VERY HIGH':
        return 'bg-red-600 text-white border-red-700 shadow-red-200';
      case 'HIGH':
        return 'bg-amber-600 text-white border-amber-700 shadow-amber-200';
      case 'MODERATE':
      default:
        return 'bg-blue-600 text-white border-blue-700 shadow-blue-200';
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 6,
      maxZoom: 14,
      zoomControl: false,
      scrollWheelZoom: true
    });

    // Add Zoom Control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial tile layer
    const tileConfig = MAP_TILES[tileStyle];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile Style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const tileConfig = MAP_TILES[tileStyle];
    const newLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [tileStyle]);

  // Update Markers when districts or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    filteredDistricts.forEach((district) => {
      const coords = getDistrictCoords(district);
      const isSelected = selectedDistrict.id === district.id;

      // Color coding based on view mode / demand
      let markerBgClass = 'bg-[#0C2340] text-white border-blue-400';
      if (viewMode === 'Skill Demand') {
        if (district.demandLevel === 'VERY HIGH') markerBgClass = 'bg-red-600 text-white border-red-300';
        else if (district.demandLevel === 'HIGH') markerBgClass = 'bg-amber-600 text-white border-amber-300';
        else markerBgClass = 'bg-blue-600 text-white border-blue-300';
      } else if (viewMode === 'Training Capacity') {
        if (district.trainingCapacity === 'HIGH') markerBgClass = 'bg-emerald-600 text-white border-emerald-300';
        else if (district.trainingCapacity === 'MEDIUM') markerBgClass = 'bg-teal-600 text-white border-teal-300';
        else markerBgClass = 'bg-slate-700 text-white border-slate-400';
      } else if (viewMode === 'Skill Gap') {
        markerBgClass = 'bg-purple-700 text-white border-purple-300';
      }

      const pulseStyle = isSelected
        ? 'ring-4 ring-blue-500 ring-offset-2 scale-110 z-50 shadow-2xl'
        : 'hover:scale-105 shadow-md';

      const iconHtml = `
        <div class="relative group cursor-pointer flex flex-col items-center transition-all duration-200 ${pulseStyle}">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${markerBgClass} whitespace-nowrap shadow-lg">
            <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-amber-300 animate-ping' : 'bg-white/80'}"></span>
            <span>${district.name}</span>
            <span class="bg-black/30 px-1.5 py-0.5 rounded text-[9.5px] font-mono">${(district.openSkillVacancies / 1000).toFixed(1)}k</span>
          </div>
          <div class="w-2 h-2 ${markerBgClass.split(' ')[0]} rotate-45 -mt-1 shadow-sm"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-pin',
        iconSize: [120, 36],
        iconAnchor: [60, 36]
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(map);

      // Marker Click Handler
      marker.on('click', () => {
        setSelectedDistrict(district);
        map.flyTo(coords, Math.max(map.getZoom(), 9), { duration: 1.2 });
      });

      markersRef.current[district.id] = marker;
    });
  }, [filteredDistricts, selectedDistrict, viewMode]);

  // Center / Fly to district when selected via sidebar or search
  const handleSelectDistrict = (district: DistrictData) => {
    setSelectedDistrict(district);
    const map = mapInstanceRef.current;
    if (map) {
      const coords = getDistrictCoords(district);
      map.flyTo(coords, Math.max(map.getZoom(), 9), { duration: 1.2 });
    }
  };

  // Reset Map View to Maharashtra State Bounding Box
  const handleResetMapView = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 1 });
    }
    setSearchQuery('');
    setCentreFilter('All');
    setSectorFilter('All');
  };

  return (
    <section id="maharashtra-map" className="py-12 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{t.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium">
                {t.districtsLive}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 shadow-lg text-xs">
            <div className="px-3 border-r border-slate-700">
              <div className="text-[10px] text-slate-400 font-medium">{t.vacancies}</div>
              <div className="text-sm font-extrabold text-emerald-400 font-mono">68,420+</div>
            </div>
            <div className="px-3 border-r border-slate-700">
              <div className="text-[10px] text-slate-400 font-medium">{currentLang === 'mr' ? 'केंद्रे' : currentLang === 'hi' ? 'केंद्र' : 'Institutes'}</div>
              <div className="text-sm font-extrabold text-blue-400 font-mono">1,420</div>
            </div>
            <div className="px-3">
              <div className="text-[10px] text-slate-400 font-medium">{currentLang === 'mr' ? 'जिल्हे' : currentLang === 'hi' ? 'जिले' : 'Districts'}</div>
              <div className="text-sm font-extrabold text-amber-400 font-mono">36</div>
            </div>
          </div>
        </div>

        {/* Multi-Control Search & Filter Toolbar */}
        <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80 mb-6 shadow-xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter 1: Sector Focus */}
            <div className="lg:col-span-3">
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Sectors (EV, Solar, Robotics, IT)</option>
                <option value="Electric Vehicles">Electric Vehicles &amp; Mobility</option>
                <option value="Solar">Solar &amp; Renewable Energy</option>
                <option value="Manufacturing">Advanced Manufacturing</option>
                <option value="Robotics">Industrial Automation</option>
                <option value="Data">Data Centres &amp; IT Services</option>
                <option value="Textile">Textiles &amp; Garments</option>
                <option value="Healthcare">Healthcare &amp; Bio-Medical</option>
              </select>
            </div>

            {/* Filter 2: Heatmap View Mode */}
            <div className="lg:col-span-3">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as any)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="Skill Demand">Heatmap: Skill Demand Intensity</option>
                <option value="Training Capacity">Heatmap: Institutional Capacity</option>
                <option value="Skill Gap">Heatmap: Deficit &amp; Skill Gap</option>
              </select>
            </div>

            {/* Tile Style Picker */}
            <div className="lg:col-span-2 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setTileStyle('voyager')}
                title="Standard Voyager Map"
                className={`p-2 rounded-lg text-xs font-medium border transition ${
                  tileStyle === 'voyager'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTileStyle('dark')}
                title="Midnight Dark Mode"
                className={`p-2 rounded-lg text-xs font-medium border transition ${
                  tileStyle === 'dark'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTileStyle('satellite')}
                title="Satellite View"
                className={`p-2 rounded-lg text-xs font-medium border transition ${
                  tileStyle === 'satellite'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetMapView}
                title="Reset Map View"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Map & District Sidebar Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Real Leaflet Interactive Map Box (7 Cols) */}
          <div className="lg:col-span-7 relative bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            {/* Real Geographic Map Canvas Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] z-10 select-none"
              style={{ background: '#0F172A' }}
            />

            {/* Map Legend Floating Glass Banner (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-2xl text-[11px] flex items-center gap-3">
              <span className="font-bold text-slate-300">Legend:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Very High Demand
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Standard
              </span>
            </div>

            {/* Active Tile Indicator (Top Left) */}
            <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 shadow-md text-[11px] text-slate-300 font-medium flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{MAP_TILES[tileStyle].name}</span>
            </div>
          </div>

          {/* District Intelligence Side Sheet Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/90 rounded-2xl p-5 shadow-2xl space-y-4">
            {/* District Header Card */}
            <div className="pb-3 border-b border-slate-700 flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>District Skill Telemetry Report</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-0.5 flex items-center gap-2">
                  <span>{selectedDistrict.name}</span>
                  <span className="text-base text-slate-400 font-medium">
                    ({selectedDistrict.marathiName})
                  </span>
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Region: <span className="font-semibold text-slate-200">{selectedDistrict.region}</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-lg border ${getBadgeColor(selectedDistrict.demandLevel)}`}>
                {selectedDistrict.demandLevel} DEMAND
              </span>
            </div>

            {/* Key Data Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Skill Centres</span>
                <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-400" />
                  <span>{selectedDistrict.activeInstitutesCount} Centres</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Open Industry Deficit</span>
                <div className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">
                  ~{selectedDistrict.openSkillVacancies.toLocaleString()} positions
                </div>
              </div>
            </div>

            {/* Tabbed Detail Switcher */}
            <div className="flex border-b border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview &amp; Sectors
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
                  activeTab === 'skills'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Top Micro-Skills
              </button>
              <button
                onClick={() => setActiveTab('action')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
                  activeTab === 'action'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Curriculum Action
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                {/* High Growth Sectors */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    <span>Industrial Growth Clusters</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDistrict.highGrowthSectors.map((sector, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/80 text-xs font-semibold"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Gap Diagnostic */}
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 text-xs space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Skill Deficit Diagnostic:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    {selectedDistrict.potentialSkillGap}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Highest Vacancy Micro-Competencies</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDistrict.topSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center border border-emerald-500/30">
                          {i + 1}
                        </span>
                        <span>{skill}</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800">
                        High Demand
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'action' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="p-3.5 bg-blue-950/50 rounded-xl border border-blue-800/80 text-xs space-y-1.5">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Recommended Institutional Action:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedDistrict.recommendedFocus}
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 text-xs">
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5">
                    Mapped Training Facilities in {selectedDistrict.name}:
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    {selectedDistrict.trainingEcosystem.join(' • ')}
                  </div>
                </div>
              </div>
            )}

            {/* Quick District Selector List Pills */}
            <div className="pt-3 border-t border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                <span>Select Monitored District ({filteredDistricts.length}):</span>
                {filteredDistricts.length < MAHARASHTRA_DISTRICTS.length && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSectorFilter('All');
                      setCentreFilter('All');
                    }}
                    className="text-blue-400 hover:underline text-[10px]"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {filteredDistricts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDistrict(d)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                      selectedDistrict.id === d.id
                        ? 'bg-blue-600 text-white shadow-md border border-blue-400'
                        : 'bg-slate-900/90 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
