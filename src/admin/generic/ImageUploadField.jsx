import { useState } from "react";
import { Icon } from "../../design-system/index.js";

export function ImageUploadField({ label, value, onChange, error, required }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-text-strong">
        {label} {required && <span className="text-danger-600">*</span>}
      </label>
      <div className="flex gap-4 items-center">
        {value ? (
          <div className="relative h-16 w-24 overflow-hidden rounded border border-border-subtle bg-sand">
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute top-1 start-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-danger-600 text-white"
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        ) : (
          <div className="h-16 w-24 rounded border border-dashed border-border-strong bg-sand-deep flex items-center justify-center text-text-muted">
            <Icon name="image" size={24} />
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-copper file:text-white hover:file:bg-copper-dark cursor-pointer"
          />
          {uploading && <div className="text-sm text-text-muted mt-1">جاري الرفع...</div>}
        </div>
      </div>
      {error && <span className="text-sm text-danger-600">{error}</span>}
    </div>
  );
}
