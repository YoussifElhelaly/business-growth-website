import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill modules config for a robust editor
const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

export function RichTextField({ label, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold text-text-strong">
        {label} {required && <span className="text-danger-600">*</span>}
      </label>
      <div className="bg-parchment text-text-strong richtext-container" style={{ direction: "rtl", minHeight: "200px" }}>
        <ReactQuill
          theme="snow"
          value={value || ""}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="border-border-subtle"
        />
      </div>
      {error && <span className="text-sm text-danger-600">{error}</span>}
      <style>{`
        .richtext-container .ql-toolbar {
          border-color: var(--border-subtle);
          border-top-left-radius: var(--radius-md);
          border-top-right-radius: var(--radius-md);
          direction: ltr;
        }
        .richtext-container .ql-container {
          border-color: var(--border-subtle);
          border-bottom-left-radius: var(--radius-md);
          border-bottom-right-radius: var(--radius-md);
          min-height: 200px;
          font-family: inherit;
          font-size: 16px;
        }
        .richtext-container .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}
