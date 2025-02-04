'use client';
import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Arrow, Text, Transformer, RegularPolygon } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import { TbRectangle } from 'react-icons/tb';
import { IoMdUndo, IoMdRedo, IoMdTrash } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCircle, FaTextHeight } from 'react-icons/fa6';
import { GiArrowCursor } from 'react-icons/gi';
import { IoTriangle } from 'react-icons/io5';

const ACTIONS = {
  SELECT: 'SELECT',
  RECTANGLE: 'RECTANGLE',
  CIRCLE: 'CIRCLE',
  ARROW: 'ARROW',
  TEXT: 'TEXT',
  TRIANGLE: 'TRIANGLE'
};

export default function ConvaMaker() {
  const stageRef = useRef();
  const transformerRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState('#ff0000');
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [textOptions, setTextOptions] = useState({ fontSize: 20, fontFamily: 'Arial', fontWeight: 'normal' });
  const strokeColor = '#000';

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, shapes]);

  const handlePointerDown = () => {
    if (action === ACTIONS.SELECT) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();
    let newShape = null;

    switch (action) {
      case ACTIONS.RECTANGLE:
        newShape = { id, type: 'RECTANGLE', x, y, width: 100, height: 50, fillColor, draggable: true };
        break;
      case ACTIONS.CIRCLE:
        newShape = { id, type: 'CIRCLE', x, y, radius: 30, fillColor, draggable: true };
        break;
      case ACTIONS.ARROW:
        newShape = { id, type: 'ARROW', points: [x, y, x + 50, y + 50], fillColor, draggable: true };
        break;
      case ACTIONS.TEXT:
        newShape = { id, type: 'TEXT', x, y, text:'Enter Text'  , ...textOptions, draggable: true };
        break;
      case ACTIONS.TRIANGLE:
        newShape = { id, type: 'TRIANGLE', x, y, radius: 40, fillColor, draggable: true };
        break;
    }

    if (newShape) {
      setHistory([...history, shapes]);
      setShapes([...shapes, newShape]);
      setSelectedId(id);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevState = history.pop();
    setRedoStack([...redoStack, shapes]);
    setShapes(prevState);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.pop();
    setHistory([...history, shapes]);
    setShapes(nextState);
  };

  const handleDelete = () => {
    setShapes(shapes.filter(shape => shape.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className=" relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 z-10 w-full py-2">
        <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.SELECT)}><GiArrowCursor /></button>
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.RECTANGLE)}><TbRectangle /></button>
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.CIRCLE)}><FaRegCircle /></button>
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.TRIANGLE)}><IoTriangle /></button>
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.TEXT)}><FaTextHeight /></button>
          <button className="p-2 bg-gray-300 rounded" onClick={() => setAction(ACTIONS.ARROW)}><FaLongArrowAltRight /></button>
          <button className="p-2 bg-red-300 rounded" onClick={handleUndo}><IoMdUndo /></button>
          <button className="p-2 bg-green-300 rounded" onClick={handleRedo}><IoMdRedo /></button>
          <button className="p-2 bg-red-500 text-white rounded" onClick={handleDelete}><IoMdTrash /></button>
          
          <button>
              <input
                className="w-8 h-9 rounded-md"
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </button>
        </div>
      </div>

      <Stage
        ref={stageRef}
        width={window.innerWidth - 120}
        height={window.innerHeight}
        onPointerDown={handlePointerDown}
        onClick={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) setSelectedId(null);
        }}
      >
        <Layer>
          {shapes.map(shape => (
            <ShapeRenderer key={shape.id} shape={shape} setSelectedId={setSelectedId} />
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}

function ShapeRenderer({ shape, setSelectedId }) {
  const handleClick = () => setSelectedId(shape.id);

  switch (shape.type) {
    case 'TEXT':
      return <Text {...shape} onClick={handleClick} draggable  />;
    case 'RECTANGLE':
      return <Rect {...shape} onClick={handleClick} draggable fill={shape.fillColor} />;
    case 'CIRCLE':
      return <Circle {...shape} onClick={handleClick} draggable fill={shape.fillColor} />;
    case 'ARROW':
      return <Arrow {...shape} onClick={handleClick} draggable />;
    case 'TRIANGLE':
      return <RegularPolygon {...shape} sides={3} onClick={handleClick} draggable fill={shape.fillColor}/>;
    default:
      return null;
  }
}
