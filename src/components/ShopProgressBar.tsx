import React from 'react';

// Static visual copy of the shop progress bar. Step 1 (Configure) is the
// active step; the later steps are upcoming. Nothing is clickable/interactive.
export default function ShopProgressBar({
  steps,
}: {
  steps: Record<string, string>;
}) {
  const stepTitles = Object.keys(steps);
  const progress = 0; // first step active

  const stepElements: React.ReactElement[] = [];
  stepTitles.forEach((title, i) => {
    const done = progress > i;
    const active = i === progress;

    if (i) {
      stepElements.push(
        <li
          className={`space${progress >= i ? ' done' : ''}`}
          key={`${i}-space`}
          role="presentation"
        />
      );
    }

    stepElements.push(
      <li
        aria-hidden
        className={[done ? 'done' : '', active ? 'active' : ''].join(' ').trim()}
        key={i}
      >
        <span>
          <span>{i + 1}</span>
        </span>
        <span aria-hidden>{title}</span>
      </li>
    );
  });

  return (
    <nav aria-label="Order progress" className="Shop-progress-nav" id="shop-progress">
      <ol>{stepElements}</ol>
    </nav>
  );
}
