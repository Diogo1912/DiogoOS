import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section className="p-8">
      <h2 className="section-header mb-6">Skills</h2>

      <div className="space-y-5">
        {skillCategories.map((cat) => (
          <div key={cat.category}>
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-3 py-1 rounded-full text-[12px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
