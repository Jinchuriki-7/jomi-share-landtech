import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { MAP_CENTER, MAP_ZOOM } from '../../data/demoData';
import type { Plot, SharedResource, Road } from '../../data/demoData';

// Fix Leaflet default icon path issue with Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CLASSIFICATION_COLORS: Record<string, { color: string; fillColor: string; fillOpacity: number }> = {
  agricultural: { color: '#16a34a', fillColor: '#86efac', fillOpacity: 0.35 },
  homestead:    { color: '#2563eb', fillColor: '#93c5fd', fillOpacity: 0.35 },
  orchard:      { color: '#d97706', fillColor: '#fcd34d', fillOpacity: 0.35 },
  pond:         { color: '#0891b2', fillColor: '#67e8f9', fillOpacity: 0.45 },
  road:         { color: '#6b7280', fillColor: '#d1d5db', fillOpacity: 0.5 },
};

const HEIR_COLORS: Record<string, string> = {
  'heir-a': '#16a34a',
  'heir-b': '#2563eb',
  'heir-c': '#d97706',
};

interface LandMapProps {
  showLabels?: boolean;
  showRoads?: boolean;
  showShared?: boolean;
  showPartition?: boolean;
  partitionAllocations?: Array<{ plotId: string; heirId: string }>;
  height?: string;
  onPlotClick?: (plotId: string) => void;
}

export default function LandMap({
  showLabels = true,
  showRoads = true,
  showShared = true,
  showPartition = false,
  partitionAllocations = [],
  height = '450px',
  onPlotClick,
}: LandMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.Layer[]>([]);
  const { landCase, selectedPlotId, selectPlot } = useApp();
  const { lang, t, toBn } = useLanguage();
  const isBn = lang === 'bn';

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [MAP_CENTER.lat, MAP_CENTER.lng],
      zoom: MAP_ZOOM,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors | DEMO VISUALIZATION',
      maxZoom: 19,
    }).addTo(map);

    // Demo disclosure label
    const disclaimer = (L.control as any)({ position: 'bottomleft' });
    disclaimer.onAdd = () => {
      const div = L.DomUtil.create('div', '');
      div.innerHTML = `<div style="background:rgba(255,255,255,0.92);padding:4px 8px;border-radius:6px;font-size:10px;color:#92400e;border:1px solid #fbbf24;font-family:Inter,sans-serif;">⚠️ ${isBn ? 'কৃত্রিম ডেমো ডেটা — কাল্পনিক দাগের সীমানা' : 'SYNTHETIC DEMO DATA — Fictional plot geometries'}</div>`;
      return div;
    };
    disclaimer.addTo(map);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [isBn]);

  // Render layers whenever relevant props change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old layers
    layersRef.current.forEach(l => map.removeLayer(l));
    layersRef.current = [];

    // Draw roads
    if (showRoads) {
      landCase.roads.forEach(road => {
        const latlngs = road.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
        const line = L.polyline(latlngs, {
          color: '#6b7280',
          weight: road.type === 'primary' ? 5 : road.type === 'secondary' ? 3 : 2,
          opacity: 0.7,
          dashArray: road.type === 'kuccha' ? '6 4' : undefined,
        });
        line.bindTooltip(`🛤 ${road.name} (${road.type}) — ${isBn ? 'কৃত্রিম ডেমো' : 'SYNTHETIC DEMO'}`, { sticky: true });
        line.addTo(map);
        layersRef.current.push(line);
      });
    }

    // Draw plots
    landCase.plots.forEach(plot => {
      const coords = plot.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
      const isSelected = plot.id === selectedPlotId;
      const allocation = partitionAllocations.find(a => a.plotId === plot.id);
      const style = CLASSIFICATION_COLORS[plot.classification] || CLASSIFICATION_COLORS.agricultural;

      let fillColor = style.fillColor;
      let color = style.color;

      if (showPartition && allocation) {
        const heirColor = HEIR_COLORS[allocation.heirId] || '#6b7280';
        fillColor = heirColor;
        color = heirColor;
      }

      if (isSelected) color = '#1e3a5f';

      const polygon = L.polygon(coords, {
        color,
        fillColor,
        fillOpacity: isSelected ? 0.5 : style.fillOpacity,
        weight: isSelected ? 3 : 2,
      });

      const dagDisplay = isBn ? toBn(plot.dagNumber) : plot.dagNumber;
      const syntheticLabel = isBn ? 'কৃত্রিম ডেমো' : 'SYNTHETIC';
      const areaLabel = isBn ? 'পরিমাণ:' : 'Area:';
      const areaVal = isBn ? `${toBn(plot.area)} শতাংশ` : `${plot.area} dec`;
      const typeLabel = isBn ? 'শ্রেণী:' : 'Type:';
      const typeVal = t.status[plot.classification] || plot.classification;
      const accessLabel = isBn ? 'রাস্তা:' : 'Access:';
      const accessVal = isBn ? (plot.roadAccess === 'direct' ? 'সরাসরি' : 'পরোক্ষ') : plot.roadAccess;
      const statusLabel = isBn ? 'অবস্থা:' : 'Status:';
      const statusVal = t.status[plot.recordStatus] || plot.recordStatus;

      polygon.bindPopup(`
        <div style="font-family:Inter,sans-serif;min-width:180px">
          <div style="font-weight:700;color:#0f1e33;margin-bottom:4px">${dagDisplay} — ${syntheticLabel}</div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:6px">${plot.mouzaName}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px">
            <div><span style="color:#6b7280">${areaLabel}</span> <b>${areaVal}</b></div>
            <div><span style="color:#6b7280">${typeLabel}</span> <b>${typeVal}</b></div>
            <div><span style="color:#6b7280">${accessLabel}</span> <b style="color:${plot.roadAccess === 'direct' ? '#16a34a' : '#d97706'}">${accessVal}</b></div>
            <div><span style="color:#6b7280">${statusLabel}</span> <b style="color:${plot.recordStatus === 'verified' ? '#16a34a' : '#ef4444'}">${statusVal}</b></div>
          </div>
        </div>
      `);

      polygon.on('click', () => {
        selectPlot(plot.id);
        onPlotClick?.(plot.id);
      });

      polygon.addTo(map);
      layersRef.current.push(polygon);

      // Label
      if (showLabels) {
        const label = L.divIcon({
          className: '',
          html: `<div style="background:white;border:1px solid ${color};border-radius:4px;padding:2px 5px;font-size:10px;font-weight:600;color:${color};font-family:Inter,sans-serif;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.12)">${dagDisplay}</div>`,
          iconAnchor: [30, 10],
        });
        const marker = L.marker([plot.center.lat, plot.center.lng], { icon: label, interactive: false });
        marker.addTo(map);
        layersRef.current.push(marker);
      }
    });

    // Draw shared resources
    if (showShared) {
      landCase.sharedResources.forEach(res => {
        const coords = res.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number]);
        const pond = L.polygon(coords, {
          color: '#0891b2',
          fillColor: '#67e8f9',
          fillOpacity: 0.55,
          weight: 2,
          dashArray: '5 3',
        });
        pond.bindTooltip(`🐟 ${res.name} — SYNTHETIC DEMO`, { sticky: true });
        pond.addTo(map);
        layersRef.current.push(pond);
      });
    }
  }, [landCase, selectedPlotId, showLabels, showRoads, showShared, showPartition, partitionAllocations, selectPlot, onPlotClick, isBn, toBn, t]);

  return (
    <div className="map-container" style={{ height }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
