import { education } from "@/lib/data";
import { GraduationIcon } from "@/components/icons";

export function Education() {
  return (
    <section className="p-8 pb-7 border-b border-gray-200">
      <h2 className="section-header mb-6">Education</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.map((school) => (
          <div
            key={school.id}
            className="rounded-xl border border-gray-200 p-4 flex items-start gap-3"
            style={{
              background: "linear-gradient(135deg, #f6f9ff 0%, #eef3ff 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 select-none"
              style={{
                background: "linear-gradient(145deg, #68c8f8, #1a7fcc)",
                boxShadow: "0 2px 8px rgba(26,127,204,0.3)",
              }}
            >
              <GraduationIcon className="w-5 h-5 text-white" />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="text-[14px] font-semibold text-gray-900 leading-tight">
                {school.institution}
              </h3>
              <p className="text-[12px] font-medium mt-0.5" style={{ color: "#1a7fcc" }}>
                {school.degree} · {school.field}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {school.startYear} – {school.endYear}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
