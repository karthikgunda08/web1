// src/features/FloorPlanSketcherSection.tsx
import React, { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import { FloorPlanSketcherSectionProps, ReadOnlySketcherProps, SketcherHandles, Wall, LiveCursor } from '../types/index';
import { getColorForUserId } from '../lib/colorUtils';
import * as socketService from '../services/socketService';
import { GRID_SIZE } from '../lib/constants';

type CombinedProps = (FloorPlanSketcherSectionProps & { isReadOnly?: false | undefined }) | (ReadOnlySketcherProps & { isReadOnly: true });

// NEW: Snap-to-grid helper function for precision drawing
const snapToGrid = (point: { x: number, y: number }): { x: number, y: number } => {
    return {
        x: Math.round(point.x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(point.y / GRID_SIZE) * GRID_SIZE,
    };
};


export const FloorPlanSketcherSection = React.forwardRef<SketcherHandles, CombinedProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const startPoint = useRef<{ x: number, y: number } | null>(null);
  const tempLine = useRef<fabric.Line | null>(null);
  const tempRect = useRef<fabric.Rect | null>(null);
  
  const propsRef = useRef(props);
  useLayoutEffect(() => {
    propsRef.current = props;
  });

  const { levels, activeLevelIndex } = props;
  const isReadOnly = 'isReadOnly' in props && props.isReadOnly;
  const aiFixPreview = !isReadOnly ? (props as FloorPlanSketcherSectionProps).aiFixPreview : null;
  const liveSelections = !isReadOnly ? (props as FloorPlanSketcherSectionProps).liveSelections : {} as Record<string, { userId: string; selection: any }>;
  const liveCursors = !isReadOnly ? (props as FloorPlanSketcherSectionProps).liveCursors : {} as Record<string, { userId: string; userName: string; position: { x: number; y: number } }>;
  const currentUser = !isReadOnly ? (props as FloorPlanSketcherSectionProps).currentUser : null;

  const drawCanvasContent = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const activeLevel = levels[activeLevelIndex];
    
    canvas.clear();
    
    const gridColor = '#334155';
    for (let i = 0; i < (canvas.width || 0) / (GRID_SIZE * canvas.getZoom()); i++) {
        for (let j = 0; j < (canvas.height || 0) / (GRID_SIZE * canvas.getZoom()); j++) {
            const dot = new fabric.Circle({
                left: i * GRID_SIZE, top: j * GRID_SIZE, radius: 0.5,
                fill: gridColor, selectable: false, evented: false,
                originX: 'center', originY: 'center',
            });
            canvas.add(dot);
        }
    }
    
    (activeLevel.walls || []).forEach(wall => {
        const line = new fabric.Line([wall.x1, wall.y1, wall.x2, wall.y2], {
            stroke: '#e2e8f0', strokeWidth: wall.thickness,
            selectable: true
        });
        (line as any).data = { id: wall.id, type: 'wall', levelIndex: activeLevelIndex };
        canvas.add(line);
    });

    // NEW: Draw room labels
    (activeLevel.rooms || []).forEach(room => {
        if (!room.wallIds || room.wallIds.length === 0) return;

        const roomWalls = room.wallIds.map(id => activeLevel.walls.find(w => w.id === id)).filter(Boolean) as Wall[];
        if (roomWalls.length === 0) return;
        
        const allPoints = roomWalls.flatMap(w => [{x: w.x1, y: w.y1}, {x: w.x2, y: w.y2}]);
        const uniquePoints = Array.from(new Map(allPoints.map(p => [`${p.x},${p.y}`, p])).values());

        if (uniquePoints.length === 0) return;
        
        const centerX = uniquePoints.reduce((sum, p) => sum + p.x, 0) / uniquePoints.length;
        const centerY = uniquePoints.reduce((sum, p) => sum + p.y, 0) / uniquePoints.length;

        const areaText = room.calculatedArea ? `\n${(room.calculatedArea / 100).toFixed(1)} sq. ft.` : '';
        const labelText = `${room.name}${areaText}`;
        
        const label = new fabric.Text(labelText, {
            left: centerX,
            top: centerY,
            originX: 'center',
            originY: 'center',
            fontSize: 12,
            fill: '#94a3b8',
            textAlign: 'center',
            selectable: true,
            evented: true
        });
        (label as any).data = { id: room.id, type: 'room', levelIndex: activeLevelIndex };
        canvas.add(label);
    });

    (activeLevel.placements || []).forEach(p => {
        const wall = activeLevel.walls.find(w => w.id === p.wallId);
        if(!wall) return;
        const wallVec = new fabric.Point(wall.x2 - wall.x1, wall.y2 - wall.y1);
        const positionOnWall = new fabric.Point(
            wall.x1 + wallVec.x * p.positionRatio, 
            wall.y1 + wallVec.y * p.positionRatio
        );
        const angle = fabric.util.radiansToDegrees(Math.atan2(wallVec.y, wallVec.x));
        const rect = new fabric.Rect({
            left: positionOnWall.x, top: positionOnWall.y,
            width: p.width, height: wall.thickness,
            fill: p.type === 'door' ? '#a78bfa' : '#38bdf8',
            originX: 'center', originY: 'center', angle: angle,
            selectable: true
        });
        (rect as any).data = { id: p.id, type: 'placement', levelIndex: activeLevelIndex };
        canvas.add(rect);
    });
    
    (activeLevel.comments || []).forEach(c => {
        const circle = new fabric.Circle({
            left: c.x, top: c.y, radius: 10, fill: c.resolved ? '#10b981' : '#f59e0b',
            originX: 'center', originY: 'center', selectable: true,
        });
        (circle as any).data = { id: c.id, type: 'comment', levelIndex: activeLevelIndex };
        canvas.add(circle);
    });
    
    (activeLevel.zones || []).forEach(zone => {
        const zoneColors: Record<string, string> = { residential: 'rgba(37, 99, 235, 0.5)', commercial: 'rgba(245, 158, 11, 0.5)', green_space: 'rgba(16, 185, 129, 0.5)' };
        const poly = new fabric.Polygon(zone.path, {
            fill: zoneColors[zone.type] || 'rgba(100, 116, 139, 0.5)',
            stroke: '#fff', strokeWidth: 1, strokeDashArray: [3,3],
            selectable: true
        });
        (poly as any).data = { id: zone.id, type: 'zone', levelIndex: activeLevelIndex };
        canvas.add(poly);
    });

    (activeLevel.infrastructure || []).forEach(infra => {
        const polyline = new fabric.Polyline(infra.path, {
            stroke: '#64748b', strokeWidth: infra.width || 10, fill: 'transparent',
            selectable: true
        });
        (polyline as any).data = { id: infra.id, type: 'infrastructure', levelIndex: activeLevelIndex };
        canvas.add(polyline);
    });


    if (aiFixPreview) {
        aiFixPreview.fix.addedWalls?.forEach(wall => {
             const line = new fabric.Line([wall.x1, wall.y1, wall.x2, wall.y2], {
                stroke: 'rgba(139, 92, 246, 0.7)', strokeWidth: 10,
                strokeDashArray: [5, 5], selectable: false, evented: false
            });
            canvas.add(line);
        });
    }

    Object.values(liveSelections).forEach((selection: any) => {
        if(selection.userId === currentUser?.id) return;
        const obj = canvas.getObjects().find(o => (o as any).data?.id === selection.selection?.id);
        if(obj) { obj.set({ stroke: getColorForUserId(selection.userId), strokeWidth: (obj as any).strokeWidth + 4 }); }
    });
    
    Object.entries(liveCursors || {}).forEach(([userId, cursor]: [string, any]) => {
      if (userId === currentUser?.id || cursor.x === undefined) return;
      const cursorColor = getColorForUserId(userId);
      const cursorShape = new fabric.Circle({
        left: cursor.x,
        top: cursor.y,
        radius: 5,
        fill: cursorColor,
        stroke: '#fff',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });
      const cursorLabel = new fabric.Text(cursor.userName, {
        left: cursor.x,
        top: cursor.y + 15,
        fontSize: 12,
        fill: cursorColor,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });
      canvas.add(cursorShape, cursorLabel);
    });

    canvas.renderAll();
  }, [levels, activeLevelIndex, aiFixPreview, liveSelections, liveCursors, currentUser]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
        selection: !isReadOnly,
        backgroundColor: '#1e293b'
    });
    fabricCanvasRef.current = canvas;

    const parentEl = canvasRef.current.parentElement;
    if (!parentEl) return;
    const resizeObserver = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        canvas.setWidth(width);
        canvas.setHeight(height);
        drawCanvasContent();
    });
    resizeObserver.observe(parentEl);

    drawCanvasContent();

    return () => {
        resizeObserver.disconnect();
        canvas.dispose();
        fabricCanvasRef.current = null;
    };
  }, [isReadOnly, drawCanvasContent]);

  useEffect(() => {
      drawCanvasContent();
  }, [levels, activeLevelIndex, aiFixPreview, liveSelections, liveCursors, currentUser, drawCanvasContent]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
});