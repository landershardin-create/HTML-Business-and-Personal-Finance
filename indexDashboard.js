// indexDashboard.js


import { getUserSession } from '../session/sessionContext.js';
import { getIndexView } from './indexRoleViews.js';
import { renderSummaryCards } from './indexSummaryCards.js';
import { renderFilters } from './indexFilters.js';
import { showOnboarding } from './indexOnboarding.js';
import { loadUserPrefs, saveUserPrefs } from './indexStorage.js';

export function renderIndexDashboard(data) {
  const session = getUserSession();
  const view = getIndexView(session.role);
  const prefs = loadUserPrefs(session.userId);

  let html = '';

  if (!prefs.dismissedOnboarding) {
    html += showOnboarding();
  }

  if (view.includes('summaryCards')) {
    html += renderSummaryCards(data);
  }

  if (view.includes('filters')) {
    html += renderFilters(data.categories);
  }

  if (view.includes('fullIndex')) {
    html += `<div class="index-table">${renderIndexTable(data.entries)}</div>`;
  }

  return html;
}

export function renderContributorWidgets(userRole) {
  if (userRole !== 'owner') return '';

  return `
    <div class="widget-row">
      <div class="widget">Top Contributors</div>
      <div class="widget">Recent Activity</div>
      <div class="widget">Budget Alerts</div>
    </div>
  `;
}