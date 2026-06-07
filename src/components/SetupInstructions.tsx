import { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle, Table } from 'lucide-react';
import appsScriptCode from '../../google-apps-script/Code.gs?raw';

export default function SetupInstructions() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(appsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
          <FileCode size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Google Sheets & email setup</h2>
          <p className="text-sm text-slate-500">
            Source of truth for the script is <code className="text-xs bg-slate-100 px-1 rounded">google-apps-script/Code.gs</code>.
            Change <code className="text-xs bg-slate-100 px-1 rounded">NOTIFICATION_EMAIL</code> at the top to switch from your personal Gmail test inbox to{' '}
            <code className="text-xs bg-slate-100 px-1 rounded">support@tekmaxllc.com</code> later.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="w-0.5 h-full bg-slate-200" />
          </div>
          <div className="pb-4">
            <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
              <Table size={16} className="text-slate-400" />
              Create the Google Sheet
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Create a spreadsheet (for example <strong className="text-slate-800">Saheli Centennial Waivers</strong>) bound to this Apps Script project.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="w-0.5 h-full bg-slate-200" />
          </div>
          <div className="pb-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-semibold text-slate-800 text-base">Paste Code.gs</h3>
              <button
                type="button"
                onClick={copyToClipboard}
                className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg ml-0.5 sm:ml-auto transition"
              >
                {copied ? (
                  <>
                    <CheckCircle size={14} className="text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy script
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-1 mb-3">
              In the sheet: <strong className="text-slate-800">Extensions → Apps Script</strong>. Replace the editor contents with the script below, then save.
            </p>
            <div className="max-h-60 overflow-y-auto bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 border border-slate-800 shadow-inner">
              <pre className="whitespace-pre-wrap break-words">{appsScriptCode}</pre>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-base">Deploy & connect this app</h3>
            <p className="text-sm text-slate-600 mt-1">
              In Apps Script: <strong className="text-slate-800">Deploy → New deployment → Web app</strong>. Execute as <strong>Me</strong>, access{' '}
              <strong>Anyone</strong>, then copy the Web App URL.
            </p>
            <ul className="text-xs text-slate-500 mt-2 space-y-1.5 list-disc pl-5">
              <li>
                Local dev: add <code className="text-[11px] bg-slate-100 px-1 rounded">VITE_GAS_WEBAPP_URL</code> to{' '}
                <code className="text-[11px] bg-slate-100 px-1 rounded">.env.local</code> (see <code className="text-[11px] bg-slate-100 px-1 rounded">.env.example</code>).
              </li>
              <li>
                Or set <code className="text-[11px] bg-slate-100 px-1 rounded">localStorage.saheli_waiver_gas_url</code> in the browser devtools for a quick test.
              </li>
            </ul>
            <div className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg p-3">
              The browser uses <code className="font-mono">no-cors</code> POST to Google; you will not see JSON responses in the network tab, but the script still runs when the URL is correct.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
