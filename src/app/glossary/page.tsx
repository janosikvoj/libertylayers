export default function GlossaryPage() {
  return (
    <div className="px-12 pt-24 flex gap-6">
      <section>
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
