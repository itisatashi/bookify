import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Upload PDF",
    description: "Add your book file",
  },
  {
    number: 2,
    title: "AI Processing",
    description: "We analyze the content",
  },
  {
    number: 3,
    title: "Voice Chat",
    description: "Discuss with AI",
  },
];

const HeroSection = () => {
  return (
    <section className="library-hero-card mb-10 md:mb-16">
      <div className="library-hero-content">
        {/* Left – heading, description, CTA */}
        <div className="library-hero-text">
          <h1 className="library-hero-title">Your Library</h1>
          <p className="library-hero-description">
            Convert your books into interactive AI conversations. Listen, learn,
            and discuss your favorite reads.
          </p>
          <Link href="/books/new" className="library-cta-primary">
            <span className="text-xl leading-none">+</span> Add new book
          </Link>
        </div>

        {/* Center – vintage illustration (mobile) */}
        <div className="library-hero-illustration">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books and globe illustration"
            width={280}
            height={210}
            priority
            className="object-contain"
          />
        </div>

        {/* Center – vintage illustration (desktop) */}
        <div className="library-hero-illustration-desktop">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books and globe illustration"
            width={380}
            height={285}
            priority
            className="object-contain"
          />
        </div>

        {/* Right – steps card */}
        <div className="library-steps-card">
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div key={step.number} className="library-step-item">
                <span className="library-step-number">{step.number}</span>
                <div>
                  <p className="library-step-title">{step.title}</p>
                  <p className="library-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
