import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section className="p-8 pb-7 border-b border-gray-200">
      <h2 className="section-header mb-6">Experience</h2>

      <div className="space-y-0">
        {experience.map((job, i) => (
          <div key={job.id} className="flex gap-4">
            {/* Timeline column */}
            <div className="flex flex-col items-center pt-1">
              <div
                className="w-[11px] h-[11px] rounded-full flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(145deg, #68c8f8, #1a7fcc)",
                  boxShadow: "0 0 0 2px white, 0 0 0 3px #aad8f4",
                }}
              />
              {i < experience.length - 1 && (
                <div className="w-px flex-1 min-h-[32px] mt-1 bg-gradient-to-b from-gray-300 to-gray-100" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p
                    className="text-[13px] font-medium mt-0.5"
                    style={{ color: "#1a7fcc" }}
                  >
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>
                <span className="text-[12px] text-gray-400 whitespace-nowrap flex-shrink-0 pt-0.5">
                  {job.startDate} — {job.endDate ?? "Present"}
                </span>
              </div>

              <ul className="mt-2.5 space-y-1.5">
                {job.description.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-[13px] text-gray-700">
                    <span className="text-gray-400 flex-shrink-0 mt-px">•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
