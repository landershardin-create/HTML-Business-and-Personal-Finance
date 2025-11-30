// indexRoleViews.js

export function getIndexView(userRole) {
  switch (userRole) {
    case 'owner':
      return ['summaryCards', 'filters', 'fullIndex'];
    case 'contributor':
      return ['summaryCards', 'filters'];
    default:
      return ['summaryCards'];
  }
}