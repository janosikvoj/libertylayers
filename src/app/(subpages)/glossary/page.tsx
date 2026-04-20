export default function GlossaryPage() {
  return (
    <div className="px-12 pt-24 flex gap-6">
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter
            id="displacement"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.05}
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={20}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <section
        style={{
          filter: `url(#displacement)`,
        }}
      >
        <h2 className="text-2xl">Economic Concepts</h2>
        <ul>
          <li>Subjective Value</li>
          <li>Economic Calculation</li>
          <li>Spontaneous Order</li>
          <li>Time Preference</li>
          <li>Praxeology</li>
          <li>Opportunity Cost</li>
          <li>Capital Theory</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl">Ethical Concepts</h2>
        <ul>
          <li>Non-Aggression Principle (NAP)</li>
          <li>Self-Ownership</li>
          <li>Negative Rights</li>
          <li>Homesteading</li>
          <li>Voluntaryism</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl">Political Concepts</h2>
        <ul>
          <li>Polycentricity</li>
          <li>Public Choice Theory</li>
          <li>Privatization</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl">Technical Concepts</h2>
        <ul>
          <li>Decentralization</li>
          <li>Cryptography</li>
          <li>Blockchain</li>
        </ul>
      </section>
    </div>
  );
}
