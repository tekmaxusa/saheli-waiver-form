import type {jsPDF} from 'jspdf';

/**
 * Async base64 for Apps Script (avoids huge synchronous `datauristring` on the main thread).
 */
export async function getPdfBase64FromJsPDF(doc: jsPDF): Promise<string> {
  const blob = doc.output('blob');
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const s = fr.result as string;
      const i = s.indexOf('base64,');
      resolve(i >= 0 ? s.slice(i + 7) : '');
    };
    fr.onerror = () => reject(new Error('Failed to read PDF blob'));
    fr.readAsDataURL(blob);
  });
}

/** Lets React paint the loading state before heavy synchronous work. */
export function yieldToMainThread(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}
