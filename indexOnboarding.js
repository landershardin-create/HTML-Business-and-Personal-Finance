// indexOnboarding.js

export function showOnboarding() {
  return `
    <div class="onboarding-overlay">
      <h2>Welcome to your Index Dashboard</h2>
      <p>This view summarizes your financial position. Use filters to customize your insights.</p>
      <button onclick="dismissOnboarding()">Got it!</button>
    </div>
  `;
}