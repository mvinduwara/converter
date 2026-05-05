"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null);

  // Function triggered when a file is dropped or selected
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1, // Restrict to one file at a time for now
  });

  // Function to clear the selected file
  const removeFile = () => setFile(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* STATE 1: No file selected - Show Drop Area */}
      {!file ? (
        <div
          {...getRootProps()}
          className={`p-12 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud
            className={`w-12 h-12 mb-4 ${
              isDragActive ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <p className="text-lg font-medium text-gray-700 text-center">
            {isDragActive
              ? "Drop your file here..."
              : "Drag & drop a file here, or click to select"}
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Supports Images, PDFs, and Documents
          </p>
        </div>
      ) : (
        /* STATE 2: File Selected - Show Details & Format Selector */
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <FileIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format Selection & Convert Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Convert to
              </label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="webp">WebP (Image)</option>
                <option value="jpg">JPG (Image)</option>
                <option value="png">PNG (Image)</option>
                <option value="pdf">PDF (Document)</option>
              </select>
            </div>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-not-allowed opacity-80" disabled>
              Convert File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}