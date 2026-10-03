export async function downloadResume(): Promise<void> {
  try {
    const response = await fetch("/Resume/Vishwas Tiwari - AI Engineer Resume (Oct 2026).pdf");
    if (!response.ok) throw new Error("Failed to fetch resume");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Vishwas Tiwari - AI Engineer Resume (Oct 2026).pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
  } catch {
    window.open("/Resume/Vishwas Tiwari - AI Engineer Resume (Oct 2026).pdf", "_blank");
  }
}
