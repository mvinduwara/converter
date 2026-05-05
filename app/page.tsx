import { ArrowRightLeft } from "lucide-react";
import Dropzone from "../components/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-2">
          <ArrowRightLeft className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Universal File Converter
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Secure, fast, and local file conversion. Transform images, documents, and more directly from your browser. 
        </p>
      </div>

      {/* The Interactive Dropzone Component */}
      <Dropzone />

    </div>
  );
}