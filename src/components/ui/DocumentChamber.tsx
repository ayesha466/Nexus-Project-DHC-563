import React, { useRef, useState } from 'react';

const statusOptions = ['Draft', 'In Review', 'Signed'] as const;

type Status = typeof statusOptions[number];

const DocumentChamber: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('Draft');
  const [signature, setSignature] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl(null);
    }
  };

  // Signature pad logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };
  const handleMouseUp = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSignature(canvas.toDataURL());
  };
  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-gray-800">
      <h2 className="text-cyan-400 text-2xl font-heading mb-4 text-center">Document Chamber</h2>
      <div className="mb-6 flex flex-col gap-4">
        <label className="text-gray-200 font-semibold">Upload PDF/Doc:</label>
        <input type="file" accept="application/pdf,.doc,.docx,.txt" onChange={handleFileChange} className="bg-gray-900 text-cyan-300 p-2 rounded border border-gray-700" />
        {previewUrl && (
          <div className="mt-4">
            <iframe src={previewUrl} title="Preview" className="w-full h-64 rounded-lg border border-cyan-400 bg-black" />
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="text-gray-200 font-semibold mb-2 block">E-Signature:</label>
        <canvas
          ref={canvasRef}
          width={400}
          height={100}
          className="bg-white rounded shadow border border-cyan-400 cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <div className="mt-2 flex gap-2">
          <button className="bg-cyan-400 text-gray-900 px-4 py-1 rounded font-bold shadow" onClick={handleClearSignature}>Clear</button>
        </div>
        {signature && <img src={signature} alt="Signature preview" className="mt-2 h-12" />}
      </div>
      <div className="mb-6">
        <label className="text-gray-200 font-semibold mb-2 block">Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value as Status)} className="bg-gray-900 text-cyan-300 p-2 rounded border border-gray-700">
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className={`ml-4 px-3 py-1 rounded font-bold ${status === 'Draft' ? 'bg-yellow-500 text-black' : status === 'In Review' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>{status}</span>
      </div>
    </div>
  );
};

export default DocumentChamber;
