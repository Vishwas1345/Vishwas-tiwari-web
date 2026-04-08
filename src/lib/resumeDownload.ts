export async function downloadResume(): Promise<void> {
  try {
    const response = await fetch("/Vishwas_Tiwari_Resume.pdf");
    if (!response.ok) throw new Error("Failed to fetch resume");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Vishwas_Tiwari_Resume.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
  } catch {
    window.open("/Vishwas_Tiwari_Resume.pdf", "_blank");
  }
}
