import { FC } from "react";

interface ColorPaletteViewerProps {
  colorPalette: string[];
}

const ColorPaletteViewer: FC<ColorPaletteViewerProps> = (props) => {
  return (
    <div className="flex-1 flex flex-row justify-between">
      {props.colorPalette.map((color) => <div className="flex-1 flex items-center justify-center h-screen" key={color} style={{backgroundColor: color}}>{color}</div>)}
    </div>
  );
};

export default ColorPaletteViewer;
