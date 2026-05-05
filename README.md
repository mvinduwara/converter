# 🔄 Universal File Converter

A modern, fast, and secure file conversion web application built with Next.js. This tool allows users to easily drag and drop files to convert them into various formats directly from the browser. 

Image processing is handled incredibly fast on the server using `sharp`, while complex document formatting (like Word to PDF) is routed through ConvertAPI.

## ✨ Features

* **Drag and Drop Interface:** Built with `react-dropzone` for a seamless user experience.
* **Instant Image Conversion:** Convert between WebP, JPG, and PNG instantly using the native Node.js `sharp` library.
* **Document Processing:** Seamlessly transform Word Documents (.docx) into PDFs and vice-versa.
* **Secure & Private:** Files are processed in temporary server storage (`/tmp`) and are strictly deleted immediately after conversion to ensure data privacy and prevent memory leaks.
* **Modern UI:** Styled with Tailwind CSS and animated with Lucide React icons.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)
* **Document Processing:** [ConvertAPI](https://www.convertapi.com/)
<img width="1919" height="914" alt="Screenshot 2026-05-05 163155" src="https://github.com/user-attachments/assets/4a75c824-b3a0-4770-930e-3be80106a5a8" />
