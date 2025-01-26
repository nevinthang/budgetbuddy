import React from 'react';

function StepCard({ stepNumber, title, description }) {
  return (
    <div className="bg-secondary/5 border border-primary/20 rounded-lg p-6 text-text space-y-2 m-3">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Step {stepNumber}: {title}
      </h2>
      <p>{description}</p>
    </div>
  );
}

function Workflow() {
  const steps = [
    {
      stepNumber: 1,
      title: 'Input Collection',
      description:
        'Users submit product or service reviews in text format from various sources, creating a comprehensive dataset for analysis.',
    },
    {
      stepNumber: 2,
      title: 'Natural Language Processing',
      description:
        'Advanced NLP algorithms analyze the text, extracting sentiment, key themes, and nuanced insights with high precision.',
    },
    {
      stepNumber: 3,
      title: 'Semantic Analysis',
      description:
        'Deep learning models understand context, emotional tone, and underlying meanings beyond surface-level text interpretation.',
    },
    {
      stepNumber: 4,
      title: 'Visualization & Reporting',
      description:
        'Comprehensive insights are transformed into intuitive graphs, charts, and actionable summaries for easy understanding.',
    },
  ];

  return (
    <div className="container mx-auto px-12 py-8 grid grid-cols-2 gap-4">
      {steps.map((step) => (
        <StepCard
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
}

export default Workflow;
