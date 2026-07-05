export interface SvgWorldMapInstance {
  update: (data: Record<string, string>) => void;
  reset: () => void;
  countries: Record<string, unknown>;
}

export type SvgWorldMapFn = (
  initOptions?: Record<string, unknown>,
  initCountryData?: Record<string, unknown>,
  initTimeData?: unknown
) => Promise<SvgWorldMapInstance>;

declare global {
  interface Window {
    svgWorldMap?: SvgWorldMapFn;
  }
}

export {};
