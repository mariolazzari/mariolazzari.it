import { DottedMap, Marker } from "@/components/ui/dotted-map";
import { useId } from "react";

type MyMarker = Marker & {
  overlay: {
    label: string;
  };
};

const markers: MyMarker[] = [
  {
    lat: 52.360001,
    lng: 4.885278,
    overlay: { label: "Rijksmuseum" },
    size: 1,
  },
  {
    lat: 52.0804,
    lng: 4.3143,
    overlay: { label: "Mauritshuis" },
    size: 1,
  },
];

export function MuseumsMap() {
  const id = useId();

  return (
    <div className="relative h-125 w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-200%" />
      <DottedMap<MyMarker>
        markers={markers}
        renderMarkerOverlay={({ marker, x, y, r, index }) => {
          const { label } = marker.overlay;

          const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
          const imgR = r * 0.75;

          const fontSize = r * 0.9;
          const pillH = r * 1.5;
          const pillW = label.length * fontSize + r * 1.4;
          const pillX = x + r + r * 0.6;
          const pillY = y - pillH / 2;

          return (
            <g style={{ pointerEvents: "none" }}>
              <clipPath id={clipId}>
                <circle cx={x} cy={y} r={imgR} />
              </clipPath>

              <rect
                x={pillX}
                y={pillY}
                width={pillW}
                height={pillH}
                rx={pillH / 2}
                fill="rgba(0,0,0,0.55)"
              />
              <text
                x={pillX + r * 0.7}
                y={y + fontSize * 0.35}
                fontSize={fontSize}
                fill="white"
              >
                {label}
              </text>
            </g>
          );
        }}
      />
    </div>
  );
}
