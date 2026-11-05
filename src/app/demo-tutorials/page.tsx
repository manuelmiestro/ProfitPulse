import Link from "next/link";

export default function DemoTutorialsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#E85D04]">Preview placeholder</p>
        <h1 className="text-2xl font-semibold text-[#2D2A26]">Tutorials open here</h1>
        <p className="text-[#6B6560]">
          In the real app this link opens Joyce&apos;s tutorials page in the MyProfitPulse community, set by
          NEXT_PUBLIC_TUTORIALS_URL. That address hasn&apos;t been provided yet, so the preview shows this page instead.
        </p>
        <Link href="/dashboard" className="inline-block text-[#E85D04] underline">
          Back to the dashboard
        </Link>
      </div>
    </main>
  );
}
