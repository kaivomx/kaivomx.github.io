"use client";

import { useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function ImageUploader({
  name,
  label,
  defaultImages = [],
  multiple = true,
}: {
  name: string;
  label: string;
  defaultImages?: string[];
  multiple?: boolean;
}) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("property-images").upload(path, file);
      if (uploadError) {
        setError("No se pudo subir una imagen. Verifica que el bucket 'property-images' exista y sea público.");
        continue;
      }
      const { data } = supabase.storage.from("property-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setImages((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(0, 1)));
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="sm:col-span-2">
      <label className="block text-xs text-black/60 mb-1">{label}</label>
      <input type="hidden" name={name} value={images.join(",")} />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
        className="w-full border border-black/15 px-3 py-2 text-sm"
      />
      {uploading && <p className="text-xs text-black/50 mt-1">Subiendo...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
          {images.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={url} className="relative group">
              <img src={url} alt="" className="w-full aspect-square object-cover border border-black/10" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs">
                <button type="button" onClick={() => moveImage(i, -1)} className="px-1.5 py-0.5 bg-white/20 rounded">←</button>
                <button type="button" onClick={() => removeImage(url)} className="px-1.5 py-0.5 bg-red-600 rounded">✕</button>
                <button type="button" onClick={() => moveImage(i, 1)} className="px-1.5 py-0.5 bg-white/20 rounded">→</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
